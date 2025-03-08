const db = require("../app");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const queueSchema = new mongoose.Schema(
  {
    ServiceCode: {
      type: Number,
      required: true,
    },
    ServiceType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceTypeSchema", queueSchema);
