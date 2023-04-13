import { EmbedBuilder, StringSelectMenuInteraction } from "discord.js";

export async function giteaIssueSelectMenuRepository(
  interaction: StringSelectMenuInteraction
) {
  if (interaction.memberPermissions?.has("Administrator")) {
    const embed = new EmbedBuilder()
      .setTitle(interaction.message.embeds[0].title)
      .setDescription(interaction.message.embeds[0].description)
      .setFooter({
        text: interaction.values[0],
      })
      .setColor("Green");

    await interaction.message.edit({
      embeds: [embed],
      components: interaction.message.components,
    });

    await interaction.reply({});

    return;
  }

  await interaction.reply({
    content: "Only Administrators can select repository!",
    ephemeral: true,
  });
}
