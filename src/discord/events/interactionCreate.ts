import discord from "../client";
import { Events } from "discord.js";
import * as commandModules from "../commands";
import gitea from "../../gitea/client";

discord.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isCommand()) {
    const command =
      commandModules[interaction.commandName as keyof typeof commandModules]
        .execute;

    try {
      await command(interaction);
    } catch (error) {
      console.error(error);
    }

    return;
  }

  if (interaction.isModalSubmit()) {
    switch (interaction.customId) {
      case "giteaIssue": {
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

          const reaction = await message?.awaitReactions({
            filter: (reaction, user) => {
              if (user.bot) return false;

              const guild = discord.guilds.cache.get(
                process.env.DISCORD_GUILD_ID
              );
              const member = guild?.members.cache.get(user.id);
              const isAdmin = member?.permissions.has("Administrator") ?? false;

              return (
                isAdmin &&
                (reaction.emoji.name === "✅" || reaction.emoji.name === "❌")
              );
            },
            max: 1,
          });

          const emoji = reaction?.first()?.emoji.name;

          if (emoji === "✅") {
            try {
              await gitea.issue.issueCreateIssue({
                owner: process.env.GITEA_USERNAME,
                repo: process.env.GITEA_REPOSITORY,
                body: {
                  title: title,
                  body: description,
                },
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
        break;
      }

      default: {
        console.log(interaction.customId);
        break;
      }
    }

    return;
  }
});
