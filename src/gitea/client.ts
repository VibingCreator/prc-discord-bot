import config from "./config";
import { GiteaApi } from "gitea-api";

const gitea = new GiteaApi(config);

export default gitea;
