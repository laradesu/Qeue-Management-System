const db = require("../app");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const queueSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    BranchName: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    EmployeeId: {
      type: String,
      required: true,
      default: null,
    },
    Password: {
      type: String,
      required: true,
    },
    IsLoggedIn: {
      type: String,
      required: true,
      default: false,
    },
    Role: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminCred", queueSchema);
