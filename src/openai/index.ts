import openai from "./client";

openai
  .createCompletion({
    model: "text-davinci-003",
    prompt: "hello world",
  })
  .then((response) => {
    console.log(response.data.choices[0].text);
  })
  .catch(console.error);
