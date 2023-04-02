# PRC Discord Bot

PRC Discord Bot integrates OpenAI and Gitea functionalities. It provides users with a comprehensive platform to access the latest machine learning capabilities and version control features from within Discord. The bot is designed to enhance productivity and collaboration among users, enabling them to efficiently manage their projects and workflows.

## Installation

To install and set up the PRC Discord Bot for your server, follow these steps:

1. Clone the project from the GitHub repository

   `git clone https://github.com/VibingCreator/prc-discord-bot.git`

2. Install the required dependencies:

   `npm install`

3. Create a .env file in the project root directory and add the necessary environment variables, such as your Discord bot token, Gitea API key and OpenAI API key.

4. Build the project and start the bot:

   `npm run build`

   `npm start`

## Commands

This bot provides several commands that you can use to interact with it. Here's a list of the available commands:

- `/ping`: This command is a simple test command that responds with a "Pong!" message to the user who executed it. It can be useful to test if the bot is responsive and available.

- `/issue`: This command allows a user to create a new issue on Gitea. When the user executes this command, a modal appears with fields for the title and description of the issue.

- `/ask`: This command utilizes OpenAI's text-davinci-003 model to answer a user's question. The command requires a user to input a question and the bot will provide an answer using the OpenAI API.

## Tooling

This project is built with the following tools:

- **[TypeScript](https://www.typescriptlang.org/docs/):** A typed superset of JavaScript that compiles to plain JavaScript.
- **[Node.js](https://nodejs.org/en/docs/):** A JavaScript runtime built on the Chrome V8 engine that allows for server-side JavaScript execution.
- **[discord.js](https://www.npmjs.com/package/discord.js):** A powerful Node.js module that allows interacting with the Discord API.
- **[gitea-api](https://www.npmjs.com/package/gitea-api):** A Node.js package that provides an easy-to-use interface to interact with the Gitea API.
- **[openai](https://www.npmjs.com/package/openai):** A Node.js package that provides a client for the OpenAI API.

## Hosting

If you're looking for a reliable and scalable way to host your Discord bot, Amazon Web Services (AWS) is a great option. With the free tier of AWS, you can host your bot for free for up to a year.

## Contributing

If you would like to contribute to the PRC Discord Bot project, you can do so by following these steps:

1. Fork the project on GitHub.
2. Create a new branch for your changes.
3. Make your changes and commit them to your branch.
4. Create a pull request on the main repository.

## License

The PRC Discord Bot project is licensed under the MIT License. See the `LICENSE` file for more information.
