import "dotenv/config";
import { ModalSubmitInteraction, AwaitReactionsOptions } from "discord.js";
import gitea from "../../gitea/client";
import { CreateIssueOption } from "gitea-api";

export async function handler(interaction: ModalSubmitInteraction) {
  const title = interaction.fields.getTextInputValue("giteaIssueTitle");
  const description = interaction.fields.getTextInputValue(
    "giteaIssueDescription"
  );

  try {
    const message = await interaction.reply({
      content: `\`\`\`${title}\`\`\`\`\`\`${description}\`\`\``,
      fetchReply: true,
    });

    await message?.react("✅");
    await message?.react("❌");

    const reactionOptions: AwaitReactionsOptions = {
      filter: (reaction, user) => {
        if (user.bot) return false;

        const isAdmin =
          reaction.message.member?.permissions.has("Administrator") ?? false;

        return (
          isAdmin &&
          (reaction.emoji.name === "✅" || reaction.emoji.name === "❌")
        );
      },
      max: 1,
    };

    const reaction = await message?.awaitReactions(reactionOptions);

    const emoji = reaction?.first()?.emoji.name;

    if (emoji === "✅") {
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
        await message?.delete();
      } catch (error) {
        console.error(error);
      }
    } else {
      await message?.delete();
    }
  } catch (error) {
    console.error(error);
  }
}
