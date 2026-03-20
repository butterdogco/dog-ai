/**
 * responsive.js - Responsive, context-aware conversational AI model.
 *
 * Key design decisions:
 *
 * 1. Context-aware matching: scores training conversations by how well both
 *    the bot's last message AND the user's current message match a training
 *    turn. This means follow-ups like "What is the funny number?" are
 *    understood in the context of what the bot just said.
 *
 * 2. Bigram generative fallback: when no good match exists in the training
 *    data, generates a response using a small Markov chain seeded from
 *    the conversation context—so unexpected inputs still get a
 *    reasonable-sounding reply instead of a generic error message.
 *
 * 3. Conversation memory: tracks the last 10 turns (user + bot) enabling
 *    follow-up handling across the whole conversation.
 *
 * 4. Richer training data: uses the extended chat.js multi-turn dataset
 *    alongside the existing larger.js Q&A pairs.
 */

import CHAT from "../data/chat.js";
import DATA from "../data/larger.js";

const CONTEXT_THRESHOLD = 0.12;      // lenient — context provides the signal
const DIRECT_CHAT_THRESHOLD = 0.55;  // strict — no context, avoid false positives
const PROMPT_THRESHOLD = 0.2;
const QA_TOPIC_CHANGE_THRESHOLD = 0.75; // strong Q&A hit → user changed topic
const REPETITION_THRESHOLD = 0.7;    // similarity above which a response is "already said"
const FALLBACK_REPETITION_THRESHOLD = 0.5; // lower bar for last-resort fallback variety
const USER_SCORE_WEIGHT = 0.5;       // weight for user-message match in combined score
const CONTEXT_SCORE_WEIGHT = 0.5;    // weight for context (prev-bot-msg) match
const MAX_TOKENS = 45;

// ── Normalization & tokenization ──────────────────────────────────────────────

function normalize(text) {
  return String(text ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s']/g, "")
    .replace(/\s+/g, " ");
}

function tokenize(text) {
  const n = normalize(text);
  return n.length ? n.split(" ").filter(Boolean) : [];
}

function tokenSet(text) {
  return new Set(tokenize(text));
}

// Jaccard similarity between word sets.
function similarity(a, b) {
  const A = tokenSet(a);
  const B = tokenSet(b);
  if (A.size === 0 || B.size === 0) return 0;
  let intersection = 0;
  for (const w of A) if (B.has(w)) intersection++;
  return intersection / new Set([...A, ...B]).size;
}

// ── Gibberish check ───────────────────────────────────────────────────────────

function isGibberish(text) {
  const raw = String(text ?? "").trim();
  if (raw.length === 0) return true;

  const words = raw.split(/\s+/).filter(Boolean);
  const lettersOnly = raw.replace(/[^a-zA-Z]/g, "");
  if (lettersOnly.length < 3) return true;

  if (words.length === 1) {
    const w = words[0].toLowerCase();
    if (["ok", "okay", "yes", "no", "hi", "hey", "thanks", "sure"].includes(w)) return false;
  }

  const normWords = words.map(w => w.toLowerCase().replace(/[^a-z']/g, "")).filter(Boolean);
  if (normWords.length === 0) return true;

  const unique = new Set(normWords);
  const uniqueRatio = unique.size / normWords.length;
  if (normWords.length >= 6 && uniqueRatio < 0.35) return true;

  let maxRun = 1, run = 1;
  for (let i = 1; i < normWords.length; i++) {
    if (normWords[i] === normWords[i - 1]) { run++; maxRun = Math.max(maxRun, run); }
    else run = 1;
  }
  if (maxRun >= 4) return true;

  if (normWords.some(w => w.length >= 18)) return true;

  return false;
}

// ── Bigram model (generative fallback) ───────────────────────────────────────

function buildBigramModel() {
  const transitions = new Map();
  const startTokens = new Map();

  function inc(map, key) {
    map.set(key, (map.get(key) || 0) + 1);
  }

  // Train on Q&A responses from DATA (larger.js format)
  for (const convo of DATA) {
    const responses = convo.slice(1);
    for (const r of responses) {
      if (typeof r !== "string") continue;
      const tokens = tokenize(r);
      if (!tokens.length) continue;
      inc(startTokens, tokens[0]);
      for (let i = 0; i < tokens.length - 1; i++) {
        if (!transitions.has(tokens[i])) transitions.set(tokens[i], new Map());
        inc(transitions.get(tokens[i]), tokens[i + 1]);
      }
      const last = tokens[tokens.length - 1];
      if (!transitions.has(last)) transitions.set(last, new Map());
      inc(transitions.get(last), "<END>");
    }
  }

  // Also train on bot responses from CHAT (multi-turn format)
  for (const convo of CHAT) {
    for (const turn of convo) {
      if (!turn.bot) continue;
      const tokens = tokenize(turn.bot);
      if (!tokens.length) continue;
      inc(startTokens, tokens[0]);
      for (let i = 0; i < tokens.length - 1; i++) {
        if (!transitions.has(tokens[i])) transitions.set(tokens[i], new Map());
        inc(transitions.get(tokens[i]), tokens[i + 1]);
      }
      const last = tokens[tokens.length - 1];
      if (!transitions.has(last)) transitions.set(last, new Map());
      inc(transitions.get(last), "<END>");
    }
  }

  return { transitions, startTokens };
}

function weightedChoice(countMap) {
  let total = 0;
  for (const c of countMap.values()) total += c;
  if (total <= 0) return null;
  let r = Math.random() * total;
  for (const [value, count] of countMap.entries()) {
    r -= count;
    if (r <= 0) return value;
  }
  return [...countMap.keys()][0] ?? null;
}

function generateBigram(bigramModel, seedText, maxTokens = MAX_TOKENS) {
  const seedTokens = tokenize(seedText);
  let current = seedTokens[0] || weightedChoice(bigramModel.startTokens) || "ok";
  const out = [current];

  for (let i = 1; i < maxTokens; i++) {
    const nextMap = bigramModel.transitions.get(current);
    if (!nextMap) {
      current = weightedChoice(bigramModel.startTokens) || "<END>";
    } else {
      current = weightedChoice(nextMap) || "<END>";
    }
    if (current === "<END>") break;
    out.push(current);
  }

  let result = out.join(" ").trim();
  if (result.length) result = result[0].toUpperCase() + result.slice(1);
  if (result.length && !/[.!?]$/.test(result)) result += ".";
  return result;
}

// ── Conversation memory ───────────────────────────────────────────────────────

export function createMemory({ maxTurns = 10 } = {}) {
  const turns = [];

  return {
    addUser(text) {
      turns.push({ role: "user", text: String(text ?? "") });
      while (turns.length > maxTurns * 2) turns.shift();
    },
    addBot(text) {
      turns.push({ role: "bot", text: String(text ?? "") });
      while (turns.length > maxTurns * 2) turns.shift();
    },
    getLastBotMessage() {
      for (let i = turns.length - 1; i >= 0; i--) {
        if (turns[i].role === "bot") return turns[i].text;
      }
      return null;
    },
    getRecentBotResponses(count = 3) {
      return turns
        .filter(t => t.role === "bot")
        .slice(-count)
        .map(t => t.text);
    },
    getTurns() {
      return [...turns];
    },
    clear() {
      turns.length = 0;
    }
  };
}

// ── Context-aware response search ─────────────────────────────────────────────

/**
 * Search CHAT conversations for a response that fits both:
 *  - what the user just said (userMessage), and
 *  - what the bot said immediately before (lastBotMessage, when available).
 *
 * When context is present the scores are weighted equally so that a
 * conversation thread can continue even if the user's follow-up message
 * doesn't closely match any training user-turn on its own.
 *
 * When there is no prior context a higher threshold (DIRECT_CHAT_THRESHOLD)
 * is required so that stopword-heavy phrases like "What is your name" don't
 * accidentally match "what is your favorite number" in the training data.
 */
function findContextualResponse(userMessage, lastBotMessage, recentBotResponses) {
  let best = { score: -Infinity, response: null };

  for (const convo of CHAT) {
    for (let i = 0; i < convo.length; i++) {
      const turn = convo[i];
      const userScore = similarity(userMessage, turn.user);

      let score;
      if (lastBotMessage && i > 0) {
        const contextScore = similarity(lastBotMessage, convo[i - 1].bot);
        // Weight both dimensions equally so either a strong user match or a
        // strong context match can drive the selection.
        score = USER_SCORE_WEIGHT * userScore + CONTEXT_SCORE_WEIGHT * contextScore;
      } else {
        score = userScore;
      }

      if (score > best.score) {
        const alreadySaid = recentBotResponses.some(r => similarity(turn.bot, r) > REPETITION_THRESHOLD);
        if (!alreadySaid) {
          best = { score, response: turn.bot };
        }
      }
    }
  }

  // Use a lenient threshold when context is available (the previous bot message
  // narrows the search space), but a stricter one for context-free matching.
  const threshold = lastBotMessage ? CONTEXT_THRESHOLD : DIRECT_CHAT_THRESHOLD;
  return best.score > threshold ? best.response : null;
}

// ── Q&A prompt matching ───────────────────────────────────────────────────────

/**
 * Returns both the best Q&A score and (when above PROMPT_THRESHOLD) the
 * chosen response text.  Callers use the score to decide whether to
 * short-circuit context matching (strong Q&A hit → user changed topic).
 */
function findBestQAMatch(userMessage, recentBotResponses) {
  const msg = normalize(userMessage);
  let best = { score: 0, convo: null };

  for (const convo of DATA) {
    const score = similarity(msg, convo[0]);
    if (score > best.score) best = { score, convo };
  }

  if (!best.convo) return { score: 0, response: null };

  if (best.score < PROMPT_THRESHOLD) return { score: best.score, response: null };

  const responses = best.convo.slice(1).filter(r => typeof r === "string" && !isGibberish(r));

  // Prefer a response that hasn't been said recently.
  for (const r of responses) {
    const alreadySaid = recentBotResponses.some(prev => similarity(r, prev) > REPETITION_THRESHOLD);
    if (!alreadySaid) return { score: best.score, response: r };
  }

  const r = responses[Math.floor(Math.random() * responses.length)] ?? null;
  return { score: best.score, response: r };
}

// ── Main response function ────────────────────────────────────────────────────

export function determineResponse(userMessage, { memory = null, bigramModel = null } = {}) {
  const lastBotMessage = memory ? memory.getLastBotMessage() : null;
  const recentBotResponses = memory ? memory.getRecentBotResponses(3) : [];

  // Always compute the Q&A score first.  A very strong Q&A hit (≥ 0.75) means
  // the user has asked something the Q&A dataset handles well and has likely
  // changed topic — in that case skip context matching to avoid the bot
  // continuing a previous thread when the user clearly moved on.
  const qa = findBestQAMatch(userMessage, recentBotResponses);
  if (qa.score >= QA_TOPIC_CHANGE_THRESHOLD && qa.response) return qa.response;

  // 1. Context-aware multi-turn conversation matching.
  const contextResponse = findContextualResponse(userMessage, lastBotMessage, recentBotResponses);
  if (contextResponse) return contextResponse;

  // 2. Q&A prompt matching from the larger dataset (lower-confidence cases).
  if (qa.response) return qa.response;

  // 3. Generative fallback: seed the bigram model from recent context so the
  //    output has some relation to what was just being discussed.
  if (bigramModel) {
    const seedText = lastBotMessage ? `${lastBotMessage} ${userMessage}` : userMessage;
    const generated = generateBigram(bigramModel, seedText);
    if (!isGibberish(generated)) return generated;
  }

  // 4. Last-resort varied fallbacks that invite the user to continue.
  const fallbacks = [
    "Interesting! Tell me more about that.",
    "Hmm, I haven't heard that one before. What do you mean?",
    "That's a new one for me! Can you explain more?",
    "I'm not sure I follow, but I'm curious—go on!",
    "Say more—I want to understand what you mean.",
    "Ha! I'm not sure how to respond to that, but I'm intrigued.",
  ];
  const unused = fallbacks.filter(f => !recentBotResponses.some(r => similarity(f, r) > FALLBACK_REPETITION_THRESHOLD));
  const pool = unused.length ? unused : fallbacks;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Bot class ─────────────────────────────────────────────────────────────────

export class Bot {
  constructor() {
    this.memory = createMemory();
    this.bigramModel = buildBigramModel();
  }

  respond(userMessage) {
    const response = determineResponse(userMessage, {
      memory: this.memory,
      bigramModel: this.bigramModel,
    });

    this.memory.addUser(userMessage);
    this.memory.addBot(response);

    return response;
  }
}
