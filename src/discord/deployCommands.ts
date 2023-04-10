import rest from "./rest";
import slashCommandsDataJson from "./slashCommandsDataJson";
import { Guild, Routes } from "discord.js";

export default async function deployCommands(guild: Guild) {
  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, guild.id),
      { body: slashCommandsDataJson }
    );
    console.log(`Commands has been deployed to ${guild.name}!`);
  } catch (error) {
    console.error(error);
  }
}
