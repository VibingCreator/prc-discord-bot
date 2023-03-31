import "dotenv/config";
import discord from "./client";
import { Events } from "discord.js";
import * as commands from "./commands";
import deployCommands from "./deployCommands";

discord.once(Events.ClientReady, async (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);

  try {
    await deployCommands();
    console.log("Commands has been deployed!");
  } catch (error) {
    console.error(error);
  }
});

discord.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = commands[interaction.commandName as keyof typeof commands];

  try {
    await command.execute(interaction);
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
