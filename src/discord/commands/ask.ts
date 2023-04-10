import SlashCommand from "../interfaces/SlashCommand";
import { SlashCommandBuilder } from "discord.js";
import openai from "../../openai/client";

export const ask: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("The bot is gonna answer your question using OpenAI.")
    .addStringOption((option) => {
      return option
        .setName("question")
        .setDescription("Provide your question.")
        .setRequired(true);
    }),
  execute: async (interaction) => {
    const question = interaction.options.get("question", true);

    await interaction.deferReply();

    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 500,
        prompt: question.value as string,
      });

      await interaction.followUp(completion.data.choices[0].text ?? "");
    } catch (error) {
      console.error(error);
    }
  },
};
