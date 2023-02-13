const express = require("express");
const dotenv = require("dotenv");
const bp = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

// Load environment variables from the .env file
dotenv.config();

// Create an Express app and configure middlewares
const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// Configure the OpenAI API client with the API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Array of allowed target languages
const allowedLanguages = ["French", "German", "Spanish", "Italian", "Pidgin"];

// Define an endpoint to handle translation requests
app.post("/translate", (req, res) => {
  // Extract the text to translate and the target language from the request body
  const text = req.body.text;
  const language = req.body.language;

  // Check if the text to be translated is not empty
  if (!text) {
    return res.status(400).send({ error: "Text to be translated cannot be empty" });
  }

  // Check if the target language is one of the allowed languages
  if (!allowedLanguages.includes(language)) {
    return res.status(400).send({ error: `Translation to ${language} is not supported` });
  }

  // Use OpenAI API to translate the text
  openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: `Translate '${text}' from English to ${language}`,
      temperature: 0,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((response) => {
      // Extract the translated text from the API response
      const translatedText = response.data.choices[0].text;

      // Send the translated text back to the client
      res.send({ translatedText });
    });
});

// Start the Express app and listen on port 3000
app.listen(3000, () => {
  console.log("Translation API listening on port 3000");
});
