const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue");
const axios = require("axios");
const { url } = require("inspector");
const TellerCred = require("../models/TellerCred");
const AdminCredsSchema = require("../models/AdminCredsSchema");

const NumberOfAdmins = async (req, res, next) => {
  try {
    const NoOfAdmins = await AdminCredsSchema.find();
    if (Array.isArray(NoOfAdmins) && NoOfAdmins.length == 0) {
      res
        .status(404)
        .send({ status: false, message: "There are no registered Admins" });
    } else {
      const numberOfAdmins = NoOfAdmins.length;

      res.status(200).send({ numberOfAdmins: numberOfAdmins });
      console.log("numberOfAdmins", numberOfAdmins);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
};

module.exports = {
  NumberOfAdmins,
};
