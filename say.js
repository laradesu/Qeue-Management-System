const express = require("express");
const app = express();

// require say moudle
const say = require("say");

// require body parser to hahlde the user inputs
const bodyParser = require("body-parser");

// useing body parser middlewares to handle the user intput streams.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API to change the text to voice over link http://localhost:3000/speak
app.post("/speak", (req, res) => {
  let text = req.body.text;
  // below 1.0 is the speed which can be increased
  say.speak(text, "Amharic", 1.0, (err) => {
    if (err) {
      return res.json({ message: err, error: true });
    }
    return res.json({ message: "Text spoken.", error: false });
  });
});

app.listen(3000, () => {
  console.log("app is running over port:" + 3000);
});
