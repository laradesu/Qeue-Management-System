const db = require("../app");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const queueSchema = new mongoose.Schema(
  {
    WindowNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WinNoSchema", queueSchema);
