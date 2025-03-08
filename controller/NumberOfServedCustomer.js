const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue");
const axios = require("axios");
const { url } = require("inspector");
const TellerCred = require("../models/TellerCred");

const NumberOfServedCustomer = async (req, res, next) => {
  try {
    const TellerId = req.params.TellerId;
    const Status = "Complete";
    const branchName = await TellerCred.findOne({ TellerId: TellerId });
    const BranchNamefromDB = branchName.BranchName;
    const priorQueue = await Queue.find({
      BranchName: BranchNamefromDB,
      Status: Status,
    });
    if (Array.isArray(priorQueue) && priorQueue.length == 0) {
      res
        .status(404)
        .send({ status: false, message: "There Is No Served Queue" });
    } else {
      const numberOfServed = priorQueue.length;

      res.status(200).send({ NumberOfServedCustomer: numberOfServed });
      console.log("NumberOfServedCustomer", numberOfServed);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
};

module.exports = {
  NumberOfServedCustomer,
};
