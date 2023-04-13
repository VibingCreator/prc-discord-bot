import { MessageComponentInteraction } from "discord.js";
import gitea from "../../../gitea/client";

export async function giteaIssueButtonSubmit(
  interaction: MessageComponentInteraction
) {
  if (interaction.memberPermissions?.has("Administrator")) {
    const title = interaction.message.embeds[0].title;
    const description = interaction.message.embeds[0].description;
    const footer = interaction.message.embeds[0].footer?.text.split(
      "/"
    ) as string[];

    try {
      await gitea.issue.issueCreateIssue({
        owner: footer[0],
        repo: footer[1],
        body: {
          title: title as string,
          body: description as string,
        },
      });

      await interaction.message.delete();
    } catch (error) {
      console.error(error);
    }

    return;
  }

  await interaction.reply({
    content: "Only Administrators can submit issues!",
    ephemeral: true,
  });
}
