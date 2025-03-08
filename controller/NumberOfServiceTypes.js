const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue");
const axios = require("axios");
const { url } = require("inspector");
const TellerCred = require("../models/TellerCred");
const AdminCredsSchema = require("../models/AdminCredsSchema");
const BranchListSchema = require("../models/BranchListSchema");
const ServiceTypeSchema = require("../models/ServiceTypeSchema");

const NumberOfServiceTypes = async (req, res, next) => {
  try {
    const NumberOfServiceTypes = await ServiceTypeSchema.find();
    if (
      Array.isArray(NumberOfServiceTypes) &&
      NumberOfServiceTypes.length == 0
    ) {
      res.status(404).send({
        status: false,
        message: "There are no registered ServiceType",
      });
    } else {
      const NoOfServiceTypes = NumberOfServiceTypes.length;

      res.status(200).send({ NumberOfServiceTypes: NoOfServiceTypes });
      console.log("NumberOfBranchs", NoOfServiceTypes);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
};

module.exports = {
  NumberOfServiceTypes,
};
