import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { GiteaApi } from "gitea-api";
import { Configuration, OpenAIApi } from "openai";

const discord = new Client({
  intents: [GatewayIntentBits.Guilds],
});

discord.once(Events.ClientReady, (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

discord
  .login(process.env.DISCORD_SECRET)
  .then(() => {
    console.log("Successfully authorized!");
  })
  .catch(console.error);

const gitea = new GiteaApi({
  BASE: process.env.GITEA_BASE_URL,
  WITH_CREDENTIALS: true,
  TOKEN: process.env.GITEA_SECRET,
});

gitea.user
  .userGet({ username: process.env.GITEA_USERNAME })
  .then((data) => {
    console.log(data);
  })
  .catch(console.error);

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_SECRET,
  })
);

openai
  .createCompletion({
    model: "text-davinci-003",
    prompt: "hello world",
  })
  .then((response) => {
    console.log(response.data.choices[0].text);
  })
  .catch(console.error);
