const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue");
const WindowNoAndServiceType = require("../models/WinNoSchema");
const Transaction = require("../models/Transaction");

const getTellerTransInfo = async (req, res, next) => {
  try {
    const { TellerId } = req.body;
    const MultiplePriorQueue = await Transaction.find({
      TellerId: TellerId,
      Status: "Complete",
    }).sort({
      _id: 1,
    });
    if (Array.isArray(MultiplePriorQueue) && MultiplePriorQueue.length == 0) {
      res.status(404).send({
        status: false,
        message: "There Is No Transaction By This TellerId",
      });
    } else {
      res
        .status(200)
        .send({ status: true, message: MultiplePriorQueue.length });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
};

module.exports = {
  getTellerTransInfo,
};
