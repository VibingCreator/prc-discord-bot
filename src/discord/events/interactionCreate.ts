import discord from "../client";
import { Events } from "discord.js";
import * as commands from "../commands";

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
