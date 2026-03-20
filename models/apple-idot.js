import DATA from "../data/basic.js";

const THRESHOLD = 0.5;

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

/**
 * Build a simple bigram Markov model from your DATA.
 * This is not GPT-2, but it *does* "build" responses from learned transitions
 * instead of only picking a canned line.
 */
function buildBigramModel(dataset) {
  // transitions: prevToken -> Map(nextToken -> count)
  const transitions = new Map();
  // startTokens: token -> count (what words can start a sentence)
  const startTokens = new Map();

  function inc(map, key, by = 1) {
    map.set(key, (map.get(key) || 0) + by);
  }

  for (const convo of dataset) {
    // We only train on bot responses (items after index 0).
    const responses = convo.slice(1);

    for (const r of responses) {
      const tokens = tokenize(r);
      if (tokens.length === 0) continue;

      inc(startTokens, tokens[0]);

      for (let i = 0; i < tokens.length - 1; i++) {
        const prev = tokens[i];
        const next = tokens[i + 1];

        if (!transitions.has(prev)) transitions.set(prev, new Map());
        inc(transitions.get(prev), next);
      }

      // Add a terminal marker so generation can stop naturally.
      const last = tokens[tokens.length - 1];
      if (!transitions.has(last)) transitions.set(last, new Map());
      inc(transitions.get(last), "<END>");
    }
  }

  return { transitions, startTokens };
}

function weightedChoice(countMap) {
  // countMap: Map(value -> count)
  let total = 0;
  for (const c of countMap.values()) total += c;
  if (total <= 0) return null;

  let r = Math.random() * total;
  for (const [value, count] of countMap.entries()) {
    r -= count;
    if (r <= 0) return value;
  }
  // Fallback (shouldn't happen)
  return [...countMap.keys()][0] ?? null;
}

/**
 * "Gibberish" heuristic checker.
 * Not a real LM perplexity check, but catches common junk:
 * - too few letters
 * - too many repeated words
 * - low unique-word ratio
 * - excessive long "words" / non-word tokens (already mostly prevented by normalize/tokenize)
 */
function isGibberish(text) {
  const raw = String(text ?? "").trim();
  if (raw.length === 0) return true;

  const words = raw.split(/\s+/).filter(Boolean);
  const lettersOnly = raw.replace(/[^a-zA-Z]/g, "");
  if (lettersOnly.length < 3) return true;              // "??" "ok" "..." etc.

  // If it's extremely short, allow simple replies like "ok", "yes"
  if (words.length === 1) {
    const w = words[0].toLowerCase();
    if (["ok", "okay", "yes", "no", "hi", "hey"].includes(w)) return false;
  }

  const normWords = words.map(w => w.toLowerCase().replace(/[^a-z']/g, "")).filter(Boolean);
  if (normWords.length === 0) return true;

  const unique = new Set(normWords);
  const uniqueRatio = unique.size / normWords.length;

  // Too repetitive -> likely gibberish
  if (normWords.length >= 6 && uniqueRatio < 0.35) return true;

  // Repeated same word too many times in a row
  let maxRun = 1;
  let run = 1;
  for (let i = 1; i < normWords.length; i++) {
    if (normWords[i] === normWords[i - 1]) {
      run++;
      maxRun = Math.max(maxRun, run);
    } else {
      run = 1;
    }
  }
  if (maxRun >= 4) return true;

  // Unusually long "words" (often keyboard smash)
  const longWords = normWords.filter(w => w.length >= 18).length;
  if (longWords > 0) return true;

  return false;
}

/**
 * Generate a response using:
 * 1) Retrieval: find best-matching prompt in DATA
 * 2) If matched: seed generation from one of that prompt's responses
 * 3) Expand using a bigram model trained on all responses in DATA
 * 4) If generation looks like gibberish, fall back to a canned response from match
 */
export function determineResponse(previousMessage, model) {
  const msg = normalize(previousMessage);

  let best = { score: 0, convo: null };

  for (const convo of DATA) {
    const prompt = convo[0];
    const score = similarity(msg, prompt);
    if (score > best.score) best = { score, convo };
  }

  // If we don't understand the user, don't try to "hallucinate" from tiny data.
  if (!best.convo || best.score < THRESHOLD) {
    // return "I'm not sure how to respond to that yet.";
  }

  const responses = best.convo.slice(1);
  // if (responses.length === 0) return "I'm not sure how to respond to that yet.";

  // Build model once per call (fine for small data).
  // If this grows, you should build once globally and rebuild only when DATA changes.
  // const model = buildBigramModel(DATA);

  // Seed: pick a likely starter response from this matched conversation.
  const seed = responses[Math.floor(Math.random() * responses.length)];
  const seedTokens = tokenize(seed);

  // Start token: prefer seed's first token, else model start distribution.
  let current = seedTokens[0] || weightedChoice(model.startTokens) || "ok";

  const out = [current];

  const MAX_TOKENS = 18;

  for (let i = 1; i < MAX_TOKENS; i++) {
    const nextMap = model.transitions.get(current);

    // If we don't have transitions, restart from a plausible start token.
    if (!nextMap) {
      current = weightedChoice(model.startTokens) || "<END>";
    } else {
      current = weightedChoice(nextMap) || "<END>";
    }

    if (current === "<END>") break;
    out.push(current);
  }

  // Light detokenization: capitalize first letter, add punctuation if missing.
  let result = out.join(" ").trim();
  if (result.length) result = result[0].toUpperCase() + result.slice(1);
  if (result.length && !/[.!?]$/.test(result)) result += ".";

  // If the generated output is junk, fall back to a real known response for that prompt.
  if (isGibberish(result)) {
    // return responses[Math.floor(Math.random() * responses.length)];
  }

  return result;
}

/**
 * This class encapsulates the Apple iDot model, allowing you to create an instance and call respond() with user messages.
 */
export class Bot {
  constructor() {
    this.model = buildBigramModel(DATA);
  }

  respond(previousMessage) {
    return determineResponse(previousMessage, this.model);
  }
}