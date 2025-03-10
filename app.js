const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const queueRoutes = require("./routes/queue");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const filter = require("content-filter");
const hpp = require("hpp");
const https = require("https");
const xssClean = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const { UserServices } = require("./services/generateNumber");
const { setCookieMiddleware } = require("./Middleware/setCookieMiddleware");
const fs = require("fs");
var privateKey = fs.readFileSync("./cert/key.pem");
var certificate = fs.readFileSync("./cert/certificate.pem");
dotenv.config();
const optionsHttps = {
  key: privateKey,
  cert: certificate,
};

mongoose
  .connect("mongodb://127.0.0.1:27017/queue-management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://telembot.amhabank.cm.et",
      "http://172.31.25.46:3030",
      "http://172.31.2.46:3031",
      "http://172.34.2.46:3032",
      "http://172.51.2.46:3033",
      "http://localhost:3000"
    ],
    credentials: true,
  })
);
app.use(helmet());
app.use(xssClean());
app.use(hpp());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(setCookieMiddleware);
app.use("/api/queue", queueRoutes);

// Other middleware and routes can be added here
const PORT = process.env.PORT;
// const httpServer = https.createServer(optionsHttps, app);
// const server = httpServer.listen(PORT, () =>
//   console.log(`Backend server port: ${PORT}`)
// );
//
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
