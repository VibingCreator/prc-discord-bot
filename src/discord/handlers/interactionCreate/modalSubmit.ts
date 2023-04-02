import { Interaction } from "discord.js";
import * as modals from "../../modals/";

export async function handler(interaction: Interaction) {
  if (!interaction.isModalSubmit()) {
    return;
  }

  const handler = modals[interaction.customId as keyof typeof modals].handler;

  try {
    await handler(interaction);
  } catch (error) {
    console.error(error);
  }
}
