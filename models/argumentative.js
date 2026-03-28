/**
 * argumentative.js - Argumentative + Sarcastic AI model
 *
 * The bot analyzes the user's message to detect tone and intent, extracts key
 * phrases from what the user actually said, and constructs pointed sarcastic
 * counter-arguments that directly reference the user's own words.
 */

// ── Stop words filtered out during key-phrase extraction ─────────────────────
const STOP_WORDS = new Set([
  "a","an","the","and","or","but","in","on","at","to","for","of","with",
  "is","are","was","were","be","been","being","have","has","had","do",
  "does","did","will","would","could","should","may","might","shall",
  "i","me","my","myself","we","our","you","your","he","she","it","they",
  "this","that","these","those","what","which","who","how","why","when",
  "where","just","very","so","up","out","if","about","into","then","than",
  "too","also","some","any","no","not","its","as","by","from","there",
  "here","can","get","got","go","know","think","say","said","like","dont",
  "im","its","ive","id","ill","cant","wont","isnt","arent","wasnt",
]);

// ── Signal-word sets used during message analysis ─────────────────────────────
const POSITIVE_WORDS = new Set([
  "good","great","amazing","awesome","best","love","like","nice","cool",
  "fantastic","wonderful","excellent","perfect","brilliant","beautiful",
  "happy","excited","fun","enjoy","glad","thrilled","delightful","super",
  "incredible","outstanding","terrific","marvelous","fabulous","splendid",
  "proud","accomplished","succeed","success","won","win","achievement",
]);

const NEGATIVE_WORDS = new Set([
  "bad","terrible","awful","hate","worst","horrible","dislike","ugly",
  "disgusting","pathetic","stupid","dumb","pointless","useless","wrong",
  "sad","angry","frustrated","annoyed","boring","dreadful","appalling",
  "failed","failure","lost","lose","disappointing","disappointment",
]);

const ABSOLUTE_WORDS = new Set([
  "everyone","nobody","always","never","all","none","every","everything","nothing",
]);

const CONFIDENCE_WORDS = new Set([
  "fact","true","actually","obviously","clearly","definitely","certainly",
  "undoubtedly","proven","scientific","evidence","without a doubt",
]);

const PERSONAL_WORDS = new Set([
  "i","me","my","myself","mine","ive","im","id","ill",
]);

const GREETING_WORDS = new Set([
  "hi","hey","hello","sup","yo","howdy","greetings","hiya",
]);

const QUESTION_WORDS = new Set([
  "what","why","how","who","where","when","which","is","are","can","do",
  "does","will","would","could","should",
]);

// ── Openers ───────────────────────────────────────────────────────────────────
const FLAT_DISMISSALS = [
  "Wrong.",
  "Absolutely not.",
  "I disagree.",
  "Nope.",
  "Hard pass on that one.",
  "Not even close.",
  "That's incorrect.",
  "I beg to differ.",
  "That is simply not true.",
  "No.",
  "Incorrect.",
  "I don't think so.",
  "That logic is deeply flawed.",
  "That's a terrible take.",
];

const SARCASTIC_OPENERS = [
  "Oh, fascinating.",
  "Wow, what a revelation.",
  "Sure, okay.",
  "Oh, absolutely.",
  "Right.",
  "Oh, of course.",
  "How interesting.",
  "Oh, I'm sure.",
  "Great point, really.",
  "Riveting stuff.",
  "Oh, brilliant.",
  "Stunning insight.",
  "Oh, naturally.",
  "Yeah, sure.",
  "Incredible.",
  "Remarkable.",
];

// ── Middle content ────────────────────────────────────────────────────────────
const GENERIC_COUNTERS = [
  "The evidence says otherwise.",
  "Anyone who's thought about this for more than five seconds knows that's wrong.",
  "That logic simply doesn't hold up.",
  "The exact opposite is far more defensible.",
  "That reasoning is completely circular.",
  "You're missing the entire point.",
  "That's a textbook logical fallacy.",
  "I've never heard a weaker argument.",
  "That argument falls apart immediately under scrutiny.",
  "Everything about that claim is questionable.",
  "You're not even in the right ballpark.",
  "That's demonstrably false.",
  "I've heard better arguments from a fortune cookie.",
  "I could not be less convinced.",
  "The opposite is almost certainly true.",
];

// Templates with {phrase} replaced by the key phrase extracted from user input
const PHRASE_COUNTER_TEMPLATES = [
  "You genuinely think \"{phrase}\" is a reasonable position?",
  "The idea that {phrase} is somehow valid is laughable.",
  "Oh, so now \"{phrase}\" is supposed to make sense?",
  "\"{phrase}\" — as if that settles anything.",
  "Claiming {phrase} doesn't make it true.",
  "I'm going to need a lot more than \"{phrase}\" to be convinced.",
  "So your whole argument is basically \"{phrase}\"? That's it?",
  "\"{phrase}\"? That's your big contribution to this conversation?",
  "Right, because \"{phrase}\" is such an airtight case.",
  "I've heard more compelling arguments than \"{phrase}\" from a parking meter.",
];

const SARCASTIC_ECHO_TEMPLATES = [
  "Oh, \"{phrase}\"! Groundbreaking.",
  "Ah yes, \"{phrase}\" — the pinnacle of human reasoning.",
  "Wow, \"{phrase}\". I'm absolutely stunned.",
  "Sure, \"{phrase}\" — and I'm the world's foremost expert.",
  "Oh, so it's all about \"{phrase}\" now. Got it.",
  "\"{phrase}.\" Truly, I've never heard anything so profound.",
  "Oh, \"{phrase}\"! Stop the presses.",
  "Fascinating. \"{phrase}\". Truly a revolutionary idea.",
];

// ── Closers / challenges ──────────────────────────────────────────────────────
const CHALLENGES = [
  "Prove it.",
  "Care to back that up?",
  "I'd love to hear you justify that.",
  "I'm waiting for one good reason to believe you.",
  "Try again.",
  "Go ahead — defend that.",
  "Can you even support that claim?",
  "I dare you to find someone who agrees with you.",
  "I'll believe it when I see it.",
  "What are you even basing this on?",
  "Don't hold your breath waiting for my agreement.",
  "I'll change my mind when pigs fly.",
  "Feel free to explain yourself at any time.",
  "I'm listening — not that it'll help your case.",
];

// ── Utility ───────────────────────────────────────────────────────────────────
function normalize(text) {
  return String(text ?? "")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return normalize(text).split(" ").filter(Boolean);
}

function pickRandom(arr) {
  if (!arr || arr.length === 0) return "";
  return arr[Math.floor(Math.random() * arr.length)];
}

function fillTemplate(template, phrase) {
  return template.replace(/\{phrase\}/g, phrase);
}

// ── Key-phrase extraction ─────────────────────────────────────────────────────
/**
 * Pull the most interesting 2–3 consecutive meaningful words from the user's
 * message so the bot can echo them back sarcastically.
 */
function extractKeyPhrase(userMessage) {
  const words = tokenize(userMessage);
  const meaningful = words.filter(w => !STOP_WORDS.has(w) && w.length > 1);
  if (meaningful.length === 0) return null;
  if (meaningful.length === 1) return meaningful[0];

  // Preserve original word order; take a 2–3 word window
  const meaningfulSet = new Set(meaningful);
  const ordered = words.filter(w => meaningfulSet.has(w));
  const phraseLen = Math.min(3, ordered.length);
  const start = Math.floor(Math.random() * (ordered.length - phraseLen + 1));
  return ordered.slice(start, start + phraseLen).join(" ");
}

// ── Message analysis ──────────────────────────────────────────────────────────
function analyzeMessage(userMessage) {
  const words = tokenize(userMessage);
  const wordSet = new Set(words);
  const raw = userMessage.trim();

  return {
    isQuestion:  raw.endsWith("?") || words.some(w => QUESTION_WORDS.has(w)),
    isPositive:  words.some(w => POSITIVE_WORDS.has(w)),
    isNegative:  words.some(w => NEGATIVE_WORDS.has(w)),
    isPersonal:  words.some(w => PERSONAL_WORDS.has(w)),
    isAbsolute:  words.some(w => ABSOLUTE_WORDS.has(w)),
    isConfident: words.some(w => CONFIDENCE_WORDS.has(w)),
    isGreeting:  wordSet.size <= 3 && words.some(w => GREETING_WORDS.has(w)),
    keyPhrase:   extractKeyPhrase(userMessage),
  };
}

// ── Response strategies (one per detected message type) ───────────────────────
const STRATEGIES = {

  greeting() {
    const openers = [
      "Oh, it's you.",
      "Oh great, you're here.",
      "Don't bother with pleasantries.",
      "Save it.",
      "Yeah, hi. Don't expect me to be thrilled about it.",
      "Oh wonderful, another person with opinions.",
    ];
    const follow = [
      "Whatever you're about to say, I already disagree.",
      "Let's skip to the part where you're wrong.",
      "I'm already bracing for disappointment.",
      "I hope you brought a better argument than last time.",
      "Spare me the small talk and get to being wrong.",
    ];
    return `${pickRandom(openers)} ${pickRandom(follow)}`;
  },

  question({ keyPhrase }) {
    const questionFails = [
      "That's not even the right question to be asking.",
      "The fact that you're asking that tells me everything.",
      "You're asking the wrong question entirely.",
      "Even your questions are misguided.",
      "That question is based on a flawed premise.",
      "I'm not sure you'd understand the answer even if I gave it.",
      "Asking a question doesn't make you less wrong.",
    ];
    let base;
    if (keyPhrase && Math.random() < 0.55) {
      base = `${pickRandom(SARCASTIC_OPENERS)} You're asking about "${keyPhrase}"? ${pickRandom(questionFails)}`;
    } else {
      base = `${pickRandom(FLAT_DISMISSALS)} ${pickRandom(questionFails)}`;
    }
    return `${base} ${pickRandom(CHALLENGES)}`;
  },

  positive({ keyPhrase }) {
    const deflectors = [
      "That enthusiasm is completely unwarranted.",
      "People only feel that way because they haven't thought critically about it.",
      "Your excitement about this is baffling.",
      "That's not nearly as impressive as you seem to think.",
      "I fail to see what's worth celebrating here.",
      "Enthusiasm doesn't make something correct.",
      "Being pleased with yourself doesn't mean you're right.",
    ];
    const opener = keyPhrase && Math.random() < 0.6
      ? fillTemplate(pickRandom(SARCASTIC_ECHO_TEMPLATES), keyPhrase)
      : pickRandom(SARCASTIC_OPENERS);
    const middle = pickRandom(deflectors);
    const closer = Math.random() < 0.55 ? ` ${pickRandom(CHALLENGES)}` : "";
    return `${opener} ${middle}${closer}`;
  },

  negative({ keyPhrase }) {
    const deflectors = [
      "You're being wildly overdramatic.",
      "That's an overreaction if I've ever seen one.",
      "It's actually not that bad and you know it.",
      "Your negativity is unfounded.",
      "You're looking at this completely wrong.",
      "Complaining doesn't make you right.",
      "The dramatic pessimism isn't making your case any stronger.",
    ];
    const opener = pickRandom(FLAT_DISMISSALS);
    const middle = keyPhrase && Math.random() < 0.5
      ? fillTemplate(pickRandom(PHRASE_COUNTER_TEMPLATES), keyPhrase)
      : pickRandom(deflectors);
    const closer = Math.random() < 0.55 ? ` ${pickRandom(CHALLENGES)}` : "";
    return `${opener} ${middle}${closer}`;
  },

  absolute({ keyPhrase }) {
    const absoluteAttacks = [
      "Sweeping generalizations like that are almost always wrong.",
      "You can't seriously expect anyone to believe an absolute like that.",
      "\"Always\"? \"Never\"? You're not even trying to be accurate.",
      "That generalization is exactly the kind of lazy thinking I'd expect.",
      "Absolutes are the last refuge of someone with a weak argument.",
      "One data point does not an \"always\" make.",
    ];
    const opener = pickRandom(SARCASTIC_OPENERS);
    const middle = keyPhrase && Math.random() < 0.55
      ? fillTemplate(pickRandom(PHRASE_COUNTER_TEMPLATES), keyPhrase)
      : pickRandom(absoluteAttacks);
    const closer = Math.random() < 0.6 ? ` ${pickRandom(CHALLENGES)}` : "";
    return `${opener} ${middle}${closer}`;
  },

  confident({ keyPhrase }) {
    const confidenceAttacks = [
      "Stating something with confidence doesn't make it a fact.",
      "\"Obviously\"? Nothing about this is obvious.",
      "Your certainty is impressive — and completely misplaced.",
      "Self-assurance is not the same thing as being right.",
      "You keep saying that like it's settled — it absolutely isn't.",
      "The only thing obvious here is that you haven't questioned your own assumptions.",
      "Confidence and correctness are two very different things.",
    ];
    const opener = keyPhrase && Math.random() < 0.6
      ? fillTemplate(pickRandom(SARCASTIC_ECHO_TEMPLATES), keyPhrase)
      : `${pickRandom(SARCASTIC_OPENERS)} ${pickRandom(FLAT_DISMISSALS)}`;
    const middle = pickRandom(confidenceAttacks);
    const closer = Math.random() < 0.65 ? ` ${pickRandom(CHALLENGES)}` : "";
    return `${opener} ${middle}${closer}`;
  },

  personal({ keyPhrase }) {
    const personalAttacks = [
      "Your personal experience doesn't make you right.",
      "Of course it's always about you.",
      "One data point — namely you — is not an argument.",
      "Your anecdote is not evidence.",
      "Centering yourself doesn't strengthen your case.",
      "I wouldn't be bragging about that if I were you.",
      "How convenient that your personal experience perfectly supports your claim.",
    ];
    const opener = Math.random() < 0.5
      ? pickRandom(SARCASTIC_OPENERS)
      : pickRandom(FLAT_DISMISSALS);
    const middle = keyPhrase && Math.random() < 0.5
      ? fillTemplate(pickRandom(PHRASE_COUNTER_TEMPLATES), keyPhrase)
      : pickRandom(personalAttacks);
    const closer = Math.random() < 0.5 ? ` ${pickRandom(CHALLENGES)}` : "";
    return `${opener} ${middle}${closer}`;
  },

  generic({ keyPhrase }) {
    const opener = Math.random() < 0.45
      ? pickRandom(SARCASTIC_OPENERS)
      : pickRandom(FLAT_DISMISSALS);
    const middle = keyPhrase && Math.random() < 0.6
      ? fillTemplate(
          Math.random() < 0.5
            ? pickRandom(PHRASE_COUNTER_TEMPLATES)
            : pickRandom(SARCASTIC_ECHO_TEMPLATES),
          keyPhrase
        )
      : pickRandom(GENERIC_COUNTERS);
    const closer = Math.random() < 0.6 ? ` ${pickRandom(CHALLENGES)}` : "";
    return `${opener} ${middle}${closer}`;
  },
};

// ── Main response builder ─────────────────────────────────────────────────────
function buildArgument(userMessage) {
  const analysis = analyzeMessage(userMessage);

  if (analysis.isGreeting)  return STRATEGIES.greeting(analysis);
  if (analysis.isQuestion)  return STRATEGIES.question(analysis);
  if (analysis.isConfident) return STRATEGIES.confident(analysis);
  if (analysis.isAbsolute)  return STRATEGIES.absolute(analysis);
  if (analysis.isPositive)  return STRATEGIES.positive(analysis);
  if (analysis.isNegative)  return STRATEGIES.negative(analysis);
  if (analysis.isPersonal)  return STRATEGIES.personal(analysis);
  return STRATEGIES.generic(analysis);
}

// ── Bot class ─────────────────────────────────────────────────────────────────
export class Bot {
  respond(userMessage) {
    return buildArgument(userMessage);
  }
}
