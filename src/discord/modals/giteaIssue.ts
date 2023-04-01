import "dotenv/config";
import { ModalSubmitInteraction } from "discord.js";
import gitea from "../../gitea/client";
import { CreateIssueOption } from "gitea-api";

export async function handler(interaction: ModalSubmitInteraction) {
  const title = interaction.fields.getTextInputValue("giteaIssueTitle");
  const description = interaction.fields.getTextInputValue(
    "giteaIssueDescription"
  );

  const body: CreateIssueOption = {
    title: title,
    body: description,
  };

  try {
    await gitea.issue.issueCreateIssue({
      owner: process.env.GITEA_USERNAME,
      repo: process.env.GITEA_REPOSITORY,
      body: body,
    });
  } catch (error) {
    console.error(error);
  }

  try {
    await interaction.reply("Your issue has been submitted!");
  } catch (error) {
    console.error(error);
  }
}
