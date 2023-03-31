import discord from "../client";
import deployCommands from "../deployCommands";
import { Events } from "discord.js";

discord.once(Events.ClientReady, async (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);

  try {
    await deployCommands();
    console.log("Commands has been deployed!");
  } catch (error) {
    console.error(error);
  }
});
