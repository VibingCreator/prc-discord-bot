import { Interaction } from "discord.js";
import * as commandModules from "../../commands";

export async function handler(interaction: Interaction) {
  if (!interaction.isCommand()) {
    return;
  }

  const command =
    commandModules[interaction.commandName as keyof typeof commandModules]
      .execute;

  try {
    await command(interaction);
  } catch (error) {
    console.error(error);
  }
}
