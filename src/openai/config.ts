import "dotenv/config";
import { Configuration } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_SECRET,
});

export default config;
