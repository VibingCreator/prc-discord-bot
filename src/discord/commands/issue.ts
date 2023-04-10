import SlashCommand from "../interfaces/SlashCommand";

import {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from "discord.js";

export const issue: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("issue")
    .setDescription("The bot is gonna create a Gitea issue."),
  execute: async (interaction) => {
    const modal = new ModalBuilder()
      .setCustomId("giteaIssue")
      .setTitle("Create Gitea Issue");

    const titleInput = new TextInputBuilder()
      .setCustomId("giteaIssueTitle")
      .setLabel("Title")
      .setStyle(TextInputStyle.Short);

    const descriptionInput = new TextInputBuilder()
      .setCustomId("giteaIssueDescription")
      .setLabel("Description")
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(titleInput),
      new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionInput)
    );

    await interaction.showModal(modal);
  },
};
