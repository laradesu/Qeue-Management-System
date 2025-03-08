const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue");

const getStatus = async (req, res, next) => {
  try {
    const Branch = req.params.BranchName;
    const Status = "InProgress";
    const priorQueue = await Queue.find({
      BranchName: Branch,
      Status: Status,
    }).sort({ _id: -1 });
    if (Array.isArray(priorQueue) && priorQueue.length == 0) {
      res.status(404).send({ status: false, message: "No Queue InProgress" });
    } else {
      for (var i = 0; i < priorQueue.length; i++) {
        var resultBody = priorQueue.map((b) => ({
          BranchName: b.BranchName,
          Status: b.Status,
          UniqueId: b.UniqueId,
          ticketNumber: b.ticketNumber,
          WindowNumber: b.WindowNumber,
        }));
      }

      res.status(200).send({ Status: true, Result: resultBody });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
};

module.exports = {
  getStatus,
};
