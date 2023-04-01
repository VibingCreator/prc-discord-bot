import { ModalSubmitInteraction } from "discord.js";
import * as modals from "../../modals/";

export async function handler(interaction: ModalSubmitInteraction) {
  const handler = modals[interaction.customId as keyof typeof modals].handler;

  try {
    await handler(interaction);
  } catch (error) {
    console.error(error);
  }
}
