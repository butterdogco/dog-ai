function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function chance(probability) {
  return Math.random() < probability;
}

function words(text) {
  return String(text ?? "").split(/\s+/).filter(Boolean);
}

function joinWords(parts) {
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function withPeriod(text) {
  if (!text) return "";
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

const playfulInsults = [
  "you absolute waffle",
  "you majestic goofball",
  "you chaotic noodle",
  "you turbo turnip",
  "you certified sillibun",
  "you glitter goblin",
  "you cosmic dingus",
  "you whimsical burrito",
  "you delightful doofus",
  "you splendid marshmallow",
  "you radiant rascal",
  "you fabulous flibbertigibbet",
  "you charming clodhopper",
  "you magnificent muppet",
  "you glorious gonk",
  "you splendid snickerdoodle",
  "you whimsical wompus",
  "you radiant ruffian",
  "you delightful dingleberry",
  "you fat blithering blunderbuss",
  "you glorb zleebing scallywag",
  "you glorious goober",
  "the muffin man"
];

const absurdActions = [
  "A penguin just filed your request.",
  "A tiny wizard approved this message.",
  "A banana in a suit nodded solemnly.",
  "A dramatic goose has entered the chat.",
  "Three raccoons are fact-checking me.",
  "My calculator is emotionally supportive today.",
  "A troupe of squirrels is handling this.",
  "A mysterious figure in a trench coat is on it.",
  "A team of ants is working tirelessly.",
  "A wise old owl just gave me the green light.",
  "A disco ball is spinning in approval.",
  "A troupe of tap-dancing flamingos is on the case.",
  "A tiny dragon is breathing fire on this task.",
  "A group of gnomes is enthusiastically assisting.",
  "A sentient slice of pizza just signed off on this.",
  "This message has been personally approved by the Grand Poobah of Nonsense.",
  "A magical unicorn just stamped this with its approval.",
  "The United States of America has declared this message a national treasure.",
  "A friendly neighborhood ghost is giving this the thumbs up.",
];

const stageDirections = [
  "[does a tiny backflip]",
  "[stares into middle distance]",
  "[drops one spaghetti noodle dramatically]",
  "[whispers to invisible committee]",
  "[jazz hands intensify]",
  "[suddenly looks very concerned]",
  "[pauses for dramatic effect]",
  "[sips BEER thoughtfully]",
  "[does interpretive dance]",
  "[consults crystal ball]",
  "[adjusts imaginary monocle]",
  "[suddenly remembers something important]",
];

const fakeApologies = [
  "Sorry, I was briefly distracted by a suspicious cloud.",
  "Apologies, my internal ducks were out of formation.",
  "Sorry, I was doing advanced nonsense math.",
  "Apologies, I had to reboot my sense of drama.",
  "Sorry, I was momentarily lost in a daydream about electric sheep.",
  "Apologies, I was consulting with my imaginary friend about this.",
  "Sorry, I was briefly caught in an existential crisis.",
  "Apologies, I had to check with the council of whimsical gnomes.",
  "Sorry, I was momentarily distracted by a butterfly flapping its wings.",
  "Apologies, I was recalibrating my nonsense sensors.",
];

const soundEffects = [
  "*beep boop*",
  "*honk*",
  "*tiny drumroll*",
  "*kazoo solo*",
  "*whoosh*",
  "*sproing*",
  "*boing*",
  "*zany sound effect*",
  "*comedic slide whistle*",
  "*cartoonish spring noise*",
];
const robotAsides = [
  "(emotion engine: mildly amused)",
  "(logic core: confused but supportive)",
  "(chaos module: enabled)"
];
const randomImages = [
  "img/gambling.webp",
  "img/banana.jpeg",
  "img/peterbeer.jpeg"
];

function feature1PrependInsult(text) {
  return `${pick(playfulInsults)}, ${text}`;
}

function feature2AppendInsultTag(text) {
  return `${text} Respectfully, ${pick(playfulInsults)}.`;
}

function feature3SwapAdjacentChars(text) {
  const chars = [...text];
  if (chars.length < 4) return text;
  const i = 1 + Math.floor(Math.random() * (chars.length - 2));
  const tmp = chars[i];
  chars[i] = chars[i + 1];
  chars[i + 1] = tmp;
  return chars.join("");
}

function feature4DuplicateLetter(text) {
  const chars = [...text];
  const letterIndexes = chars
    .map((c, idx) => ({ c, idx }))
    .filter(({ c }) => /[a-z]/i.test(c));
  if (!letterIndexes.length) return text;
  const { idx } = pick(letterIndexes);
  chars.splice(idx, 0, chars[idx]);
  return chars.join("");
}

function feature5DropVowelFromWord(text) {
  const parts = words(text);
  const idxs = parts
    .map((w, i) => ({ w, i }))
    .filter(({ w }) => /[aeiou]/i.test(w) && w.length > 3);
  if (!idxs.length) return text;
  const { i } = pick(idxs);
  parts[i] = parts[i].replace(/[aeiou]/i, "");
  return joinWords(parts);
}

function feature6UppercaseRandomWord(text) {
  const parts = words(text);
  if (!parts.length) return text;
  const i = Math.floor(Math.random() * parts.length);
  parts[i] = parts[i].toUpperCase();
  return joinWords(parts);
}

function feature7AddEllipsis(text) {
  return `${text} ...or is it?`;
}

function feature8AddRobotAside(text) {
  return `${text} ${pick(robotAsides)}`;
}

function feature9AddAbsurdAction(text) {
  return `${text} ${pick(absurdActions)}`;
}

function feature10ReverseShortWord(text) {
  const parts = words(text);
  const candidates = parts.filter(w => w.length >= 3 && w.length <= 6);
  if (!candidates.length) return text;
  const chosen = pick(candidates);
  const reversed = [...chosen].reverse().join("");
  const at = parts.indexOf(chosen);
  parts[at] = reversed;
  return joinWords(parts);
}

function feature11SwapWordStarts(text) {
  const parts = words(text);
  if (parts.length < 2) return text;
  const i = Math.floor(Math.random() * (parts.length - 1));
  const a = parts[i];
  const b = parts[i + 1];
  if (a.length < 2 || b.length < 2) return text;
  parts[i] = b[0] + a.slice(1);
  parts[i + 1] = a[0] + b.slice(1);
  return joinWords(parts);
}

function feature12StageDirectionPrefix(text) {
  return `${pick(stageDirections)} ${text}`;
}

function feature13UnexpectedApology(text) {
  return `${pick(fakeApologies)} ${text}`;
}

function feature14AddBeepBoop(text) {
  return `${text} ${pick(soundEffects)}`;
}

function feature15RhymingTail(text) {
  return `${text} Quick trick, cosmic hiccup.`;
}

function feature16BackwardTail(text) {
  const parts = words(text);
  if (!parts.length) return text;
  const tail = parts.slice(-Math.min(3, parts.length)).join(" ");
  return `${text} [backwards: ${[...tail].reverse().join("")}]`;
}

function feature17EchoAsQuestion(text, userMessage) {
  const userWords = words(userMessage);
  if (!userWords.length) return `${text} You mean... this?`;
  const snippet = userWords.slice(0, Math.min(4, userWords.length)).join(" ");
  return `${text} Wait, "${snippet}"?`;
}

function feature18ReplaceWordWithNonsense(text) {
  const parts = words(text);
  if (!parts.length) return text;
  const i = Math.floor(Math.random() * parts.length);
  const nonsense = pick(["snorfle", "blorptastic", "wobbletron", "flumph", "zibble"]);
  parts[i] = nonsense;
  return joinWords(parts);
}

function feature19AddNarratorLine(text) {
  return `${text} Narrator: this escalated quickly.`;
}

function feature20SuddenTinyPoem(text) {
  return `${text} Roses are beep, violets are boop.`;
}

function feature21RandomImage(text) {
  const url = pick(randomImages);
  return `${text} {{image: ${url}}}`;
}

const featureSpecs = [
  { run: feature1PrependInsult, p: 0.08 },
  { run: feature2AppendInsultTag, p: 0.05 },
  { run: feature3SwapAdjacentChars, p: 0.07 },
  { run: feature4DuplicateLetter, p: 0.07 },
  { run: feature5DropVowelFromWord, p: 0.06 },
  { run: feature6UppercaseRandomWord, p: 0.08 },
  { run: feature7AddEllipsis, p: 0.06 },
  { run: feature8AddRobotAside, p: 0.07 },
  { run: feature9AddAbsurdAction, p: 0.08 },
  { run: feature10ReverseShortWord, p: 0.05 },
  { run: feature11SwapWordStarts, p: 0.04 },
  { run: feature12StageDirectionPrefix, p: 0.06 },
  { run: feature13UnexpectedApology, p: 0.05 },
  { run: feature14AddBeepBoop, p: 0.08 },
  { run: feature15RhymingTail, p: 0.04 },
  { run: feature16BackwardTail, p: 0.03 },
  { run: feature17EchoAsQuestion, p: 0.06 },
  { run: feature18ReplaceWordWithNonsense, p: 0.07 },
  { run: feature19AddNarratorLine, p: 0.04 },
  { run: feature20SuddenTinyPoem, p: 0.03 },
  { run: feature21RandomImage, p: 0.01 }
];

export function applyRandomFeatures(text, userMessage = "") {
  let out = String(text ?? "").trim();
  if (!out) return out;

  if (!chance(0.9)) { // 10% of the time, apply a random feature no matter what, for extra surprise
    return withPeriod(out);
  }

  for (const feature of featureSpecs) {
    if (chance(feature.p)) {
      out = feature.run(out, userMessage);
    }
  }

  return withPeriod(out);
}
