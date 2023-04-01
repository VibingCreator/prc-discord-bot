import discord from "../client";
import { Events, InteractionType } from "discord.js";
import * as handlers from "../handlers";

discord.on(Events.InteractionCreate, async (interaction) => {
  switch (interaction.type) {
    case InteractionType.ApplicationCommand: {
      await handlers.interactionCreate.applicationCommand.handler(interaction);
      break;
    }

    case InteractionType.ModalSubmit: {
      await handlers.interactionCreate.modalSubmit.handler(interaction);
      break;
    }

    default: {
      break;
    }
  }
});
