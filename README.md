# OpenAI-Translator
 
# Translation API

This is a simple API that uses OpenAI's API to translate English text to other languages. It supports the following target languages: French, German, Spanish, Italian and Pidgin.

## Usage

1. Clone the repository: `git clone https://github.com/Xekhai/OpenAI-Translator.git`

2. Install the required dependencies: `npm install`

3. Add your OpenAI API key to a `.env` file in the root directory of the project:

    ```
    OPENAI_API_KEY=<your_openai_api_key>
    ```

4. Start the API: 
    ```
    node index.js
    ```

5. You can now make translation requests to the API by sending a POST request to `http://localhost:3000/translate` with the following JSON in the request body:

    ```
    {
      "text": "<text_to_translate>",
      "language": "<target_language>"
    }
    ```

The API will return the translated text in the following format:
    ```
    {
        "translatedText": "<translated_text>"
    }
    ```

## Requirements

- Node.js
- npm
- An OpenAI API key

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
