import SlashCommand from "../interfaces/SlashCommand";
import { SlashCommandBuilder } from "discord.js";

export const ping: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("The bot is gonna reply with a pong message."),
  execute: async (interaction) => {
    try {
      await interaction.reply("Pong!");
    } catch (error) {
      console.error(error);
    }
  },
};
