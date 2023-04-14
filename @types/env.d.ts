declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_SECRET: string;
      DISCORD_CLIENT_ID: string;
      GITEA_SECRET: string;
      GITEA_BASE_URL: string;
      OPENAI_SECRET: string;
    }
  }
}

export {};
