const express = require("express");
const Transaction = require("../models/Transaction");
const Queue = require("../models/Queue");

const StatusUpdate = async (req, res, next) => {
  try {
    const { UniqueId, TransactionId } = req.body;
    console.log("request: ", req.body);
    const result = await Transaction.findOneAndUpdate(
      {
        UniqueId: UniqueId,
      },
      {
        Status: "Complete",
        TransactionId: TransactionId,
      }
    );
    console.log(result);
    const result2 = await Queue.findOneAndUpdate(
      {
        UniqueId: UniqueId,
      },
      {
        Status: "Complete",
      }
    );
    console.log(result2);
    if (result && result2) {
      res
        .status(200)
        .send({ status: true, message: "Table Updated successfully!!" });
    } else {
      res.status(404).send({
        status: false,
        message: "ID Not Found, Please Enter the Correct Id",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  StatusUpdate,
};
