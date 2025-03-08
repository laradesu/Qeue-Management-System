const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue");
const WindowNoAndServiceType = require("../models/WinNoSchema");
const Transaction = require("../models/Transaction");
const UserCred = require("../models/TellerCred");
const AdminCredsSchema = require("../models/AdminCredsSchema");

const GetAdmins = async (req, res, next) => {
  try {
    const Branch = await AdminCredsSchema.find();
    console.log(Branch);

    if (Array.isArray(Branch) && Branch.length == 0) {
      res
        .status(404)
        .send({ status: false, message: "There Is No Registered Admin" });
    } else {
      for (var i = 0; i < Branch.length; i++) {
        var resultBody = Branch.map((b) => ({
          FirstName: b.FirstName,
          LastName: b.LastName,
          BranchName: b.BranchName,
          PhoneNumber: b.PhoneNumber,
          Email: b.Email,
          EmployeeId: b.EmployeeId,
          Role: b.Role,
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
  GetAdmins,
};
