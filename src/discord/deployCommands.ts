import "dotenv/config";
import { Routes } from "discord.js";
import rest from "./rest";
import * as commandModules from "./commands";

export default async function deployCommands() {
  const commands = [];

  for (const command in commandModules) {
    commands.push(
      commandModules[command as keyof typeof commandModules].data.toJSON()
    );
  }

  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID,
        process.env.DISCORD_GUILD_ID
      ),
      { body: commands }
    );
  } catch (error) {
    console.error(error);
  }
}
