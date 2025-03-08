const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue");
const axios = require("axios");
const { url } = require("inspector");
const TellerCred = require("../models/TellerCred");
const AdminCredsSchema = require("../models/AdminCredsSchema");
const BranchListSchema = require("../models/BranchListSchema");

const NumberOfBranchs = async (req, res, next) => {
  try {
    const NumberOfBranchs = await BranchListSchema.find();
    if (Array.isArray(NumberOfBranchs) && NumberOfBranchs.length == 0) {
      res
        .status(404)
        .send({ status: false, message: "There are no registered Branchs" });
    } else {
      const NoOfBranchs = NumberOfBranchs.length;

      res.status(200).send({ NumberOfBranchs: NoOfBranchs });
      console.log("NumberOfBranchs", NoOfBranchs);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
};

module.exports = {
  NumberOfBranchs,
};
