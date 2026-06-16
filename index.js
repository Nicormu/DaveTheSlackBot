require("dotenv").config();
const axios = require("axios");
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

// --- UTILITY  ---

app.command("/dave-callcenter", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `*Ugh, fine. Here's what I can do for you:*
🛠️ */dave-callcenter* - Shows this menu (you are here).
🏓 */dave-pinglatency* - Check how fast my brain is working today.
⏱️ */dave-study [minutes]* - Forces you to actually do your work.
🐈 */dave-catsecrets* - Useless but adorable cat facts.
🤡 */dave-clown* - Jokes that will make you groan.
🎱 */dave-8ballvision [question]* - Ask a calculator for life advice.
✂️ */dave-rps [rock/paper/scissors]* - Fight me.
🚿 */dave-showerthought* - Things to keep you awake at 3 AM.`
  });
});

app.command("/dave-pinglatency", async ({ ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `🏓 Pong! Latency: ${latency}ms. Faster than your Wi-Fi, probably.` });
});

app.command("/dave-study", async ({ command, ack, respond, client }) => {
  await ack();
  const minutes = parseInt(command.text.trim());

  if (isNaN(minutes) || minutes <= 0) {
    await respond({ text: "Bro, that's not a number. Try something like `/dave-study 25` so I don't break." });
    return;
  }

  await respond({ text: `📚 Timer set for ${minutes} minute(s). Put the phone down. I'm watching you.` });

  setTimeout(async () => {
    try {
      await client.chat.postMessage({
        channel: command.user_id,
        text: `🔔 DING DING! You survived ${minutes} minutes of actual productivity. Go touch grass or grab a snack.`
      });
    } catch (error) {
      console.error(error);
    }
  }, minutes * 60 * 1000);
});

// --- CHAOTIC API COMMANDS ---

app.command("/dave-catsecrets", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `🐈 *Cat Fact that you didn't ask for:*\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "The cat API scratched me. No facts today." });
  }
});

app.command("/dave-clown", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({ text: `🤡 ${response.data.setup}\n\n...${response.data.punchline} \n*(Please clap)*` });
  } catch (err) {
    await respond({ text: "I forgot the punchline. Just pretend I said something hilarious." });
  }
});

app.command("/dave-showerthought", async ({ ack, respond }) => {
  await ack();
  const thoughts = [
    "Watermelons are basically water that you can chew.",
    "Your future self is talking trash about you right now.",
    "If you drop soap on the floor, is the floor clean or is the soap dirty?",
    "We say 'sleep like a baby' when babies wake up crying every two hours.",
    "The word 'queue' is just a Q followed by four silent letters.",
    "If a tomato is a fruit, then ketchup is technically a smoothie.",
    "Your stomach thinks all potatoes are mashed.",
    "The 's' in 'lisp' is silent, which is ironic.",
    "If you try to fail and succeed, which one did you actually do?",
    "If we aren't supposed to have midnight snacks, why is there a light in the fridge?",
    "If a book about failures doesn't sell, is it a success?"
  ];
  const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
  await respond({ text: `🚿 *Late Night Brain Worms:*\n${randomThought}` });
});

// --- UNFAIR GAMES ---

app.command("/dave-8ball", async ({ command, ack, respond }) => {
  await ack();
  if (!command.text) {
    await respond({ text: "I can't read your mind. Ask a question! Example: `/dave-8ball Am I cool?`" });
    return;
  }

  const answers = [
    "Absolutely.", "Yeah, sure, whatever.", "I guess so.",
    "Try asking when I care.", "Ask again later, I'm on my break.", "Literally no.",
    "Don't count on it, buddy.", "Nope.", "Yikes. Very doubtful."
  ];
  const choice = answers[Math.floor(Math.random() * answers.length)];
  
  await respond({ text: `🎱 *You asked:* ${command.text}\n*My flawless wisdom:* ${choice}` });
});

app.command("/dave-rps", async ({ command, ack, respond }) => {
  await ack();
  const userMove = command.text.trim().toLowerCase();
  const validMoves = ["rock", "paper", "scissors"];

  if (!validMoves.includes(userMove)) {
    await respond({ text: "It's Rock, Paper, Scissors. It's not that hard bro. Example: `/dave-rps rock`" });
    return;
  }

  const botMove = validMoves[Math.floor(Math.random() * validMoves.length)];
  let result = "";

  if (userMove === botMove) result = "It's a tie! I demand a rematch. 🤝";
  else if (
    (userMove === "rock" && botMove === "scissors") ||
    (userMove === "paper" && botMove === "rock") ||
    (userMove === "scissors" && botMove === "paper")
  ) {
    result = "You win! Beginner's luck. 🙄";
  } else {
    result = "I WIN! Bow down to your robot overlord! 🤖👑";
  }

  await respond({ text: `You played *${userMove}*.\nI played *${botMove}*.\n\n${result}` });
});

// --- START APP ---

(async () => {
  await app.start();
  console.log("⚡️ The sassiest Slack bot alive is now running!");
})();