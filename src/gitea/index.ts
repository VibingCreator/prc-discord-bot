import gitea from "./client";

gitea.user
  .userGet({ username: process.env.GITEA_USERNAME })
  .then((data) => {
    console.log(data);
  })
  .catch(console.error);
