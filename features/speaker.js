const randomSounds = [
  "AAAA",
  "BARK",
  "GROWL",
  "WHINE",
  "YIP",
  "HOWL",
  "SNARL",
  "GRRR",
  "WOOF",
  "ARF",
  "RUFF",
  "GLORB",
  "ZLEEP",
  "SNORT",
  "SNIFF",
];

const randomSoundChance = 0.1; // 10% chance to inject a random sound
const preferredVoices = ["Google US English", "Microsoft David Desktop - English (United States)"];

function injectRandomSound(message) {
  if (!message) return message;
  if (Math.random() > randomSoundChance) return message; // only inject sometimes

  const words = message.split(/\s+/);
  if (words.length === 0) return message;

  const idx = Math.floor(Math.random() * words.length);
  const sound = randomSounds[Math.floor(Math.random() * randomSounds.length)];
  words.splice(idx, 0, sound);

  return words.join(" ");
}

export function speakMessage(message) {
  if (!message) return;
  
  message = injectRandomSound(message);

  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = 'en-US';
  const voices = speechSynthesis.getVoices();
  const voice = voices.find(v => preferredVoices.includes(v.name)) || voices[0];
  if (voice) utterance.voice = voice;
  utterance.rate = 1.2; // slightly faster than normal
  utterance.pitch = 1.0;
  speechSynthesis.speak(utterance);

  return utterance; // Return the utterance in case we want to do something with it (e.g. stop it later)
}