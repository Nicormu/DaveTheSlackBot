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

### Fun Commands

| Command                  | Description                       |            |                                          |
| ------------------------ | --------------------------------- | ---------- | ---------------------------------------- |
| `/dave-catsecrets`       | Random cat facts.                 |            |                                          |
| `/dave-clown`            | Random jokes.                     |            |                                          |
| `/dave-showerthought`    | Random shower thoughts.           |            |                                          |
| `/dave-8ball <question>` | Receive questionable life advice. |            |                                          |
| `/dave-rps <rock         | paper                             | scissors>` | Challenge Dave to Rock, Paper, Scissors. |

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

## Running

```bash
node index.js
```

or

```bash
npm start
```

## Deployment

Dave is designed to run continuously on a Nest server.

Recommended production setup:

```bash
npm install -g pm2

pm2 start index.js --name dave
pm2 save
pm2 startup
```

This ensures Dave automatically restarts after crashes or server reboots.

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

## License

MIT License

---

*"The sassiest Slack bot alive is now running!"*
*Dave*
*😎*
