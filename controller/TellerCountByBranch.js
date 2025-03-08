const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue");
const WindowNoAndServiceType = require("../models/WinNoSchema");
const Transaction = require("../models/Transaction");
const UserCred = require("../models/TellerCred");
const AdminCredsSchema = require("../models/AdminCredsSchema");
const TellerCred = require("../models/TellerCred");

const TellerCountByBranch = async (req, res, next) => {
  try {
    const BranchName = req.params.BranchName;

    const Branch = await TellerCred.find({ BranchName: BranchName });
    console.log(Branch);
    //const BranchNameFromDB = Branch.BranchName;
    const count = Branch.length;
    console.log(count);

    // const MultiplePriorQueue = await UserCred.find({
    //   BranchName: BranchNameFromDB,
    // }).sort({
    //   _id: 1,
    // });
    if (Array.isArray(Branch) && Branch.length == 0) {
      res
        .status(404)
        .send({ status: false, message: "There Is No Registered Teller" });
    } else {
      for (var i = 0; i < Branch.length; i++) {
        var resultBody = Branch.map((b) => ({
          FirstName: b.FirstName,
          LastName: b.LastName,
          BranchName: b.BranchName,
          PhoneNumber: b.PhoneNumber,
          Email: b.Email,
          TellerId: b.TellerId,
        }));
      }
      res
        .status(200)
        .send({ status: true, TellerCount: count, message: resultBody });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
};

module.exports = {
  TellerCountByBranch,
};
