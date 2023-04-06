import discord from "./discord/client";
import "./discord/events";

discord
  .login(process.env.DISCORD_SECRET)
  .then(() => {
    console.log("Successfully authorized!");
  })
  .catch(console.error);
