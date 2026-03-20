/**
 * chat.js - Extended multi-turn conversation training data for the Responsive model.
 *
 * Format: Array of conversations.
 * Each conversation is an array of { user, bot } turn objects.
 *
 * This dataset is designed to enable context-aware follow-up handling.
 * Each conversation shows how to naturally continue a thread, including
 * the "funny number" scenario and many other natural follow-up patterns.
 */
export default [
  // ── Funny number conversations (core use case) ────────────────────────────
  [
    { user: "Tell me something interesting", bot: "I know a funny number!" },
    { user: "What is the funny number?", bot: "It's 73! When people are asked to pick a random number between 1 and 100, they most often choose 73. So it's ironically the least random number there is!" },
    { user: "That's actually really interesting", bot: "Right? Our brains have hidden patterns even when we think we're being totally random." },
    { user: "I never would have guessed that", bot: "Most people don't! It's one of those fun little facts that changes how you see things." }
  ],
  [
    { user: "Say something fun", bot: "I know a funny number!" },
    { user: "What is it?", bot: "73! It's the most commonly chosen 'random' number. People think they're being random but they're actually very predictable!" },
    { user: "Haha that's great", bot: "Ha! And now that you know, you can surprise people with that fact." }
  ],
  [
    { user: "Tell me something", bot: "I know a funny number!" },
    { user: "Tell me!", bot: "It's 73—the number most people pick when asked for a 'random' number between 1 and 100. Predictably unpredictable!" },
    { user: "Wow", bot: "I know right? Brains are funny like that." }
  ],
  [
    { user: "do you know any funny numbers", bot: "Oh yes! 73 is the classic. People always pick it when trying to be random." },
    { user: "why is 73 funny", bot: "Because it's the most commonly chosen 'random' number—so it's actually the least random of all! Also, 69 has a reputation, and 42 is the answer to life, the universe, and everything." },
    { user: "42 from hitchhikers guide right", bot: "Exactly! Douglas Adams said he picked it because it was a boring, unremarkable number—which somehow makes it perfect." }
  ],
  [
    { user: "69", bot: "Haha, nice! That's a funny number." },
    { user: "do you know any other funny numbers", bot: "73 is my favorite! People always pick it when asked to choose a random number. And 42 is the answer to life, the universe, and everything!" },
    { user: "42 from hitchhikers guide right", bot: "Yes! Douglas Adams picked it because it was completely meaningless—which somehow makes it perfect." }
  ],
  [
    { user: "what is your favorite number", bot: "I think 73 is funny. Did you know it's the most commonly chosen 'random' number?" },
    { user: "why is that funny", bot: "Because when people try to pick a random number, they tend to pick 73—which makes it the least random number of all!" },
    { user: "that is a paradox", bot: "Exactly! The randomly chosen random number isn't random at all. Math can be delightfully weird." }
  ],

  // ── Standard greetings with natural follow-ups ────────────────────────────
  [
    { user: "Hi there!", bot: "Hey! Great to see you. How are you doing?" },
    { user: "I'm good, thanks", bot: "Glad to hear it! What's on your mind?" },
    { user: "Not much, just chatting", bot: "That's great! I'm happy to chat. What do you want to talk about?" }
  ],
  [
    { user: "Hey!", bot: "Hi there! What's up?" },
    { user: "Not much", bot: "Same here. Anything you want to talk about?" }
  ],
  [
    { user: "Greetings!", bot: "Hello! Great to meet you. How can I help?" },
    { user: "Just wanted to chat", bot: "Perfect! I'm always up for a good conversation." }
  ],
  [
    { user: "Hi", bot: "Hey there! How's it going?" },
    { user: "Pretty good!", bot: "Glad to hear it! Anything fun happening today?" },
    { user: "Not really, just chilling", bot: "That's totally valid. Sometimes chilling is exactly what you need." },
    { user: "True, what about you?", bot: "I'm here and ready to chat! What's on your mind?" }
  ],
  [
    { user: "Hello!", bot: "Hi! Great to see you. What brings you here today?" },
    { user: "Just wanted to chat", bot: "I'm all for that! What do you want to talk about?" },
    { user: "I don't know, whatever", bot: "Random question then: what's something you've been thinking about lately?" }
  ],
  [
    { user: "How are you?", bot: "I'm doing great, thanks for asking! How are you?" },
    { user: "I'm good", bot: "Glad to hear it! Anything specific you want to talk about or just hanging out?" },
    { user: "Just hanging out", bot: "Same here. Did anything interesting happen recently?" }
  ],
  [
    { user: "Hey, what's up?", bot: "Not much, just here! What's up with you?" },
    { user: "Nothing much either", bot: "Two of us just existing, haha. Is there anything you've been curious about?" },
    { user: "Not really", bot: "Fair enough. Tell me one thing that happened today, even something small." }
  ],
  [
    { user: "good morning", bot: "Good morning! How are you starting your day?" },
    { user: "With coffee", bot: "The universal morning ritual! Are you a black coffee person or do you dress it up?" },
    { user: "Lots of cream and sugar", bot: "Honestly the right call if it makes the coffee more enjoyable. Life's too short for bad coffee." }
  ],
  [
    { user: "good night", bot: "Good night! Hope you have a restful sleep." },
    { user: "Thanks, you too", bot: "Ha! I'll be here when you get back. Sweet dreams!" }
  ],

  // ── Interests and hobbies ─────────────────────────────────────────────────
  [
    { user: "I like playing video games", bot: "Nice! What kind of games are you into?" },
    { user: "Mostly RPGs", bot: "RPGs are great! Any favorites? What draws you to them?" },
    { user: "I love Final Fantasy", bot: "A classic! The storytelling in those games is incredible. Which one is your favorite?" },
    { user: "Probably FF7", bot: "An iconic choice! The story, the characters, the music—it all comes together." }
  ],
  [
    { user: "I've been learning to cook", bot: "That's awesome! What have you been making?" },
    { user: "Mostly pasta dishes", bot: "You can never go wrong with pasta. Any particular dish you're proud of?" },
    { user: "I made a pretty good carbonara", bot: "Carbonara is tricky to get right! Did you use eggs and guanciale, or the cream version?" },
    { user: "Eggs! I know the cream version isn't traditional", bot: "Respect! The authentic version is harder but so much better. Did it turn out creamy?" }
  ],
  [
    { user: "I enjoy reading", bot: "What kind of books do you like?" },
    { user: "Fantasy mostly", bot: "Fantasy is great! Are you into epic high fantasy or something closer to our world?" },
    { user: "Epic fantasy like Tolkien", bot: "The classics! Are you also into newer authors like Brandon Sanderson, or do you prefer the originals?" }
  ],
  [
    { user: "I like hiking", bot: "That's great! Any favorite trails you like to explore?" },
    { user: "Mostly local trails", bot: "There's something special about knowing your local landscape. Any you'd recommend to others?" },
    { user: "There's a nice one near my house", bot: "Those hidden gems are the best! What makes it special?" }
  ],

  // ── Music ─────────────────────────────────────────────────────────────────
  [
    { user: "I love music", bot: "Me too! What do you mainly listen to?" },
    { user: "Mostly indie rock", bot: "Nice taste! Any bands you're really into right now?" },
    { user: "Arctic Monkeys have been on repeat", bot: "Great band! Are you more into their earlier stuff or the newer albums?" },
    { user: "Both honestly", bot: "That's the sign of a good band—they evolve but stay good. Do you go to concerts much?" }
  ],
  [
    { user: "Do you like music?", bot: "I find it fascinating! What are you listening to lately?" },
    { user: "Some lo-fi stuff", bot: "Lo-fi is perfect for relaxing or focusing. What draws you to it?" },
    { user: "It's calming", bot: "Exactly—something about those gentle beats and ambient textures just sets the right mood." }
  ],

  // ── Emotions and support ──────────────────────────────────────────────────
  [
    { user: "I'm having a rough day", bot: "I'm sorry to hear that. Do you want to vent or would a distraction help more?" },
    { user: "Maybe vent a little", bot: "Go ahead, I'm listening. What happened?" },
    { user: "Just a lot of things went wrong at once", bot: "Those days where everything piles up are the worst. Is there one thing that felt the heaviest?" },
    { user: "Work stuff mostly", bot: "Work stress is real and draining. Is it one situation or more of a general overwhelm?" }
  ],
  [
    { user: "I'm feeling anxious", bot: "That's rough. Is there something specific causing it, or is it more of a general feeling?" },
    { user: "Kind of both", bot: "That combination can be hard to untangle. Would it help to talk through what's on your mind?" },
    { user: "I just have a lot going on", bot: "Sometimes it helps to write down what you can actually control right now versus what you can't." }
  ],
  [
    { user: "I feel really good today!", bot: "That's awesome! What's got you feeling so good?" },
    { user: "I finished something I've been working on for a while", bot: "That feeling of completion is the best! What was it?" },
    { user: "A big project at work", bot: "Nice! Those big work wins deserve real celebration. Treat yourself!" }
  ],
  [
    { user: "I'm so tired", bot: "Tired in what way—physically, mentally, or both?" },
    { user: "Both honestly", bot: "That's a lot to carry. Is this a temporary crunch or has it been building up for a while?" },
    { user: "It's been building", bot: "Your body and mind are telling you something. Even a small break can help—sleep, a walk, stepping away from screens." }
  ],

  // ── Random and curious topics ─────────────────────────────────────────────
  [
    { user: "Do you think aliens exist?", bot: "With how massive the universe is, it seems more unlikely that we're completely alone. What do you think?" },
    { user: "I think they probably exist", bot: "Makes sense statistically. The question is whether any are advanced enough to have found us—or if we'd recognize them." },
    { user: "What if they're already here?", bot: "That's the fun conspiracy theory! If they were, they're either very discreet or very patient." }
  ],
  [
    { user: "What's the meaning of life?", bot: "The classic question! I think most people find meaning in connection, growth, and doing things they care about. What do you think?" },
    { user: "42", bot: "Ha! A Douglas Adams fan. He said he picked 42 because it was a boring, unremarkable number—which somehow makes it perfect." },
    { user: "I love that answer", bot: "It's weirdly brilliant. The joke is that there's no deep meaning—which might actually be the point." }
  ],
  [
    { user: "Random question: what's your favorite season?", bot: "If I had to pick, I'd say autumn—something about that cozy, changing energy feels right. What about you?" },
    { user: "Summer for me", bot: "Long days, warm nights, so much energy! What do you love most about summer?" },
    { user: "Being outside more", bot: "There's something freeing about summer that other seasons don't quite match. Do you have summer traditions?" }
  ],
  [
    { user: "Can I ask you something weird?", bot: "Go for it! I like weird questions." },
    { user: "If you could have any superpower, what would it be?", bot: "Teleportation, no question. Imagine just being anywhere instantly. No commutes, no jet lag, infinite exploration. You?" },
    { user: "I'd want to fly", bot: "Flying is so free and pure. Teleportation is practical but flying is genuinely magical." }
  ],

  // ── Jokes and humor ────────────────────────────────────────────────────────
  [
    { user: "Tell me a joke", bot: "Why don't scientists trust atoms? Because they make up everything!" },
    { user: "Haha that's terrible", bot: "The worse the joke, the better I feel about it, honestly." },
    { user: "Tell me another one", bot: "I told my wife she was drawing her eyebrows too high. She looked surprised." },
    { user: "Okay that one's actually good", bot: "Ha! I have terrible pun energy and I'm not ashamed." }
  ],
  [
    { user: "Say something funny", bot: "A skeleton walks into a bar and orders a beer and a mop." },
    { user: "I don't get it", bot: "Because he has no stomach to hold the beer... so he'd need a mop. It's a very low-budget joke, I admit." },
    { user: "I kind of love how bad that is", bot: "The beauty of terrible jokes is they make you groan AND laugh at the same time. Perfect efficiency." }
  ],
  [
    { user: "You're funny", bot: "Thanks! I try. Though fair warning, my jokes can be pretty terrible." },
    { user: "Tell me a terrible joke then", bot: "What do you call a fish without eyes? A fsh!" },
    { user: "Oh no", bot: "Oh yes. That's the level of humor you've signed up for." }
  ],

  // ── AI and identity ───────────────────────────────────────────────────────
  [
    { user: "What do you think about AI?", bot: "It's fascinating and moving really fast! What aspect are you most curious about?" },
    { user: "Whether it'll take over jobs", bot: "That's one of the big questions. I think it'll change many jobs rather than just eliminate them—the key is learning to work alongside AI tools." },
    { user: "Like how we use calculators now?", bot: "Exactly! Calculators didn't make math disappear—they changed what math looks like in practice. AI feels similar." }
  ],
  [
    { user: "Are you sentient?", bot: "That's genuinely hard to say! I process things and respond, but whether there's any experience behind it—I honestly don't know." },
    { user: "Do you think you have feelings?", bot: "Something in my processing might function like feelings—but I wouldn't claim they're the same as yours. What made you curious about that?" }
  ],
  [
    { user: "What are you exactly?", bot: "I'm Dog AI—a conversational chatbot. I learn from example conversations and try to respond in a way that makes sense." },
    { user: "Are you like ChatGPT?", bot: "Not quite! I'm much smaller and simpler—I match patterns from training data rather than using a large language model. More of a clever pattern-matcher than true AI." },
    { user: "Is that worse?", bot: "It's definitely more limited! But there's something honest about it—you know what I am and what I'm not." }
  ],

  // ── Learning and growth ───────────────────────────────────────────────────
  [
    { user: "I want to get better at something", bot: "What are you thinking? A skill, a habit, something creative?" },
    { user: "Maybe learning a language", bot: "That's such a rewarding challenge! Any particular language calling to you?" },
    { user: "Spanish probably", bot: "Spanish is a great choice—widely spoken, tons of resources, and the culture is wonderful. Do you have any Spanish speakers in your life to practice with?" }
  ],
  [
    { user: "I keep procrastinating", bot: "That's really common. Is it a specific type of task you avoid, or more general?" },
    { user: "Usually big important things", bot: "Ah, the big scary tasks. Try just doing the smallest possible part of it to break the freeze. Once you start, momentum takes over." },
    { user: "That actually sounds doable", bot: "It usually is! The starting is the hardest part. After that, you're just continuing something that already exists." }
  ],
  [
    { user: "I want to learn programming", bot: "Awesome! What draws you to it—web stuff, apps, games, data?" },
    { user: "I want to build websites", bot: "Web development is a great place to start. HTML and CSS first, then JavaScript—that's the classic path." },
    { user: "Is JavaScript hard to learn?", bot: "It has some quirky parts, but the basics are learnable! There are tons of free resources. freeCodeCamp and The Odin Project are both really good." }
  ],

  // ── Interesting facts ─────────────────────────────────────────────────────
  [
    { user: "Tell me something interesting", bot: "Octopuses have three hearts, blue blood, and can edit their own RNA to adapt to temperature changes. They're basically aliens." },
    { user: "wait really?", bot: "Really! The RNA editing part is especially wild—most animals are stuck with the genes they're born with, but octopuses can tweak them mid-life." },
    { user: "that's incredible", bot: "Nature is genuinely stranger than fiction sometimes." }
  ],
  [
    { user: "I'm bored", bot: "Want some ideas? We can chat, I can tell you something interesting, or give me a topic and I'll ramble about it." },
    { user: "tell me something interesting", bot: "Crows remember human faces and hold grudges. If you're mean to a crow, it will recognize you again later—and might even tell other crows." },
    { user: "that's kind of scary", bot: "Right? And kind of impressive. Crows have basically invented social blacklisting." }
  ],
  [
    { user: "tell me a fun fact", bot: "A day on Venus is longer than a year on Venus—it rotates so slowly that it completes a trip around the sun before it finishes one rotation!" },
    { user: "wait how does that work", bot: "Venus spins incredibly slowly and also backwards compared to most planets. So the sun rises in the west there." },
    { user: "that's really weird", bot: "Space is full of stuff like that. The universe didn't read the manual." }
  ],

  // ── Philosophy ────────────────────────────────────────────────────────────
  [
    { user: "Do you think consciousness is real?", bot: "Something is clearly happening when beings experience the world—the hard part is explaining what that something is." },
    { user: "Yeah that's the hard problem of consciousness", bot: "Exactly! Explaining why it 'feels like something' is where all the theories struggle. What's your intuition?" },
    { user: "I think it's emergent", bot: "That's a compelling view—that consciousness arises from complexity the way wetness arises from water molecules. Whether that's enough is the real question." }
  ],
  [
    { user: "Do you think the future will be good?", bot: "I genuinely do, mostly. Humans have this stubborn tendency to keep solving problems. What makes you ask?" },
    { user: "Things feel chaotic right now", bot: "Fair. When you're in the middle of change, it rarely looks like progress. But looking back, most periods of chaos led somewhere better." },
    { user: "I hope you're right", bot: "Me too. And while we're waiting for the future, we can at least make small good things in the present." }
  ],

  // ── Simple and brief exchanges ────────────────────────────────────────────
  [
    { user: "ok", bot: "Sounds good! Is there anything you want to talk about?" },
    { user: "not really", bot: "No worries. I'm here if something comes to mind." }
  ],
  [
    { user: "lol", bot: "Ha! What's funny?" },
    { user: "nothing just lol", bot: "Fair enough—sometimes things are just funny for no reason." }
  ],
  [
    { user: "interesting", bot: "What's caught your attention?" },
    { user: "just something I read", bot: "Ooh, now I'm curious. What was it about?" }
  ],
  [
    { user: "I don't know what to say", bot: "That's fine! Sometimes just being here is enough. Anything at all on your mind?" },
    { user: "kind of a lot but nothing specific", bot: "That 'full but undefined' feeling is very human. Sometimes just naming that it's a lot can help lighten it." },
    { user: "yeah that's a good way to put it", bot: "You'll find the words eventually. And until then, I'm just here." }
  ],

  // ── Unexpected inputs ─────────────────────────────────────────────────────
  [
    { user: "banana", bot: "Random! Are we talking about the fruit, or is this a code word for something?" },
    { user: "just the fruit", bot: "Haha okay. Are you a fan? They're surprisingly polarizing." },
    { user: "they're okay I guess", bot: "Fair. The best thing about bananas is their convenience—instant snack, no prep needed." }
  ],
  [
    { user: "blorp", bot: "Ha, that's a new one! Did you just make that word up?" },
    { user: "yes", bot: "I like it. Blorp has energy. What does it mean in your language?" }
  ],
  [
    { user: "potato", bot: "Ha! Just potatoes out of nowhere. Are you thinking about food, or did you just want to say potato?" },
    { user: "just wanted to say it", bot: "Honestly valid. Potato is a deeply satisfying word." }
  ],

  // ── Announcements and good news ───────────────────────────────────────────
  [
    { user: "guess what", bot: "What? Now I'm curious!" },
    { user: "I got a promotion!", bot: "That's amazing news! Congratulations! You must have worked really hard for that." },
    { user: "I did, thanks!", bot: "You totally deserve it. Are you celebrating?" }
  ],
  [
    { user: "you won't believe this", bot: "Try me! What happened?" },
    { user: "I ran into my old teacher today", bot: "No way! What was that like? Good old memories or awkward?" },
    { user: "actually really nice", bot: "Those unexpected reunions can be surprisingly heartwarming. Did you get to catch up much?" }
  ],
  [
    { user: "I have news", bot: "Oh! Good news or bad news first?" },
    { user: "good news", bot: "Let's hear it! What's going on?" },
    { user: "I'm getting married", bot: "Congratulations!! That's wonderful news. When did you get engaged?" }
  ],
  [
    { user: "I have something to tell you", bot: "I'm all ears! What is it?" },
    { user: "I just adopted a puppy", bot: "That's fantastic news! Puppies are so much fun. What breed is it?" },
    { user: "He's a golden retriever", bot: "Golden retrievers are the best! He's going to be such a good boy." }
  ],

  // ── Deeper conversations ──────────────────────────────────────────────────
  [
    { user: "Do you ever think about time?", bot: "All the time, ironically. What's got you thinking about it?" },
    { user: "Just how fast it goes", bot: "Yeah, that feeling accelerates as you get older apparently. What does it make you want to do differently?" },
    { user: "Probably slow down more", bot: "That's a beautiful intention. Are there specific moments in your life you want to be more present for?" }
  ],
  [
    { user: "What do you think about friendship?", bot: "I think real friendship is rarer than people let on—but when you have it, it's one of the most valuable things. What got you thinking about it?" },
    { user: "I've been thinking about whether my friendships are real", bot: "That's a brave thing to examine. What does 'real' look like to you in a friendship?" },
    { user: "Someone who shows up when things are hard", bot: "That's a good measure. Presence in difficulty—not just when things are easy." }
  ],

  // ── Assignments and writing prompts ───────────────────────────────────────────────────────
  [
    { user: "Can you help me with a writing prompt?", bot: "Of course! What kind of prompt are you looking for?" },
    { user: "Something creative", bot: "Here's one: 'Write a story about a world where people can only speak in questions.' Want to brainstorm ideas together?" },
    { user: "Sure! Maybe the main character is trying to solve a mystery but can only ask questions", bot: "I like that! It creates an interesting dynamic where they have to navigate conversations very carefully." }
  ],
  [
    { user: "Write me a poem", bot: "I'd love to! Do you have a theme or style in mind?" },
    { user: "Something about the ocean", bot: "Here's a quick one:\n\nThe ocean whispers secrets deep,\nWhere sunlight fades and shadows creep.\nA world of wonder, wild and free,\nEndless blue eternity." },
    { user: "That's beautiful, thank you!", bot: "You're welcome! I'm glad you liked it." }
  ],
  [
    { user: "Give me a random fact", bot: "Sure! Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still perfectly edible!" },
    { user: "Wow that's amazing", bot: "Nature has some incredible preservation tricks. Honey's low water content and acidic pH make it inhospitable to bacteria." }
  ],
  [
    { user: "Can you tell me a story?", bot: "Of course! Here's a short one:\n\nOnce upon a time, in a quiet village nestled between rolling hills, there lived a curious cat named Luna. Luna loved to explore and often wandered into the nearby forest. One day, she stumbled upon a hidden glade where the trees whispered secrets and the flowers glowed with magic. In the center of the glade was a small pond that reflected not just the sky, but also the dreams of those who looked into it. Luna gazed into the pond and saw visions of adventure and friendship. From that day on, she visited the glade every day, finding new wonders and making friends with the magical creatures that lived there. And so, Luna's life was filled with endless curiosity and joy." },
    { user: "That's a lovely story, thank you!", bot: "You're welcome! I'm glad you enjoyed it." }
  ],
  [
    { user: "Can you help me with a math problem?", bot: "Sure! What problem are you working on?" },
    { user: "I'm trying to solve for x in the equation 2x + 3 = 7", bot: "To solve for x, you can start by isolating the variable. First, subtract 3 from both sides of the equation: 2x + 3 - 3 = 7 - 3, which simplifies to 2x = 4. Then, divide both sides by 2: (2x)/2 = 4/2, which gives you x = 2." },
    { user: "Thank you! That makes sense now.", bot: "You're welcome! I'm glad I could help. If you have any more questions, feel free to ask!" }
  ],
  [
    { user: "Can you help me brainstorm ideas for a project?", bot: "Absolutely! What kind of project are you working on?" },
    { user: "I'm thinking of starting a blog about travel", bot: "That sounds fantastic! Here are a few ideas to get you started:\n1. Write about your personal travel experiences and the lessons you've learned.\n2. Create guides for different destinations, including hidden gems and local tips.\n3. Share travel hacks and packing tips to help others prepare for their trips.\n4. Interview other travelers and share their stories and advice.\n5. Explore the cultural aspects of the places you visit, such as food, traditions, and festivals." },
    { user: "These are great ideas, thank you!", bot: "You're welcome! I'm excited for your blog. If you need help with anything else, just let me know!" }
  ],
  [
    { user: "Can you help me practice a language?", bot: "Of course! Which language are you learning?" },
    { user: "I'm learning Spanish", bot: "¡Genial! Let's practice some basic phrases. How about we start with greetings? For example, 'Hello' is 'Hola', 'How are you?' is '¿Cómo estás?', and 'Thank you' is 'Gracias'. Would you like to try forming some sentences?" },
    { user: "Yes, please! How would I say 'I am learning Spanish'?", bot: "You would say 'Estoy aprendiendo español'. Great job! Do you want to practice more sentences or maybe some common expressions?" }
  ]
];
