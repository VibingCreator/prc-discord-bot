import config from "./config";
import { OpenAIApi } from "openai";

const openai = new OpenAIApi(config);

export default openai;
