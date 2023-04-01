declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_SECRET: string;
      DISCORD_CLIENT_ID: string;
      DISCORD_GUILD_ID: string;
      GITEA_SECRET: string;
      GITEA_BASE_URL: string;
      GITEA_USERNAME: string;
      GITEA_REPOSITORY: string;
      OPENAI_SECRET: string;
    }
  }
}

export {};
