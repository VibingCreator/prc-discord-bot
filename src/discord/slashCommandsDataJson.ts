import * as slashCommands from "./commands";
import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";

const slashCommandsDataJson: RESTPostAPIChatInputApplicationCommandsJSONBody[] =
  Object.values(slashCommands).map((command) => command.data.toJSON());

export default slashCommandsDataJson;
