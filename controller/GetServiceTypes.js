const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue");
const WindowNoAndServiceType = require("../models/WinNoSchema");
const Transaction = require("../models/Transaction");
const UserCred = require("../models/TellerCred");
const WinNoSchema = require("../models/WinNoSchema");
const ServiceTypeSchema = require("../models/ServiceTypeSchema");

const getServiceTypes = async (req, res, next) => {
  try {
    const MultiplePriorQueue = await ServiceTypeSchema.find().sort({
      _id: 1,
    });
    if (Array.isArray(MultiplePriorQueue) && MultiplePriorQueue.length == 0) {
      res
        .status(404)
        .send({ status: false, message: "No ServiceType Is Added" });
    } else {
      for (var i = 0; i < MultiplePriorQueue.length; i++) {
        var resultBody = MultiplePriorQueue.map((b) => ({
          ServiceCode: b.ServiceCode,
          ServiceType: b.ServiceType,
        }));
      }
      res.status(200).send({ status: true, message: resultBody });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
};

module.exports = {
  getServiceTypes,
};
