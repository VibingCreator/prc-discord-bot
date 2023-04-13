import SlashCommand from "../interfaces/SlashCommand";
import {
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ModalBuilder,
} from "discord.js";

export const issue: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("issue")
    .setDescription("The bot is gonna create a Gitea issue."),
  execute: async (interaction) => {
    const modal = new ModalBuilder()
      .setTitle("Report an issue")
      .setCustomId(`giteaIssueModal:${interaction.id}`)
      .addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          new TextInputBuilder()
            .setCustomId(`giteaIssueModalTitle:${interaction.id}`)
            .setLabel("Issue title")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Short description of an issue...")
        ),
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          new TextInputBuilder()
            .setCustomId(`giteaIssueModalDescription:${interaction.id}`)
            .setLabel("Issue description")
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder("Detailed description of an issue...")
        )
      );

    await interaction.showModal(modal);
  },
};
