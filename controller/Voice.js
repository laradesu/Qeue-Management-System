const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue");
const axios = require("axios");
const bcrypt = require("bcrypt");
const googleTTS = require("google-tts-api");
const fs = require("fs");
const https = require("https");
const { TextToSpeechClient } = require("@google-cloud/text-to-speech");
const say = require("say");
const bodyParser = require("body-parser");

const gtts = require("gtts");

const voice = async (req, res, next) => {
  try {
    let te = "hello desu ";
    let text = req.body.text;
    console.log(text);
    let textFinal = te + text + " 3";
    console.log(textFinal);
    // below 1.0 is the speed which can be increased
    say.speak(textFinal, "Karen", 2.0, (err) => {
      if (err) {
        return res.json({ message: err, error: true });
      }
      return res.json({ message: "Text spoken.", error: false });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

async function convertTextToSpeech(text, outputFile) {
  try {
    const client = new TextToSpeechClient();

    // Construct the request
    const request = {
      input: { text },
      voice: { languageCode: "am-ET", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3" },
    };
    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(outputFile, response.audioContent, "binary");
    console.log("Audio file saved:", outputFile);
  } catch (error) {
    console.error("Error:", error);
  }
}
module.exports = {
  voice,
};
