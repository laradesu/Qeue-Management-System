const express = require("express");
const Transaction = require("../models/Transaction");
const UniqueNumber = require("../models/UniqueNumber");

const StartCounter = async (req, res, next) => {
  try {
    const { UniqueId } = req.body;
    const newTicket = new UniqueNumber({
      UniqueId: UniqueId,
    }).save();
    res.send({ status: true, message: "Count Initiated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  StartCounter,
};
