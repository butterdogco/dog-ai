import { Bot as AppleiDotBot } from "./models/apple-idot.js";
import { Bot as MidBot } from "./models/mid.js";

const MESSAGE_INPUT = document.getElementById('message-input');
const MESSAGE_FORM = document.getElementById('message-form');
const MESSAGE_CONTAINER = document.getElementById('message-container');
const MODEL_SELECT = document.getElementById('model-select');
const MODELS = {
  "Apple iDot": AppleiDotBot,
  "Mid": MidBot,
};

let bot;

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

Object.keys(MODELS).forEach(modelName => {
  const option = document.createElement('option');
  option.value = modelName;
  option.textContent = modelName;
  MODEL_SELECT.appendChild(option);
});

MODEL_SELECT.addEventListener('change', () => {
  const selectedModel = MODEL_SELECT.value;
  bot = new MODELS[selectedModel]();
  console.log(`Switched to model: ${selectedModel}`);
});

MESSAGE_FORM.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const userInput = MESSAGE_INPUT.value;
  createMessage('You', userInput, true);
  MESSAGE_INPUT.value = '';
  
  try {
    const response = bot.respond(userInput);
    createMessage('Dog', response, false);
  } catch (error) {
    console.error("Error generating response:", error);
  }
  
  // Scroll to bottom after adding new messages
  setTimeout(() => {
    MESSAGE_CONTAINER.scrollTop = MESSAGE_CONTAINER.scrollHeight;
  }, 100);
});

// Initialize with the first model by default
bot = new MODELS[Object.keys(MODELS)[0]]();