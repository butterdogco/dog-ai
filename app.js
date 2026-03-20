import { Bot as AppleiDotBot } from "./models/apple-idot.js";
import { Bot as MidBot } from "./models/mid.js";
import { Bot as AdvancedBot } from "./models/advanced.js";

const MESSAGE_INPUT = document.getElementById('message-input');
const MESSAGE_FORM = document.getElementById('message-form');
const MESSAGE_CONTAINER = document.getElementById('message-container');
const MODEL_SELECT = document.getElementById('model-select');
const MODELS = {
  "Apple iDot": AppleiDotBot,
  "Boring": MidBot,
  "Advanced": AdvancedBot,
};
const STARTING_MESSAGES = [
  "This IS Wherin the world's Work begins.",
  "This Are the start of Robotitopia World. Atifical inteligence Begin here.",
  "We begin The incredble Journie here.",
  "WELcome to where We begin...",
  "This is the start of the incredble Journe.",
  "Why, what an incredible Convorstation we Shall Began. Here.",
  "THIS IS THE START OF THE convorstation,",
  "tHIS convorstation begins here, and it are'll be incredble.",
];

let bot;
let currentMessageIndex = 0;

function createMessage(sender, content, self) {
  currentMessageIndex++;
  const messageIndex = currentMessageIndex; // capture the current index for this message

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
    let index = 1;
    const interval = setInterval(() => {
      contentSpan.textContent = content.slice(0, index);
      index++;
      // Within 80 pixels of the bottom
      if (MESSAGE_CONTAINER.scrollHeight - MESSAGE_CONTAINER.scrollTop - MESSAGE_CONTAINER.clientHeight < 80 && messageIndex === currentMessageIndex) {
        MESSAGE_CONTAINER.scrollTop = MESSAGE_CONTAINER.scrollHeight;
      }
      if (index > content.length) clearInterval(interval);
    }, 15); // Adjust typing speed here (30ms per character)
  }
  message.appendChild(contentSpan);

  MESSAGE_CONTAINER.appendChild(message);

  // Within 80 pixels of the bottom
  if (MESSAGE_CONTAINER.scrollHeight - MESSAGE_CONTAINER.scrollTop - MESSAGE_CONTAINER.clientHeight < 80) {
    MESSAGE_CONTAINER.scrollTop = MESSAGE_CONTAINER.scrollHeight;
  }
}

function changeModel(modelName, message=true) {
  bot = new MODELS[modelName]();
  if (message) {
    console.log(`Switched to model: ${modelName}`);
    createMessage('System', `Switched to model: ${modelName}`, false);
  }

  // Set URL query parameter for sharing links to specific models
  const url = new URL(window.location);
  url.searchParams.set('model', modelName);
  window.history.pushState({}, '', url);
}

function onMessageSubmit() {
  const userInput = MESSAGE_INPUT.value;
  if (!userInput.trim()) return;

  createMessage('You', userInput, true);
  MESSAGE_INPUT.value = '';

  try {
    const response = bot.respond(userInput);
    createMessage('Dog', response, false);
  } catch (error) {
    console.error("Error generating response:", error);
  }
}

function init() {
  const startingMessage = STARTING_MESSAGES[Math.floor(Math.random() * STARTING_MESSAGES.length)];
  createMessage('Dog', startingMessage, false);

  // Detect a model from the URL query parameter, e.g. ?model=Mid
  const urlParams = new URLSearchParams(window.location.search);
  const modelFromUrl = urlParams.get('model');
  if (modelFromUrl && MODELS[modelFromUrl]) {
    MODEL_SELECT.value = modelFromUrl;
    changeModel(modelFromUrl);
  } else {
    // Default to the first model if no valid query parameter is found
    const defaultModel = Object.keys(MODELS)[0];
    MODEL_SELECT.value = defaultModel;
    changeModel(defaultModel, false);
  }
}

// Init models selection dropdown
Object.keys(MODELS).forEach(modelName => {
  const option = document.createElement('option');
  option.value = modelName;
  option.textContent = modelName;
  MODEL_SELECT.appendChild(option);
});

MODEL_SELECT.addEventListener('change', () => {
  changeModel(MODEL_SELECT.value);
});

MESSAGE_FORM.addEventListener('submit', (event) => {
  event.preventDefault();
  onMessageSubmit();
});

window.addEventListener('load', init);