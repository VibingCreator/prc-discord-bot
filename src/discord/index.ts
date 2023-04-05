import discord from "./client";
import "./events";

discord
  .login(process.env.DISCORD_SECRET)
  .then(() => {
    console.log("Successfully authorized!");
  })
  .catch(console.error);
