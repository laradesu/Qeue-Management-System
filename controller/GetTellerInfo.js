const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue");
const WindowNoAndServiceType = require("../models/WinNoSchema");
const Transaction = require("../models/Transaction");
const UserCred = require("../models/TellerCred");
const AdminCredsSchema = require("../models/AdminCredsSchema");

const getTellerInfo = async (req, res, next) => {
  try {
    const variableValue = req.cookies.WindowNumber;
    const EmployeeId = req.params.EmployeeId;

    const Branch = await AdminCredsSchema.findOne({ EmployeeId: EmployeeId });
    const BranchNameFromDB = Branch.BranchName;
    //console.log("winNo.: ", variableValue);

    const MultiplePriorQueue = await UserCred.find({
      BranchName: BranchNameFromDB,
    }).sort({
      _id: 1,
    });
    if (Array.isArray(MultiplePriorQueue) && MultiplePriorQueue.length == 0) {
      res
        .status(404)
        .send({ status: false, message: "There Is No Registered Teller" });
    } else {
      for (var i = 0; i < MultiplePriorQueue.length; i++) {
        var resultBody = MultiplePriorQueue.map((b) => ({
          FirstName: b.FirstName,
          LastName: b.LastName,
          BranchName: b.BranchName,
          PhoneNumber: b.PhoneNumber,
          Email: b.Email,
          TellerId: b.TellerId,
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
  getTellerInfo,
};
