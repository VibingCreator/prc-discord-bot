import { MessageComponentInteraction } from "discord.js";

export async function giteaIssueButtonCancel(
  interaction: MessageComponentInteraction
) {
  if (interaction.memberPermissions?.has("Administrator")) {
    await interaction.message.delete();
    return;
  }

  await interaction.reply({
    content: "Only Administrators can cancel issues!",
    ephemeral: true,
  });
}
