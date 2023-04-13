import {
  ModalSubmitInteraction,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ActionRowBuilder,
} from "discord.js";
import gitea from "../../../gitea/client";

export async function giteaIssueModal(interaction: ModalSubmitInteraction) {
  await interaction.deferReply();

  const giteaIssueModalData = [...interaction.fields.fields.keys()];

  const giteaIssueModalTitle = interaction.fields.getTextInputValue(
    giteaIssueModalData[0]
  );
  const giteaIssueModalDescription = interaction.fields.getTextInputValue(
    giteaIssueModalData[1]
  );

  const embed = new EmbedBuilder()
    .setTitle(giteaIssueModalTitle)
    .setDescription(giteaIssueModalDescription);

  const allRepositories = [];
  const users = await gitea.admin.adminGetAllUsers({});
  const organizations = await gitea.organization.orgGetAll({});

  for await (const organization of organizations) {
    const repositories = await gitea.user.userListRepos({
      username: organization.username as string,
    });

    for (const repository of repositories) {
      allRepositories.push(repository);
    }
  }

  for await (const user of users) {
    const repositories = await gitea.user.userListRepos({
      username: user.login as string,
    });

    for (const repository of repositories) {
      allRepositories.push(repository);
    }
  }

  const selectMenu =
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(`giteaIssueSelectMenuRepository:${interaction.id}`)
        .setPlaceholder("Select Repository")
        .addOptions(
          allRepositories.map((repository) => ({
            label: repository.full_name as string,
            description: `Issues: ${repository.open_issues_count ?? 0}`,
            value: `${repository.full_name ?? ""}`,
          }))
        )
    );

  const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`giteaIssueButtonSubmit:${interaction.id}`)
      .setLabel("Submit")
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId(`giteaIssueButtonCancel:${interaction.id}`)
      .setLabel("Cancel")
      .setStyle(ButtonStyle.Danger)
  );

  try {
    await interaction.editReply({
      embeds: [embed],
      components: [selectMenu, buttons],
    });
  } catch (error) {
    console.error(error);
  }
}
