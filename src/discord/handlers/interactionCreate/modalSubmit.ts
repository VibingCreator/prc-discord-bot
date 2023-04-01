import { ModalSubmitInteraction } from "discord.js";
import * as modals from "../../modals/";

export async function handler(interaction: ModalSubmitInteraction) {
  switch (interaction.customId) {
    case "giteaIssue": {
      await modals.giteaIssue.handler(interaction);
      break;
    }

    default: {
      break;
    }
  }
}
