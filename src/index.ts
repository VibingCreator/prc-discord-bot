import discord from "./discord/client";
import * as slashCommands from "./discord/commands";
import deployCommands from "./discord/deployCommands";
import { Events } from "discord.js";
import gitea from "./gitea/client";

discord.once(Events.ClientReady, async (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);

  for (const guild of client.guilds.cache.values()) {
    try {
      await deployCommands(guild);
    } catch (error) {
      console.error(error);
    }
  }
});

discord.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isCommand()) {
    const slashCommand =
      slashCommands[interaction.commandName as keyof typeof slashCommands]
        .execute;

    try {
      await slashCommand(interaction);
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

              const guild = discord.guilds.cache.get(message.guildId as string);
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

discord.on(Events.GuildCreate, async (guild) => {
  try {
    await deployCommands(guild);
  } catch (error) {
    console.error(error);
  }
});

discord
  .login(process.env.DISCORD_SECRET)
  .then(() => {
    console.log("Successfully authorized!");
  })
  .catch(console.error);
