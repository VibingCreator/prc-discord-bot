import { ClientOptions, GatewayIntentBits } from "discord.js";

const config: ClientOptions = {
  intents: [GatewayIntentBits.Guilds],
};

export default config;
