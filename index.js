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
🐈 /dave-catsecrets - Random cat facts.
🤡 /dave-clown - Random jokes.
🚿 /dave-showerthought - Random shower thoughts.
🎱 /dave-8ball [question] - Questionable life advice.
✂️ /dave-rps [rock/paper/scissors] - Fight me.
💡 /dave-quote - Random motivation.
🔥 /dave-roast - Free emotional damage.
🪙 /dave-coinflip - Flip a coin.
🎲 /dave-random [max] - Generate a random number.
📊 /dave-status - Server statistics.
📈 /dave-stats - Command usage statistics.`
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