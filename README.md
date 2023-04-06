# PRC Discord Bot

PRC Discord Bot integrates OpenAI and Gitea functionalities. It provides users with a comprehensive platform to access the latest machine learning capabilities and version control features from within Discord. The bot is designed to enhance productivity and collaboration among users, enabling them to efficiently manage their projects and workflows.

## CI/CD Pipeline

This project has a CI/CD pipeline set up using GitHub Actions that automates linting, formatting, building, and deployment of the codebase to an AWS EC2 instance.

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

## License

The PRC Discord Bot project is licensed under the MIT License. See the `LICENSE` file for more information.
