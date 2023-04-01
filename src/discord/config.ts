import { ClientOptions, GatewayIntentBits } from "discord.js";

const config: ClientOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
};

export default config;
