import { REST } from "discord.js";

const rest = new REST().setToken(process.env.DISCORD_SECRET);

export default rest;
