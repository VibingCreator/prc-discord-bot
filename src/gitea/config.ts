const config = {
  BASE: process.env.GITEA_BASE_URL,
  WITH_CREDENTIALS: true,
  TOKEN: process.env.GITEA_SECRET,
};

export default config;
