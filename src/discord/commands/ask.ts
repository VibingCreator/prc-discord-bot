import "dotenv/config";
import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import openai from "../../openai/client";

export const data = new SlashCommandBuilder()
  .setName("ask")
  .setDescription("The bot is gonna answer your question using OpenAI.")
  .addStringOption((option) =>
    option
      .setName("question")
      .setDescription("Provide your question.")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  const question = interaction.options.get("question");

  await interaction.deferReply();

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 500,
      prompt: question?.value as string,
    });

    await interaction.followUp(completion.data.choices[0].text ?? "");
  } catch (error) {
    console.error(error);
  }
}
