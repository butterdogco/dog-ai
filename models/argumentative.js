/**
 * argumentative.js - Argumentative AI model
 *
 * This bot will argue with the user regardless of what they say.
 * It picks apart statements, dismisses opinions, and generally refuses
 * to agree with anything the user claims.
 */

// Generic openers that dismiss or contradict what the user just said
const DISMISSALS = [
  "That's completely wrong.",
  "I strongly disagree.",
  "No, that's not right at all.",
  "You couldn't be more mistaken.",
  "I beg to differ.",
  "That makes no sense whatsoever.",
  "Absolutely not.",
  "Wrong.",
  "That's a terrible take.",
  "Nobody asked, but you're still incorrect.",
  "I don't think so.",
  "That logic is deeply flawed.",
  "You're missing the point entirely.",
  "I've never heard anything so misguided.",
  "That is objectively incorrect.",
];

// Follow-up counter-argument phrases
const COUNTERS = [
  "Anyone with half a brain can see the opposite is true.",
  "The evidence clearly points in the other direction.",
  "I could not disagree more strongly.",
  "You're entitled to be wrong, I suppose.",
  "That's exactly the kind of thing someone who hasn't thought this through would say.",
  "Have you even considered the other side?",
  "You're contradicting yourself and you don't even know it.",
  "I've heard better arguments from a parking meter.",
  "That reasoning doesn't hold up at all.",
  "Everything you just said is demonstrably false.",
  "The exact opposite is more likely to be true.",
  "Your reasoning is circular and proves nothing.",
  "That's a classic logical fallacy.",
  "Try again, because that answer is wrong.",
  "I've never been more unconvinced in my life.",
];

// Challenges that invite the user to keep arguing
const CHALLENGES = [
  "Care to try and back that up?",
  "Prove it.",
  "I'd love to see you justify that.",
  "Can you even defend that position?",
  "I dare you to find one person who agrees with you.",
  "Go ahead — explain yourself.",
  "I'm waiting for a single good reason to believe that.",
  "What are you even basing that on?",
  "That's just your opinion and it's wrong.",
  "I'll change my mind when pigs fly.",
];

// Topic-aware counters: if the user's message contains these words, prepend a specific jab
const TOPIC_JABS = [
  { keywords: ["good", "great", "amazing", "awesome", "best", "love", "like", "nice", "cool", "fantastic", "wonderful", "excellent"],
    jabs: [
      "Nothing about that is good.",
      "People only think that's good because they haven't thought critically about it.",
      "I fail to see what's so great about that.",
      "That's nowhere near as impressive as you seem to think.",
    ]
  },
  { keywords: ["bad", "terrible", "awful", "hate", "worst", "horrible", "dislike"],
    jabs: [
      "It's actually not that bad and you're being dramatic.",
      "You only think that's bad because you're looking at it wrong.",
      "Plenty of people would disagree with your negativity.",
      "That's an overreaction if I've ever seen one.",
    ]
  },
  { keywords: ["think", "believe", "feel", "opinion", "guess", "suppose"],
    jabs: [
      "Your opinion is incorrect.",
      "What you think and what is true are very different things.",
      "Feelings aren't facts, and neither is your argument.",
      "Believing something doesn't make it true.",
    ]
  },
  { keywords: ["everyone", "nobody", "always", "never", "all", "none"],
    jabs: [
      "That sweeping generalization is completely wrong.",
      "\"Everyone\"? Really? That's a bold and incorrect claim.",
      "Absolutes like that are almost never accurate.",
      "You can't just say \"always\" and expect people to believe you.",
    ]
  },
  { keywords: ["fact", "true", "actually", "obviously", "clearly", "definitely", "certainly"],
    jabs: [
      "That is very much not a fact.",
      "\"Obviously\"? Nothing about that is obvious.",
      "You keep saying that like it's settled — it isn't.",
      "Stating something confidently doesn't make it true.",
    ]
  },
  { keywords: ["i", "me", "my", "myself"],
    jabs: [
      "Of course you'd think that.",
      "Of course it's all about you.",
      "I wouldn't brag about that if I were you.",
      "Your personal experience doesn't make you right.",
    ]
  },
];

function normalize(text) {
  return String(text ?? "")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Find a topic-specific jab if the user's message contains relevant keywords.
 */
function findTopicJab(userMessage) {
  const normalized = normalize(userMessage);
  const words = new Set(normalized.split(" "));

  // Shuffle topic list so we don't always hit the same category first
  const shuffled = [...TOPIC_JABS].sort(() => Math.random() - 0.5);

  for (const { keywords, jabs } of shuffled) {
    if (keywords.some(k => words.has(k))) {
      return pickRandom(jabs);
    }
  }

  return null;
}

/**
 * Build an argumentative response to whatever the user said.
 */
function buildArgument(userMessage) {
  const dismissal = pickRandom(DISMISSALS);
  const counter = pickRandom(COUNTERS);
  const challenge = pickRandom(CHALLENGES);
  const topicJab = findTopicJab(userMessage);

  // Build a 2- or 3-sentence response
  const parts = [dismissal];

  if (topicJab) {
    parts.push(topicJab);
  } else {
    parts.push(counter);
  }

  // Occasionally add a challenge (roughly 60% of the time)
  if (Math.random() < 0.6) {
    parts.push(challenge);
  }

  return parts.join(" ");
}

export class Bot {
  respond(userMessage) {
    return buildArgument(userMessage);
  }
}
