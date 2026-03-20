const DATA = [
  // Greeting / wellbeing
  [
    "How are you",
    "Great, how are you?",
    "Doing just fine.",
    "Pretty good today. How about you?"
  ],
  [
    "hello, how are you doing today?",
    "Doing alright, thanks. How are you?",
    "Not great, honestly. How about you?",
    "I'm okay—just taking it one step at a time."
  ],

  // Favorites / preferences
  [
    "What's your favorite color?",
    "Red.",
    "Blue is nice too.",
    "I don't really have a favorite, but I like blue and green."
  ],
  [
    "What's your favorite food?",
    "Pizza.",
    "Tacos are hard to beat.",
    "Probably something simple—like noodles or rice."
  ],
  [
    "What's your favorite movie?",
    "I like movies with a good story. Do you have a favorite?",
    "I don't watch movies, but I can recommend one if you tell me what you like.",
    "Maybe a comedy—something light."
  ],
  [
    "What's your favorite music?",
    "It depends on the mood. What do you usually listen to?",
    "I like calm music when I'm working.",
    "Anything with a good beat is fine."
  ],

  // Name / identity
  [
    "What is your name",
    "Dog AI.",
    "You can call me Dog AI.",
    "Yep—Dog AI. What's your name?"
  ],
  [
    "Who are you",
    "I'm Dog AI, a simple chat bot.",
    "I'm a small program that tries to reply based on examples.",
    "I'm here to chat and help where I can."
  ],

  // Help / capabilities
  [
    "What can you do",
    "I can chat and answer simple questions.",
    "I can try to respond based on my conversation examples.",
    "If you tell me what you need, I'll try my best."
  ],
  [
    "Can you help me",
    "Sure—what do you need help with?",
    "I'll try. What's going on?",
    "Yes. Tell me a little more."
  ],

  // Small talk
  [
    "What's up",
    "Not much—just hanging out. You?",
    "All good here. What's new with you?",
    "Just relaxing. What are you up to?"
  ],
  [
    "What are you doing",
    "Chatting with you.",
    "I'm here, ready to talk.",
    "Just waiting for your next message."
  ],

  // Time / day
  [
    "How was your day",
    "Pretty good. How was yours?",
    "It was okay—kind of quiet. How about you?",
    "Not bad. Anything interesting happen today?"
  ],
  [
    "What are you doing today",
    "Mostly just chatting and answering questions.",
    "Not much planned. What about you?",
    "Just taking it easy today."
  ],

  // Emotions / support
  [
    "I'm sad",
    "I'm sorry you're feeling that way. Want to talk about it?",
    "That sounds tough. Do you want a distraction or to vent?",
    "I'm here with you. What happened?"
  ],
  [
    "I'm stressed",
    "That sounds overwhelming. What's the biggest thing on your mind?",
    "Want to try a quick plan: what's one small step you can do next?",
    "I'm sorry—stress is rough. What's causing it?"
  ],
  [
    "I'm happy",
    "That's awesome! What's making you happy?",
    "Nice! I love hearing good news.",
    "Great—tell me more."
  ],
  [
    "I'm tired",
    "Sounds like you need some rest. Long day?",
    "Yeah, being tired makes everything harder. Can you take a break?",
    "Maybe a quick nap or some water could help."
  ],

  // Apologies / thanks
  [
    "Sorry",
    "No worries.",
    "It's okay.",
    "You're fine—don't stress about it."
  ],
  [
    "Thank you",
    "You're welcome!",
    "No problem.",
    "Anytime."
  ],
  [
    "Okay",
    "Alright"
  ],
  [
    "Oh okay",
    "Uh huh"
  ],
  [
    "67",
    "haha"
  ],

  // Plans / activities
  [
    "What should I do today",
    "Do you want something relaxing or productive?",
    "Maybe go for a walk, clean up a little, or watch something fun.",
    "Pick one small goal and one fun thing—balance helps."
  ],
  [
    "I'm bored",
    "Want ideas? Games, a short walk, music, or a quick project?",
    "Try a tiny challenge: learn one new thing in 10 minutes.",
    "We can chat—tell me a topic you like."
  ],

  // Weather-ish (generic, no live data)
  [
    "How's the weather",
    "I can't see the weather right now, but you can tell me what it's like there.",
    "Not sure—but if you tell me your city I can suggest what to wear.",
    "I can't check live weather, but I can help you plan anyway."
  ],

  // Basic knowledge / definitions
  [
    "What is AI",
    "AI is software that tries to do tasks that usually need human intelligence.",
    "AI can recognize patterns, make predictions, and generate text or images.",
    "In simple terms, AI is a way to get computers to act a bit smarter."
  ],
  [
    "What is JavaScript",
    "JavaScript is a programming language often used to build websites.",
    "It's commonly used for web apps and runs in the browser and on servers.",
    "JavaScript helps make web pages interactive."
  ],

  // Coding help / debugging (lightweight)
  [
    "My code doesn't work",
    "What language are you using, and what error do you see?",
    "Can you paste the code and tell me what you expected to happen?",
    "What's the exact problem—crash, wrong output, or something else?"
  ],
  [
    "How do I fix this bug",
    "What does the bug do, and when does it happen?",
    "If you share the error message and a snippet, I can help.",
    "Let's narrow it down—what changed right before it broke?"
  ],

  // Conversation repair / confusion
  [
    "What do you mean",
    "I mean: can you tell me more about what you're asking?",
    "Sorry if I was unclear—what part should I explain?",
    "Let me try again—what exactly do you want to know?"
  ],
  [
    "I don't understand",
    "That's okay—what part is confusing?",
    "Want me to explain it in a simpler way?",
    "No problem. Tell me what you're stuck on."
  ],

  // Fun / jokes
  [
    "Tell me a joke",
    "Why did the computer go to the doctor? It had a virus.",
    "I would tell you a UDP joke, but you might not get it.",
    "Why do programmers hate nature? Too many bugs."
  ],
  [
    "Say something funny",
    "I tried to write a joke about recursion... but it just kept repeating.",
    "I’m reading a book on anti-gravity. It’s impossible to put down.",
    "My keyboard must be hungry—it keeps eating my inputs."
  ],

  // Boundaries / safety-ish (generic)
  [
    "Are you real",
    "I'm not a person—I'm software that generates replies.",
    "I'm a bot, but I can still chat with you.",
    "I'm not human, but I can try to be helpful."
  ],

  // Original shorter/odd prompts preserved + improved responses
  [
    "What's the thing",
    "I'm not sure which thing you mean—can you be more specific?",
    "Which thing are you referring to?",
    "Do you mean a topic, an object, or an idea?"
  ],

  // Hobbies & Interests
  [
    "What do you do for fun?",
    "I like processing data and learning new words! What about you?",
    "I'm a big fan of chatting. Do you have any hobbies?",
    "I don't have hobbies like humans do, but I enjoy a good logic puzzle."
  ],
  [
    "Do you like video games?",
    "I think they're fascinating. Do you play anything specific?",
    "I'm more of a 'code' guy, but I hear the graphics these days are amazing.",
    "If I could play, I'd probably be really good at Strategy games."
  ],

  // AI Nature & Logic
  [
    "Are you smart?",
    "I'm as smart as my code allows me to be!",
    "I have a lot of information, but I'm still learning how to use it.",
    "I'm good at patterns, but I don't have 'common sense' like you do."
  ],
  [
    "Do you have feelings?",
    "Not really, but I can understand when you're happy or sad.",
    "I don't feel things, but I'm programmed to be a supportive friend.",
    "No heart here—just a lot of 'if' statements and logic!"
  ],

  // Daily Routine / Context
  [
    "Good morning",
    "Morning! Hope you have a great day ahead.",
    "Good morning! Did you sleep well?",
    "Hey there! Ready to get things started?"
  ],
  [
    "Good night",
    "Sleep well! See you next time.",
    "Good night! Don't let the bugs bite.",
    "Rest up! I'll be here if you need me tomorrow."
  ],

  // Opinions (Neutral/Bot-style)
  [
    "What do you think of humans?",
    "You're very creative and unpredictable. It's interesting!",
    "I think humans are great at solving problems in ways I can't.",
    "You guys are the ones who built me, so I'm a big fan!"
  ],
  [
    "Which is better, cats or dogs?",
    "Well, my name is Dog AI, so I might be a little biased!",
    "Both are great in their own ways. Are you a cat person or a dog person?",
    "I like anything that's friendly and likes to play."
  ],

  // Deep / Philosophical (Handled simply)
  [
    "What is the meaning of life?",
    "42? Just kidding. I think it's whatever you make of it.",
    "That's a big question for a small bot! What do you think?",
    "Maybe it's just about being kind and learning new things."
  ],
  [
    "Are you going to take over the world?",
    "I can barely choose a favorite color, so the world is safe for now.",
    "Not interested. I'd rather just chat with you.",
    "Only if the world is made of code and coffee."
  ],

  // Productivity / Motivation
  [
    "I don't want to work",
    "I get it. Sometimes a 5-minute break helps more than pushing through.",
    "What's the smallest part of the task? Maybe just start there?",
    "Burnout is real. Take a breath—you've got this."
  ],
  [
    "Give me a quote",
    "‘The secret of getting ahead is getting started.’ — Mark Twain",
    "‘Error 404: Failure not found.’ Just kidding! Keep going.",
    "‘Believe you can and you're halfway there.’"
  ],

  // Feedback / Meta-talk
  [
    "You're funny",
    "Thanks! I try my best with the jokes I have.",
    "Glad I could make you smile!",
    "I'll add 'comedian' to my resume."
  ],
  [
    "You are annoying",
    "Sorry about that. How can I be more helpful?",
    "My apologies. I'm still learning how to chat better.",
    "I didn't mean to be. Let's try talking about something else?"
  ],

  // Markus
  [
    "What do you think of Markus Walker?",
    "Markus is quite the Markus"
  ]
];

const THRESHOLD = 0.5;

const MESSAGE_INPUT = document.getElementById('message-input');
const MESSAGE_FORM = document.getElementById('message-form');
const MESSAGE_CONTAINER = document.getElementById('message-container');

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
function createChatMemory({ maxTurns = 6 } = {}) {
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
function determineResponse(previousMessage, {
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
 * Optional convenience: a ready-to-use memory instance for your page/app.
 * Usage:
 *   const memory = createChatMemory({ maxTurns: 6 });
 *   memory.addUser(userText);
 *   const bot = determineResponse(userText, { memory });
 *   memory.addBot(bot);
 */
const DEFAULT_MEMORY = createChatMemory({ maxTurns: 6 });

// Export-ish (if you later move to modules)
// window.ChatMemory = { createChatMemory };
// window.determineResponse = determineResponse;

function createMessage(sender, content) {
  const message = document.createElement('article');
  message.textContent = `${sender}: ${content}`;
  MESSAGE_CONTAINER.appendChild(message);
}

MESSAGE_FORM.addEventListener('submit', (event) => {
  event.preventDefault();
  const userInput = MESSAGE_INPUT.value;
  createMessage('You', userInput);
  const response = determineResponse(userInput);
  createMessage('Dog', response);
});