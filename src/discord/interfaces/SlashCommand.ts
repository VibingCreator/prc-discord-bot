import { SlashCommandBuilder, CommandInteraction, CacheType } from "discord.js";

interface SlashCommand {
  data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  execute: (interaction: CommandInteraction<CacheType>) => Promise<void>;
}

export default SlashCommand;
