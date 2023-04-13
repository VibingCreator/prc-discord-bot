import discord from "./discord/client";
import * as slashCommands from "./discord/commands";
import * as handlers from "./discord/handlers";
import deployCommands from "./discord/deployCommands";
import { Events } from "discord.js";

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
    const modalId = interaction.customId.split(":")[0];

    const modalHandler =
      handlers.modals[modalId as keyof typeof handlers.modals];

    try {
      await modalHandler(interaction);
    } catch (error) {
      console.error(error);
    }

    return;
  }

  if (interaction.isMessageComponent()) {
    if (interaction.isButton()) {
      const buttonId = interaction.customId.split(":")[0];

      const buttonHandler =
        handlers.buttons[buttonId as keyof typeof handlers.buttons];

      try {
        await buttonHandler(interaction);
      } catch (error) {
        console.error(error);
      }

      return;
    }

    if (interaction.isStringSelectMenu()) {
      const selectMenuId = interaction.customId.split(":")[0];

      const selectMenuHandler =
        handlers.selectMenus[selectMenuId as keyof typeof handlers.selectMenus];

      try {
        await selectMenuHandler(interaction);
      } catch (error) {
        console.error(error);
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
