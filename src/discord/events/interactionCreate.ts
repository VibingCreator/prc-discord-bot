import discord from "../client";
import { Events, InteractionType } from "discord.js";
import * as handlers from "../handlers";

const interactionTypesToName = {
  [InteractionType.ApplicationCommand]:
    handlers.interactionCreate.applicationCommand,
  [InteractionType.ModalSubmit]: handlers.interactionCreate.modalSubmit,
};

discord.on(Events.InteractionCreate, async (interaction) => {
  const handler =
    interactionTypesToName[
      interaction.type as keyof typeof interactionTypesToName
    ].handler;

  try {
    await handler(interaction);
  } catch (error) {
    console.error(error);
  }
});
