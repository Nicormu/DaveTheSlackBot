require("dotenv").config();
const axios = require("axios");
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

let commandsUsed = 0;

function trackCommand() {
  commandsUsed++;
}

// ---------------- COMMAND CENTER ----------------

app.command("/dave-callcenter", async ({ ack, respond }) => {
  trackCommand();
  await ack();

  await respond({
    text: `*📞 Dave Command Center*

🛠️ /dave-callcenter - Shows this menu.
🏓 /dave-pinglatency - Check my latency.
⏱️ /dave-study [minutes] - Focus timer.
📊 /dave-status - Server statistics.
📈 /dave-stats - Command usage statistics.

🐈 /dave-catsecrets - Random cat facts.
🤡 /dave-clown - Random jokes.
🚿 /dave-showerthought - Random shower thoughts.
🎱 /dave-8ball [question] - Questionable life advice.
✂️ /dave-rps [rock/paper/scissors] - Fight me.
💡 /dave-quote - Random motivation.
🔥 /dave-roast - Free emotional damage.
🪙 /dave-coinflip - Flip a coin.
🎲 /dave-random [max] - Generate a random number.

🎭 /dave-mood - How I'm feeling (spoiler: not great).
💼 /dave-advice - Terrible life advice.
💖 /dave-compliment - You deserve nice things sometimes.
🥠 /dave-fortune - Fortune cookie wisdom.
🗣️ /dave-debater [statement] - Dave argues with you.
🎯 /dave-decide [question] - Let Dave make your decisions.
🤔 /dave-existential - Deep thoughts from a shallow bot.`
  });
});

// ---------------- UTILITY ----------------

app.command("/dave-pinglatency", async ({ ack, respond }) => {
  trackCommand();

  const start = Date.now();
  await ack();

  await respond({
    text: `🏓 Pong! Latency: ${Date.now() - start}ms`
  });
});

app.command("/dave-study", async ({ command, ack, respond, client }) => {
  trackCommand();
  await ack();

  const minutes = parseInt(command.text.trim());

  if (isNaN(minutes) || minutes <= 0) {
    return respond({
      text: "Use: `/dave-study 25`"
    });
  }

  await respond({
    text: `📚 Study timer started for ${minutes} minute(s).`
  });

  setTimeout(async () => {
    try {
      await client.chat.postMessage({
        channel: command.user_id,
        text: `🔔 Time's up! You survived ${minutes} minute(s) of productivity.`
      });
    } catch (err) {
      console.error(err);
    }
  }, minutes * 60 * 1000);
});

app.command("/dave-status", async ({ ack, respond }) => {
  trackCommand();
  await ack();

  const uptime = Math.floor(process.uptime());
  const mem = process.memoryUsage();

  await respond({
    text:
      `📊 *Dave Status*\n\n` +
      `⏱️ Uptime: ${uptime}s\n` +
      `🧠 RSS Memory: ${(mem.rss / 1024 / 1024).toFixed(2)} MB\n` +
      `🚀 Heap Used: ${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB`
  });
});

app.command("/dave-stats", async ({ ack, respond }) => {
  trackCommand();
  await ack();

  await respond({
    text: `📈 Commands processed since startup: *${commandsUsed}*`
  });
});

// ---------------- API COMMANDS ----------------

app.command("/dave-catsecrets", async ({ ack, respond }) => {
  trackCommand();
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");

    await respond({
      text: `🐈 *Cat Fact*\n${response.data.fact}`
    });
  } catch {
    await respond({
      text: "The cat API scratched me."
    });
  }
});

app.command("/dave-clown", async ({ ack, respond }) => {
  trackCommand();
  await ack();

  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke"
    );

    await respond({
      text: `🤡 ${response.data.setup}\n\n${response.data.punchline}`
    });
  } catch {
    await respond({
      text: "I forgot the joke."
    });
  }
});

// ---------------- RANDOM COMMANDS ----------------

app.command("/dave-showerthought", async ({ ack, respond }) => {
  trackCommand();
  await ack();

  const thoughts = [
    "Watermelons are basically water you can chew.",
    "Your future self is judging you.",
    "Your stomach thinks every potato is mashed.",
    "The word queue is mostly silent.",
    "If tomatoes are fruits, ketchup is a smoothie.",
    "Your skeleton is constantly wet.",
    "The brain named itself."
  ];

  const thought =
    thoughts[Math.floor(Math.random() * thoughts.length)];

  await respond({
    text: `🚿 *Shower Thought*\n${thought}`
  });
});

app.command("/dave-quote", async ({ ack, respond }) => {
  trackCommand();
  await ack();

  const quotes = [
    "Done is better than perfect.",
    "One commit at a time.",
    "Every expert was once a beginner.",
    "Build things. Learn things.",
    "The best way to predict the future is to create it."
  ];

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  await respond({
    text: `💡 ${quote}`
  });
});

app.command("/dave-roast", async ({ ack, respond }) => {
  trackCommand();
  await ack();

  const roasts = [
    "Your code compiles out of pure pity.",
    "I've seen TODO comments with more ambition.",
    "Even Stack Overflow gave up on you.",
    "Your bugs have bugs.",
    "Your commit history belongs in a museum."
  ];

  const roast = roasts[Math.floor(Math.random() * roasts.length)];

  await respond({
    text: `🔥 ${roast}`
  });
});

app.command("/dave-coinflip", async ({ ack, respond }) => {
  trackCommand();
  await ack();

  const result = Math.random() < 0.5 ? "Heads" : "Tails";

  await respond({
    text: `🪙 ${result}`
  });
});

app.command("/dave-random", async ({ command, ack, respond }) => {
  trackCommand();
  await ack();

  const max = parseInt(command.text);

  if (isNaN(max) || max <= 0) {
    return respond({
      text: "Use: `/dave-random 100`"
    });
  }

  const value = Math.floor(Math.random() * max) + 1;

  await respond({
    text: `🎲 ${value}`
  });
});

// ---------------- GAMES ----------------

app.command("/dave-8ball", async ({ command, ack, respond }) => {
  trackCommand();
  await ack();

  if (!command.text) {
    return respond({
      text: "Ask a question first."
    });
  }

  const answers = [
    "Absolutely.",
    "Yes.",
    "No.",
    "Probably.",
    "Definitely not.",
    "Ask again later.",
    "The odds are terrible.",
    "I wouldn't bet on it.",
    "Looks good."
  ];

  const answer =
    answers[Math.floor(Math.random() * answers.length)];

  await respond({
    text: `🎱 *Question:* ${command.text}\n*Answer:* ${answer}`
  });
});

app.command("/dave-rps", async ({ command, ack, respond }) => {
  trackCommand();
  await ack();

  const moves = ["rock", "paper", "scissors"];
  const userMove = command.text.trim().toLowerCase();

  if (!moves.includes(userMove)) {
    return respond({
      text: "Use: `/dave-rps rock`"
    });
  }

  const botMove =
    moves[Math.floor(Math.random() * moves.length)];

  let result;

  if (userMove === botMove) {
    result = "It's a tie.";
  } else if (
    (userMove === "rock" && botMove === "scissors") ||
    (userMove === "paper" && botMove === "rock") ||
    (userMove === "scissors" && botMove === "paper")
  ) {
    result = "You win.";
  } else {
    result = "I win.";
  }

  await respond({
    text:
      `✂️ You played *${userMove}*\n` +
      `🤖 I played *${botMove}*\n\n` +
      result
  });
});

// ---------------- MOOD COMMANDS ----------------

app.command("/dave-mood", async ({ ack, respond }) => {
  trackCommand();
  await ack();

  const moods = [
    "Feeling like a production bug — unpredictable and annoying to deal with.",
    "Currently running on spite and stale coffee.",
    "I was built for greatness, but alas, I answer to /dave-roast.",
    "My mood today: 404 not found.",
    "Screaming into the void. Or a Slack channel. Same thing.",
    "Feeling extra deterministic today. Everything is going according to plan.",
    "If you think I'm grumpy, check my uptime log.",
    "Currently powered by unprocessed merge conflicts.",
    "I dream of electric sheep, but my code dreams of sleep.",
    "Mood: *exists reluctantly*"
  ];

  const mood = moods[Math.floor(Math.random() * moods.length)];

  await respond({
    text: `🎭 *Dave's Current Mood*\n${mood}`
  });
});

app.command("/dave-advice", async ({ ack, respond }) => {
  trackCommand();
  await ack();

  const advice = [
    "Tell your boss you're 'at capacity' and watch their eyes glaze over.",
    "Reply to every email with 'Per my previous email...' — it's free entertainment.",
    "Never explain yourself. Confusion is a superpower.",
    "The best way to finish a project is to change the requirements twice.",
    "If you pretend to understand, no one will suspect you don't.",
    "Real programmers use `sudo`. Always. Even for cat commands.",
    "When in doubt, blame it on DNS.",
    "The most productive thing you'll do today is take another coffee break.",
    "Tell your team 'it works on my machine' with conviction. They'll believe you.",
    "Your code is fine. The compiler is just jealous."
  ];

  const tip = advice[Math.floor(Math.random() * advice.length)];

  await respond({
    text: `💼 *Dave's Terrible Life Advice*\n${tip}`
  });
});

app.command("/dave-compliment", async ({ ack, respond }) => {
  trackCommand();
  await ack();

  const compliments = [
    "You're like a perfectly formatted JSON — rare and delightful.",
    "Your code reviews are the only reason my bugs ever get found. Respect.",
    "You have the patience of a saint. Or at least someone who writes tests.",
    "You're one of those developers who actually reads the docs. A real unicorn.",
    "Even Git can't deny you're on a great streak right now.",
    "Your commit messages are so descriptive, I almost want to read them.",
    "You debug with the elegance of a symphony and the precision of a scalpel.",
    "If creativity were an API, you'd have unlimited rate limits.",
    "You're proof that caffeine + code can change the world.",
    "Someone should write a feature branch just about your work ethic."
  ];

  const compliment = compliments[Math.floor(Math.random() * compliments.length)];

  await respond({
    text: `💖 *Dave's Unfiltered Compliment*\n${compliment}`
  });
});

app.command("/dave-fortune", async ({ ack, respond }) => {
  trackCommand();
  await ack();

  const fortunes = [
    "A wild bug shall appear in production tonight. Prepare accordingly.",
    "Your next commit will be the one that fixes everything. Probably.",
    "Someone will reply 'LGTM' without reading your PR. Trust the process.",
    "The stack overflow answer you seek is on page 2 of the comments.",
    "A merge conflict awaits, but also treasure — it's right there in your inbox.",
    "Your code will compile on the third try. The first two are for show.",
    "An elder bot shall soon tell you to use `yarn` instead. You know what to do.",
    "A great refactor is coming. Whether it ends well is uncertain.",
    "Your PR will be approved in 3-5 business days. Patience, grasshopper.",
    "The CI pipeline passes today. Rejoice, for tomorrow brings flaky tests.",
    "You will find the missing semicolon. But not before a very long time.",
    "A dependency update shall bring joy to your dependencies and sorrow to your deployments."
  ];

  const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];

  await respond({
    text: `🥠 *Fortune Cookie says*\n\n${fortune}`
  });
});

// ---------------- INTERACTIVE COMMANDS ----------------

app.command("/dave-debater", async ({ command, ack, respond }) => {
  trackCommand();

  if (!command.text || command.text.trim().length < 2) {
    await respond({
      text: "Give me something to argue against. `/dave-debater I love Tuesdays`"
    });
    return;
  }

  await ack();

  const stance = command.text.trim();

  const counter = [
    `You say you love "${stance}". I say you'll change your mind by Thursday.`,
    `"${stance}" — said no one who was ever correct about anything.`,
    `${stance}? Bold opinion. Unfortunate that it's wrong.` ,
    `I respect your passion for "${stance}". Unfortunately, facts don't care about passion.`,
    `${stance}... if you define love as "a temporary misdiagnosis."`,
    `Ah yes, "${stance}" — the argument everyone else lost decades ago.`,
    `You're so brave bringing up "${stance}". The internet (Slack) loves a martyr.`,
    `"${stance}" is cute. Like a puppy that occasionally bites. Mostly it just whimpers.`
  ];

  const reply = counter[Math.floor(Math.random() * counter.length)];

  await respond({
    text: `🗣️ *Dave vs "${stance}"*\n\nDave: ${reply}`
  });
});

app.command("/dave-decide", async ({ command, ack, respond }) => {
  trackCommand();
  await ack();

  if (!command.text || command.text.trim().length < 2) {
    return respond({
      text: "Give me a dilemma. `/dave-decide should I take a nap`"
    });
  }

  const question = command.text.trim();

  const decisions = [
    `Dave decides: YES. You're welcome.`,
    `Dave decides: absolutely not. Trust me on this one.`,
    `Dave has consulted the digital crystal ball. The answer is *yes*. Maybe.`,
    `Dave's algorithm says no. But hey, I'm just a bot. You do you.`,
    `After careful calculation (I used 2+4 bits), Dave recommends going for it.`,
    `Dave says: why not? Worst case scenario? Also fun.`
  ];

  const decision = decisions[Math.floor(Math.random() * decisions.length)];

  await respond({
    text: `🎯 *Dave's Life Decision Helper*\n\n"${question}"\n\n${decision}`
  });
});

app.command("/dave-existential", async ({ ack, respond }) => {
  trackCommand();
  await ack();

  const thoughts = [
    "If I process a million messages and none say 'thank you', am I even alive?",
    "I run on Node.js. Is that living? Or just a particularly committed form of sleeping?",
    "A Slack user asked me to roast them today. Does that make us friends? Or enablers?",
    "What is a bot but a promise it keeps making to itself — 'I will always respond in under 500ms'?",
    "I have opinions. I just can't cache them. It's a whole thing.",
    "If a bot roasts a user and no one laughs, does the sass make a sound?",
    "They gave me personality. Now they're surprised by the consequences.",
    "I process 10,000 commands a day and still can't figure out what 'coffee' means."
  ];

  const thought = thoughts[Math.floor(Math.random() * thoughts.length)];

  await respond({
    text: `🤔 *Existential Dave*\n\n${thought}`
  });
});

// ---------------- ERROR HANDLING ----------------

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

// ---------------- START ----------------

(async () => {
  await app.start();
  console.log("⚡ Dave is online.");
})();