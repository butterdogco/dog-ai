/**
 * advanced.js - Advanced conversational AI model
 * 
 * Improvements over mid.js:
 * 1. Learns from full conversation logs (multi-turn exchanges)
 * 2. Better context tracking with bidirectional history
 * 3. Conversation similarity matching (finds entire similar conversations, not just prompts)
 * 4. Topic persistence and conversation flow awareness
 * 5. Semantic clustering of similar concepts
 * 6. Better response scoring based on conversation continuity
 */

import CONVOS from "../data/convos.js";
import DATA from "../data/larger.js";

const CONVERSATION_SIMILARITY_THRESHOLD = 0.25;
const PROMPT_SIMILARITY_THRESHOLD = 0.2;

///////////////////////////
// Normalization + tokens //
///////////////////////////

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

// function similarity(a, b) {
//   const A = tokenSet(a);
//   const B = tokenSet(b);
//   let intersection = 0;
//   for (const w of A) if (B.has(w)) intersection++;
//   const union = new Set([...A, ...B]).size;
//   return union === 0 ? 0 : intersection / union;
// }

// Semantic similarity: also consider word overlap at different positions
function semanticSimilarity(a, b) {
  const tokensA = tokenize(a);
  const tokensB = tokenize(b);
  if (tokensA.length === 0 || tokensB.length === 0) return 0;

  // Simple semantic: how many meaningful words overlap
  const setA = tokenSet(a);
  const setB = tokenSet(b);
  let overlap = 0;
  for (const word of setA) {
    if (setB.has(word) && word.length > 2) overlap++;
  }

  return overlap / Math.max(setA.size, setB.size);
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
    if (normWords[i] === normWords[i - 1]) {
      run++;
      maxRun = Math.max(maxRun, run);
    } else run = 1;
  }
  if (maxRun >= 4) return true;

  if (normWords.some(w => w.length >= 18)) return true;

  return false;
}

//////////////////////////////
// Conversation Memory       //
//////////////////////////////

export function createAdvancedChatMemory({ maxTurns = 8 } = {}) {
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
    getTurns() {
      return [...turns];
    },
    getRecentUserMessages(count = 3) {
      return turns
        .filter(t => t.role === "user")
        .slice(-count)
        .map(t => t.text);
    },
    getRecentBotResponses(count = 2) {
      return turns
        .filter(t => t.role === "bot")
        .slice(-count)
        .map(t => t.text);
    },
    getFullContext() {
      return turns.map(t => `${t.role}: ${t.text}`).join(" | ");
    },
    clear() {
      turns.length = 0;
    }
  };
}

//////////////////////////////
// Conversation Log Analysis //
//////////////////////////////

/**
 * Build a map of conversation flows for better context understanding
 */
function buildConversationIndex(dataset) {
  const index = {
    fullConvos: dataset,
    // Map topic words to conversations that discuss them
    topicMap: new Map(),
  };

  for (const convo of dataset) {
    for (const turn of convo) {
      const text = normalize(turn.user + " " + turn.bot);
      const words = tokenSet(text);
      for (const word of words) {
        if (word.length > 3) {
          // Only index meaningful words
          if (!index.topicMap.has(word)) {
            index.topicMap.set(word, []);
          }
          if (!index.topicMap.get(word).includes(convo)) {
            index.topicMap.get(word).push(convo);
          }
        }
      }
    }
  }

  return index;
}

/**
 * Find similar conversation flows
 */
function findSimilarConversations(userMessage, index, topN = 3) {
  // const messageTokens = tokenSet(userMessage);
  const scored = [];

  for (const convo of index.fullConvos) {
    let score = 0;
    let matchCount = 0;

    // Check each turn in the conversation
    for (const turn of convo) {
      const turnText = normalize(turn.user + " " + turn.bot);
      const sim = semanticSimilarity(userMessage, turnText);
      if (sim > 0.15) {
        score += sim;
        matchCount++;
      }
    }

    if (matchCount > 0) {
      scored.push({ convo, score, matchCount });
    }
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, topN);
}

/**
 * Find the best response from similar conversations
 * Avoids responses that have been recently used
 */
function findResponseFromConversation(userMessage, convo, recentResponses = []) {
  let bestResponse = null;
  let bestScore = -Infinity;

  // First pass: try to find a response that hasn't been said recently
  for (const turn of convo) {
    // Check if this response is too similar to recent ones
    const alreadySaid = recentResponses.some(resp => 
      semanticSimilarity(turn.bot, resp) > 0.65
    );
    if (alreadySaid) continue;

    const userSim = semanticSimilarity(userMessage, turn.user);
    if (userSim > bestScore) {
      bestScore = userSim;
      bestResponse = turn.bot;
    }
  }

  // Fallback: if all responses filtered out, pick the best one anyway
  if (!bestResponse) {
    for (const turn of convo) {
      const userSim = semanticSimilarity(userMessage, turn.user);
      if (userSim > bestScore) {
        bestScore = userSim;
        bestResponse = turn.bot;
      }
    }
  }

  return bestResponse;
}

//////////////////////////////
// Prompt Matching           //
//////////////////////////////

function findBestPrompt(userMessage, dataset = DATA, recentResponses = []) {
  const msg = normalize(userMessage);
  let best = { score: 0, convo: null };

  for (const convo of dataset) {
    const prompt = convo[0];
    const score = semanticSimilarity(msg, prompt);
    if (score > best.score) best = { score, convo };
  }

  return best;
}

/**
 * Get a response from a prompt that hasn't been recently used
 */
function getAlternativeResponseFromPrompt(promptConvo, recentResponses = []) {
  const responses = promptConvo.slice(1).filter(r => !isGibberish(r));
  
  // Try to find a response that hasn't been said recently
  for (const resp of responses) {
    const alreadySaid = recentResponses.some(prev => 
      semanticSimilarity(resp, prev) > 0.65
    );
    if (!alreadySaid) {
      return resp;
    }
  }

  // If all have been used, pick a random one from available
  if (responses.length > 0) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  return null;
}

//////////////////////////////
// Response Scoring          //
//////////////////////////////

function scoreResponse(candidateText, {
  userMessage = "",
  recentContext = "",
  recentBotResponses = [],
  minLength = 2,
  maxLength = 22,
} = {}) {
  const tokens = tokenize(candidateText);
  if (tokens.length === 0) return -Infinity;

  const len = tokens.length;

  // Length score
  const lengthScore =
    len < minLength ? -2 * (minLength - len) :
    len > maxLength ? -1 * (len - maxLength) :
    2;

  // Relevance to user message
  const messageSim = userMessage ? semanticSimilarity(candidateText, userMessage) : 0;

  // Relevance to context
  const contextSim = recentContext ? semanticSimilarity(candidateText, recentContext) : 0;

  // Avoid repetition of recent bot responses
  let repetitionPenalty = 0;
  for (const botResp of recentBotResponses) {
    if (semanticSimilarity(candidateText, botResp) > 0.6) {
      repetitionPenalty -= 3;
    }
  }

  // Diversity within the response
  const unique = new Set(tokens).size / tokens.length;
  if (unique < 0.45) repetitionPenalty -= 1;

  return lengthScore + 2.5 * messageSim + 1.8 * contextSim + repetitionPenalty;
}

//////////////////////////////
// Main Response Generation //
//////////////////////////////

export function determineAdvancedResponse(userMessage, {
  memory = null,
  conversationIndex = null,
  minTokens = 2,
  maxTokens = 22,
} = {}) {
  const recentBotResponses = memory ? memory.getRecentBotResponses(3) : [];
  const recentContext = memory ? memory.getFullContext() : "";

  // STEP 1: Try conversation log matching first
  // Conversations might have better contextual responses
  if (conversationIndex) {
    const similarConvos = findSimilarConversations(userMessage, conversationIndex);

    if (similarConvos.length > 0 && similarConvos[0].score > CONVERSATION_SIMILARITY_THRESHOLD) {
      const responseFromConvo = findResponseFromConversation(userMessage, similarConvos[0].convo, recentBotResponses);
      if (responseFromConvo && !isGibberish(responseFromConvo)) {
        return responseFromConvo;
      }
    }
  }

  // STEP 2: Try prompt matching from larger dataset
  const promptMatch = findBestPrompt(userMessage, DATA, recentBotResponses);

  if (promptMatch.convo && promptMatch.score > PROMPT_SIMILARITY_THRESHOLD) {
    // Use new function to get alternative responses
    const bestCanned = getAlternativeResponseFromPrompt(promptMatch.convo, recentBotResponses);

    if (bestCanned) return bestCanned;
  }

  // STEP 3: Fallback with variety
  const fallbacks = [
    "I'm not entirely sure how to respond to that, but I'm interested! Can you tell me more?",
    "Hmm, that's a new one for me. I'd love to hear more about it!",
    "I don't have a great response for that, but I'm curious. What do you mean?",
    "That's thought-provoking. Help me understand what you're asking?",
    "Not sure I follow, but I'm all ears!"
  ];

  // Pick a fallback that hasn't been said recently
  let fallback = fallbacks[0];
  for (const fb of fallbacks) {
    const alreadySaid = recentBotResponses.some(prev => 
      semanticSimilarity(fb, prev) > 0.6
    );
    if (!alreadySaid) {
      fallback = fb;
      break;
    }
  }

  return fallback;
}

//////////////////////////////
// Bot Class                 //
//////////////////////////////

export class Bot {
  constructor() {
    this.memory = createAdvancedChatMemory();
    this.conversationIndex = buildConversationIndex(CONVOS);
  }

  respond(userMessage) {
    const response = determineAdvancedResponse(userMessage, {
      memory: this.memory,
      conversationIndex: this.conversationIndex,
    });

    this.memory.addUser(userMessage);
    this.memory.addBot(response);

    return response;
  }
}
