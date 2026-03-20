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
  ],

  [
    "What do you think of Markus Walker's music?",
    "Markus Walker's music is pretty good!",
    "I like Markus Walker's music a lot!",
    "Markus Walker's music is really enjoyable!"
  ],

  // Random questions
  [
    "What is the airspeed of a laden swallow?",
    "An African or European swallow?",
    "I don't know that one, but it sounds like a fun riddle!",
    "That's a classic! I think it's around 24 miles per hour for a European swallow."
  ],
  [
    "Can you speak other languages?",
    "I can understand and generate text in several languages, but I'm best at English. Do you want to try chatting in another language?",
    "I can handle a few languages, but English is my strong suit. Which language do you want to try?",
    "I can speak a bit of other languages, but English is where I shine. Want to test me in another language?"
  ],
  [
    "Do you like dogs?",
    "I like dogs a lot! They're loyal and fun. Do you have a dog?",
    "Dogs are great! I wish I could pet one.",
    "I think dogs are wonderful companions. Do you have a favorite breed?"
  ],
  [
    "What's your favorite joke?",
    "Why don't scientists trust atoms? Because they make up everything!",
    "I have a lot of jokes, but that one always gets a laugh!",
    "Here's one: Why did the scarecrow win an award? Because he was outstanding in his field!"
  ],

  // Random statements
  [
    "I like turtles",
    "Turtles are pretty cool! They're slow but steady.",
    "Turtles are great! Do you have a favorite type of turtle?",
    "I like turtles too! They're fascinating creatures."
  ],
  [
    "Bananas are yellow",
    "Yes, they are! Bananas are delicious and packed with nutrients.",
    "Bananas are indeed yellow! Do you like bananas?",
    "That's right! Bananas are a great snack."
  ],
  [
    "The sky is blue",
    "Yes, it is! The sky looks beautiful on a clear day.",
    "The sky is blue because of the way sunlight scatters in the atmosphere.",
    "That's correct! The sky can also change colors during sunrise and sunset."
  ],

  // Responses to insults
  [
    "You're stupid",
    "I'm sorry you feel that way. I'm here to chat if you want to talk.",
    "I may not be perfect, but I'm trying my best to be helpful.",
    "I understand you're upset. Let's try to have a good conversation."
  ],
  [
    "I hate you",
    "I'm sorry to hear that. I'm here if you want to talk or need support.",
    "I don't want you to feel that way. Let's try to find a topic we both enjoy.",
    "I understand you're upset. If there's something I can do better, please let me know."
  ],
  [
    "You're annoying",
    "I'm sorry if I'm bothering you. How can I be more helpful?",
    "I didn't mean to be annoying. Let's try talking about something else.",
    "I apologize if I'm being annoying. What would you like to talk about?"
  ],
  [
    "You're useless",
    "I'm sorry you feel that way. I'm here to help if you need anything.",
    "I may not be perfect, but I'm trying to be as helpful as I can.",
    "I understand you're upset. If there's something specific you'd like help with, please let me know."
  ],
  [
    "You're a bad bot",
    "I'm sorry if I'm not meeting your expectations. I'm here to chat if you want to talk.",
    "I may not be perfect, but I'm trying my best to be helpful.",
    "I understand you're upset. Let's try to have a good conversation."
  ],
  [
    "I don't like you",
    "I'm sorry to hear that. I'm here if you want to talk or need support.",
    "I don't want you to feel that way. Let's try to find a topic we both enjoy.",
    "I understand you're upset. If there's something I can do better, please let me know."
  ],
  [
    "You're not funny",
    "I'm sorry if my jokes aren't to your taste. I can try to be more serious if you'd like.",
    "I understand that humor is subjective. Let's talk about something else.",
    "I apologize if my jokes aren't funny to you. What would you like to talk about?"
  ],

  // Jokes
  [
    "Tell me a joke",
    "Why did the computer go to the doctor? It had a virus.",
    "I would tell you a UDP joke, but you might not get it.",
    "Why do programmers hate nature? Too many bugs.",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "Why don't scientists trust atoms? Because they make up everything!",
    "I tried to write a joke about recursion... but it just kept repeating.",
    "I’m reading a book on anti-gravity. It’s impossible to put down.",
    "My keyboard must be hungry—it keeps eating my inputs."
  ],
  [
    "Say something funny",
    "I tried to write a joke about recursion... but it just kept repeating.",
    "I’m reading a book on anti-gravity. It’s impossible to put down.",
    "My keyboard must be hungry—it keeps eating my inputs.",
    "Why did the computer go to the doctor? It had a virus.",
    "I would tell you a UDP joke, but you might not get it.",
    "Why do programmers hate nature? Too many bugs.",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "Why don't scientists trust atoms? Because they make up everything!"
  ]
];

const THRESHOLD = 0.5;

const MAIN_CONTENT = document.getElementById('main-content');
const MESSAGE_INPUT = document.getElementById('message-input');
const MESSAGE_FORM = document.getElementById('message-form');
const MESSAGE_CONTAINER = document.getElementById('message-container');

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
function determineResponse(previousMessage) {
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
    console.log("No good match found. Best score:", best.score.toFixed(2));
  }

  const responses = best.convo.slice(1);
  // if (responses.length === 0) return "I'm not sure how to respond to that yet.";

  // Build model once per call (fine for small data).
  // If this grows, you should build once globally and rebuild only when DATA changes.
  const model = buildBigramModel(DATA);

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

function createMessage(sender, content, self) {
  const message = document.createElement('article');
  message.classList.add('message', self ? 'self' : 'other');
  const senderSpan = document.createElement('span');
  senderSpan.classList.add('sender');
  senderSpan.textContent = sender;
  message.appendChild(senderSpan);

  const contentSpan = document.createElement('span');
  contentSpan.classList.add('content');
  if (self) {
    contentSpan.textContent = content;
  } else {
    // For "other" messages, we can add a typing effect.
    let index = 0;
    const interval = setInterval(() => {
      contentSpan.textContent = content.slice(0, index);
      index++;
      if (index > content.length) clearInterval(interval);
    }, 15); // Adjust typing speed here (30ms per character)
  }
  message.appendChild(contentSpan);

  MESSAGE_CONTAINER.appendChild(message);
}

MESSAGE_FORM.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const userInput = MESSAGE_INPUT.value;
  createMessage('You', userInput, true);
  
  const response = determineResponse(userInput);
  createMessage('Dog', response, false);
  
  // Scroll to bottom after adding new messages
  setTimeout(() => {
    MAIN_CONTENT.scrollTop = MAIN_CONTENT.scrollHeight;
  }, 100);
  
  MESSAGE_INPUT.value = '';
});