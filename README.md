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

| Command                           | Description                              |
| --------------------------------- | ---------------------------------------- |
| `/dave-catsecrets`                | Random cat facts.                        |
| `/dave-clown`                     | Random jokes.                            |
| `/dave-showerthought`             | Random shower thoughts.                  |
| `/dave-8ball <question>`          | Receive questionable life advice.        |
| `/dave-rps <rock/paper/scissors>` | Challenge Dave to Rock, Paper, Scissors. |
| `/dave-quote`                     | Random motivational quote.               |
| `/dave-roast`                     | Dave insults you for free.               |
| `/dave-coinflip`                  | Flip a coin.                             |
| `/dave-random <max>`              | Generate a random number.                |

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

Create a user service:

```ini
[Unit]
Description=Dave Slack Bot
After=network.target

[Service]
WorkingDirectory=/home/dave/Dave
ExecStart=/usr/bin/node index.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=default.target
```

Enable and start the service:

```bash
systemctl --user daemon-reload
systemctl --user enable dave.service
systemctl --user start dave.service
```

Useful commands:

```bash
systemctl --user restart dave.service
systemctl --user status dave.service
journalctl --user -u dave.service -f
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
