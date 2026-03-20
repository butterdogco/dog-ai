import DATA from "../data/basic.js";

const THRESHOLD = 0.5;

/**
 * bigram_model.js (expanded)
 *
 * Upgrades over your previous version:
 * 1) Adds lightweight *context* (recent turns) so replies can follow the conversation.
 * 2) Uses a higher-order n-gram model (configurable; default TRIGRAM) instead of only bigrams.
 * 3) Generates *more* candidate responses, scores them, filters gibberish, and picks the best.
 * 4) Adds reply "style" controls (min/max tokens, temperature-ish sampling, retries).
 *
 * Notes:
 * - This still isn't GPT-2. It’s a tiny statistical generator trained on DATA.
 * - Best results require more training text (more responses per prompt).
 */

/* global DATA, THRESHOLD */

///////////////////////////
// Normalization + tokens //
///////////////////////////

function normalize(text) {
  return String(text ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s']/g, "")   // strip punctuation (keep apostrophes)
    .replace(/\s+/g, " ");      // collapse whitespace
}

function tokenize(text) {
  const n = normalize(text);
  return n.length ? n.split(" ").filter(Boolean) : [];
}

function tokenSet(text) {
  return new Set(tokenize(text));
}

// Jaccard similarity between word sets: |A∩B| / |A∪B|
function similarity(a, b) {
  const A = tokenSet(a);
  const B = tokenSet(b);

  let intersection = 0;
  for (const w of A) if (B.has(w)) intersection++;

  const union = new Set([...A, ...B]).size;
  return union === 0 ? 0 : intersection / union;
}

/////////////////////
// Utility helpers  //
/////////////////////

function weightedChoice(countMap, { temperature = 1 } = {}) {
  // countMap: Map(value -> count)
  // temperature > 1 => flatter distribution; < 1 => sharper
  const entries = [...countMap.entries()];
  if (entries.length === 0) return null;

  // Convert counts to weights with temperature.
  // weight = count^(1/temperature)
  const weights = entries.map(([, c]) => Math.pow(Math.max(0, c), 1 / Math.max(0.0001, temperature)));
  const total = weights.reduce((a, b) => a + b, 0);
  if (total <= 0) return entries[0][0];

  let r = Math.random() * total;
  for (let i = 0; i < entries.length; i++) {
    r -= weights[i];
    if (r <= 0) return entries[i][0];
  }
  return entries[entries.length - 1][0];
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function detokenize(tokens) {
  let result = tokens.join(" ").trim();
  if (result.length) result = result[0].toUpperCase() + result.slice(1);
  if (result.length && !/[.!?]$/.test(result)) result += ".";
  return result;
}

//////////////////////////////
// Gibberish / quality check //
//////////////////////////////

function isGibberish(text) {
  const raw = String(text ?? "").trim();
  if (raw.length === 0) return true;

  const words = raw.split(/\s+/).filter(Boolean);
  const lettersOnly = raw.replace(/[^a-zA-Z]/g, "");
  if (lettersOnly.length < 3) return true;

  // Allow very short "valid" replies
  if (words.length === 1) {
    const w = words[0].toLowerCase();
    if (["ok", "okay", "yes", "no", "hi", "hey", "thanks"].includes(w)) return false;
  }

  const normWords = words.map(w => w.toLowerCase().replace(/[^a-z']/g, "")).filter(Boolean);
  if (normWords.length === 0) return true;

  // Too repetitive
  const unique = new Set(normWords);
  const uniqueRatio = unique.size / normWords.length;
  if (normWords.length >= 6 && uniqueRatio < 0.35) return true;

  // Repeated same word in a row
  let maxRun = 1, run = 1;
  for (let i = 1; i < normWords.length; i++) {
    if (normWords[i] === normWords[i - 1]) {
      run++;
      maxRun = Math.max(maxRun, run);
    } else run = 1;
  }
  if (maxRun >= 4) return true;

  // Unusually long tokens (keyboard smash)
  if (normWords.some(w => w.length >= 18)) return true;

  return false;
}

/**
 * Extra scoring to pick the "best" from many generated candidates.
 * You can tweak this as you add more data.
 */
function scoreCandidate(candidateText, {
  seedPrompt = "",
  contextText = "",
  minTokens = 3,
  maxTokens = 22,
} = {}) {
  const tokens = tokenize(candidateText);
  if (tokens.length === 0) return -Infinity;

  const len = tokens.length;

  // Prefer reasonable length
  const lengthScore =
    len < minTokens ? -2 * (minTokens - len) :
    len > maxTokens ? -1 * (len - maxTokens) :
    2;

  // Prefer candidates that share some words with the prompt and/or context
  const promptSim = seedPrompt ? similarity(candidateText, seedPrompt) : 0;
  const contextSim = contextText ? similarity(candidateText, contextText) : 0;

  // Penalize repetition inside the candidate
  const uniq = new Set(tokens).size / tokens.length;
  const repetitionPenalty = uniq < 0.45 ? -2 : 0;

  return (lengthScore + 2.5 * promptSim + 1.5 * contextSim + repetitionPenalty);
}

//////////////////////////////
// Context (conversation mem) //
//////////////////////////////

/**
 * Keeps a rolling window of user+bot turns.
 * - userText is what the user just said
 * - botText is what we responded with
 */
export function createChatMemory({ maxTurns = 6 } = {}) {
  const turns = []; // { role: 'user'|'bot', text: string }

  return {
    addUser(text) {
      turns.push({ role: "user", text: String(text ?? "") });
      while (turns.length > maxTurns * 2) turns.shift();
    },
    addBot(text) {
      turns.push({ role: "bot", text: String(text ?? "") });
      while (turns.length > maxTurns * 2) turns.shift();
    },
    // recent text can be used as an extra "seed" to keep topic continuity
    getContextText({ maxChars = 240 } = {}) {
      // Use last few turns, most recent last
      const joined = turns
        .slice(-maxTurns * 2)
        .map(t => `${t.role === "user" ? "user" : "bot"}: ${t.text}`)
        .join(" | ");
      return joined.length > maxChars ? joined.slice(joined.length - maxChars) : joined;
    },
    clear() {
      turns.length = 0;
    }
  };
}

//////////////////////////////
// N-gram model w/ backoff   //
//////////////////////////////

/**
 * Build an n-gram model (n >= 2). Works like Markov chains with context.
 *
 * model.transitions: Map<contextKey, Map<nextToken, count>>
 * - contextKey is (n-1) tokens joined by \u0001
 *
 * model.starts: Map<contextKey, count>  // which contexts can start a sentence
 */
function buildNGramModel(dataset, { n = 3 } = {}) {
  n = clamp(n, 2, 5);

  const transitions = new Map();
  const starts = new Map();

  function inc(map, key, by = 1) {
    map.set(key, (map.get(key) || 0) + by);
  }

  function contextKey(tokens) {
    return tokens.join("\u0001");
  }

  for (const convo of dataset) {
    const responses = convo.slice(1);

    for (const r of responses) {
      const tokens = tokenize(r);
      if (tokens.length === 0) continue;

      // Pad start: for n=3, start context is ["<START>", "<START>"]
      const startPad = Array(n - 1).fill("<START>");
      const padded = [...startPad, ...tokens, "<END>"];

      // record that this start context is possible
      inc(starts, contextKey(startPad));

      for (let i = 0; i <= padded.length - n; i++) {
        const ctx = padded.slice(i, i + n - 1);
        const next = padded[i + n - 1];
        const key = contextKey(ctx);

        if (!transitions.has(key)) transitions.set(key, new Map());
        inc(transitions.get(key), next);
      }
    }
  }

  return { n, transitions, starts };
}

/**
 * Get next-token distribution using backoff:
 * try full (n-1)-token context, then drop left-most token until 1-token context.
 */
function getNextDistribution(model, contextTokens) {
  const { transitions } = model;

  function key(tokens) {
    return tokens.join("\u0001");
  }

  // Try longest context first
  for (let k = contextTokens.length; k >= 1; k--) {
    const ctx = contextTokens.slice(contextTokens.length - k);
    const dist = transitions.get(key(ctx));
    if (dist) return dist;
  }

  // If nothing found, try <START> context if present
  const startCtx = Array(contextTokens.length).fill("<START>");
  const startDist = transitions.get(key(startCtx));
  if (startDist) return startDist;

  return null;
}

//////////////////////////////
// Retrieval (prompt match)  //
//////////////////////////////

function findBestConversation(userMessage) {
  const msg = normalize(userMessage);

  let best = { score: 0, convo: null };

  for (const convo of DATA) {
    const prompt = convo[0];
    const score = similarity(msg, prompt);
    if (score > best.score) best = { score, convo };
  }

  return best;
}

//////////////////////////////
// Generation (with context) //
//////////////////////////////

function generateWithModel(model, {
  seedTokens = [],
  contextTokens = [],
  minTokens = 3,
  maxTokens = 22,
  temperature = 1.0,
} = {}) {
  const n = model.n;
  const ctxSize = n - 1;

  // Start context:
  // - If we have seed tokens, use last ctxSize tokens from them.
  // - Else, if we have context tokens, use last ctxSize from those.
  // - Else <START> padding.
  let context = [];
  if (seedTokens.length) {
    context = seedTokens.slice(-ctxSize);
  } else if (contextTokens.length) {
    context = contextTokens.slice(-ctxSize);
  } else {
    context = Array(ctxSize).fill("<START>");
  }

  // Ensure correct size
  if (context.length < ctxSize) {
    context = [...Array(ctxSize - context.length).fill("<START>"), ...context];
  }
  context = context.slice(-ctxSize);

  const out = [];

  // We can optionally "prime" output with some seed tokens (but keep it small)
  // so it feels connected. We'll include up to 2 seed tokens.
  const prime = seedTokens.slice(0, Math.min(2, seedTokens.length));
  for (const t of prime) out.push(t);

  for (let i = 0; i < maxTokens; i++) {
    const dist = getNextDistribution(model, context);

    // If no distribution, stop.
    if (!dist) break;

    const next = weightedChoice(dist, { temperature });
    if (!next || next === "<END>") break;

    out.push(next);

    // slide the context window
    context = [...context.slice(1), next];
  }

  // Ensure at least minTokens by retrying could happen outside
  return out;
}

/**
 * Determine response with:
 * - retrieval to find best-matching prompt
 * - use conversation memory (recent turns) as additional seed
 * - generate multiple candidates with an n-gram model
 * - pick best candidate by heuristic scoring
 */
export function determineResponse(previousMessage, {
  memory = null,
  n = 3,                  // 3 => trigram model (more coherent than bigram)
  candidates = 10,        // generate this many and pick best
  minTokens = 3,
  maxTokens = 22,
  temperature = 1.1,      // slightly more variety
  retryIfGibberish = 8,   // extra attempts if outputs are junk
} = {}) {
  const best = findBestConversation(previousMessage);

  if (!best.convo || best.score < THRESHOLD) {
    return "I'm not sure how to respond to that yet.";
  }

  const prompt = best.convo[0];
  const cannedResponses = best.convo.slice(1);

  // Context text from memory (if provided)
  const contextText = memory ? memory.getContextText() : "";
  const contextTokens = tokenize(contextText);

  // Seed from one of the matched prompt's responses
  const seed = cannedResponses[Math.floor(Math.random() * cannedResponses.length)] || "";
  const seedTokens = tokenize(seed);

  // Build model (for larger datasets, build once and reuse)
  const model = buildNGramModel(DATA, { n });

  let bestCandidate = null;
  let bestScore = -Infinity;

  let attempts = 0;
  const totalToTry = candidates + retryIfGibberish;

  while (attempts < totalToTry) {
    attempts++;

    // vary temperature slightly per attempt
    const temp = temperature * (0.9 + Math.random() * 0.3);

    const tokens = generateWithModel(model, {
      seedTokens,
      contextTokens,
      minTokens,
      maxTokens,
      temperature: temp,
    });

    // If too short, skip quickly
    if (tokens.length < minTokens) continue;

    const text = detokenize(tokens);

    if (isGibberish(text)) continue;

    const s = scoreCandidate(text, {
      seedPrompt: prompt,
      contextText,
      minTokens,
      maxTokens,
    });

    if (s > bestScore) {
      bestScore = s;
      bestCandidate = text;
    }
  }

  // Fallback: return a known response
  if (!bestCandidate) {
    return cannedResponses[Math.floor(Math.random() * cannedResponses.length)] || "Okay.";
  }

  return bestCandidate;
}

/**
 * Bot class that encapsulates memory and response generation.
 */
export class Bot {
  constructor() {
    this.memory = createChatMemory();
  }

  respond(userMessage) {
    const response = determineResponse(userMessage, { memory: this.memory });
    this.memory.addUser(userMessage);
    this.memory.addBot(response);
    return response;
  }
}