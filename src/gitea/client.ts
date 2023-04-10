import { GiteaApi } from "gitea-api";

const gitea = new GiteaApi({
  BASE: process.env.GITEA_BASE_URL,
  WITH_CREDENTIALS: true,
  TOKEN: process.env.GITEA_SECRET,
});

export default gitea;
