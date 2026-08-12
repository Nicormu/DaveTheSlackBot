# Dave

A sarcastic Slack bot built with Node.js, Bolt, and questionable amounts of attitude.

Dave lives on a Nest server and runs 24/7, helping users stay productive, answering important life questions, and occasionally bullying them for their own good.

## Features

### Utility Commands

| Command                 | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| `/dave-callcenter`      | Displays the command menu.                              |
| `/dave-pinglatency`     | Checks bot response latency.                            |
| `/dave-study <minutes>` | Starts a study timer and sends a reminder when it ends. |
| `/dave-status`          | Shows uptime and memory usage.                          |
| `/dave-stats`           | Displays how many commands Dave has processed.          |

### Fun Commands

| Command                           | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| `/dave-catsecrets`                | Random cat facts.                                       |
| `/dave-clown`                     | Random jokes.                                           |
| `/dave-showerthought`             | Random shower thoughts.                                 |
| `/dave-8ball <question>`          | Receive questionable life advice.                       |
| `/dave-rps <rock/paper/scissors>` | Challenge Dave to Rock, Paper, Scissors.                |
| `/dave-quote`                     | Random motivational quote.                              |
| `/dave-roast`                     | Dave insults you for free.                              |
| `/dave-coinflip`                  | Flip a coin.                                            |
| `/dave-random <max>`              | Generate a random number.                               |

### Personality Commands

| Command                           | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| `/dave-mood`                      | See how Dave is feeling (spoiler: not great).           |
| `/dave-advice`                    | Receive terrible life advice.                           |
| `/dave-compliment`                | You deserve nice things sometimes.                      |
| `/dave-fortune`                   | Fortune cookie wisdom for developers.                   |
| `/dave-debater <statement>`       | Dave will argue with whatever you say.                  |
| `/dave-decide <question>`         | Let Dave make your decisions for you.                   |
| `/dave-existential`               | Deep thoughts from a very shallow bot.                  |

## Tech Stack

* Node.js
* Slack Bolt SDK
* Axios
* dotenv

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd dave
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
SLACK_BOT_TOKEN=your_bot_token
SLACK_APP_TOKEN=your_app_token
```

## Running Locally

```bash
node index.js
```

or

```bash
npm start
```

## Deploying on Nest

### Initial Setup

Create the service file at `~/.config/systemd/user/dave.service`:

```ini
[Unit]
Description=Dave Slack Bot
After=network.target

[Service]
WorkingDirectory=/home/nicor/Documents/Nicor/Stardance/DaveTheSlackBot
ExecStart=/usr/bin/node index.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production
StandardOutput=journal
StandardError=journal
SyslogIdentifier=dave

[Install]
WantedBy=default.target
```

Enable and start:

```bash
systemctl --user daemon-reload
systemctl --user enable --now dave.service
systemctl --user status dave.service
```

### Updating the Bot on Nest

After making changes locally, push to your repo and SSH into Nest:

```bash
# On Nest — pull latest and restart
cd ~/Documents/Nicor/Stardance/DaveTheSlackBot
git pull
npm install           # if dependencies changed
systemctl --user restart dave.service   # restart the bot
systemctl --user status dave.service    # verify it's running
```

Quick check: run `/dave-pinglatency` in Slack to confirm Dave is responding.

### Useful Commands

```bash
systemctl --user restart dave.service    # restart the bot
systemctl --user reload-or-restart dave.service  # zero-downtime-ish restart
systemctl --user status dave.service     # check if it's running
journalctl --user -u dave.service -f     # live logs
journalctl --user -u dave.service -n 50  # last 50 lines
systemctl --user stop dave.service       # take it offline
```

## Environment Variables

| Variable          | Description                |
| ----------------- | -------------------------- |
| `SLACK_BOT_TOKEN` | Slack Bot User OAuth Token |
| `SLACK_APP_TOKEN` | Slack App-Level Token      |

## Security

* Never commit `.env` files.
* Keep Slack tokens private.
* Use the minimum permissions required.
* Rotate credentials if they are exposed.

## Roadmap

* Persistent statistics storage
* User leaderboards
* Daily productivity challenges
* Poll and voting commands
* AI-powered responses
* Better Slack Block Kit UI

## License

MIT License

---

*"The sassiest Slack bot alive is now running!"*

— Dave 😎
