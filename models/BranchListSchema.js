const db = require("../app");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const queueSchema = new mongoose.Schema(
  {
    BranchId: {
      type: String,
      required: true,
    },
    BranchName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BranchSchema", queueSchema);
