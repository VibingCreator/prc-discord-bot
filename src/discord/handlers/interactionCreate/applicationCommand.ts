import { CommandInteraction } from "discord.js";
import * as commandModules from "../../commands";

export async function handler(interaction: CommandInteraction) {
  const command =
    commandModules[interaction.commandName as keyof typeof commandModules]
      .execute;

  try {
    await command(interaction);
  } catch (error) {
    console.error(error);
  }
}
