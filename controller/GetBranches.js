const express = require("express");
const router = express.Router();
const BranchListSchema = require("../models/BranchListSchema");

const getBranches = async (req, res, next) => {
  try {
    const MultiplePriorQueue = await BranchListSchema.find().sort({
      _id: 1,
    });
    if (Array.isArray(MultiplePriorQueue) && MultiplePriorQueue.length == 0) {
      res.status(404).send({ status: false, message: "No Branch Is Added" });
    } else {
      console.log(MultiplePriorQueue);
      for (var i = 0; i < MultiplePriorQueue.length; i++) {
        var resultBody = MultiplePriorQueue.map((b) => ({
          BranchId: b.BranchId,
          BranchName: b.BranchName,
        }));
      }
      res.status(200).send({ status: true, message: resultBody });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getBranches,
};
