import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("The bot is gonna reply with a pong message.");

export async function execute(interaction: CommandInteraction) {
  try {
    await interaction.reply("Pong!");
  } catch (error) {
    console.error(error);
  }
}
