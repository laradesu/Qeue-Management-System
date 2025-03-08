const express = require("express");
const router = express.Router();
const BranchListSchema = require("../models/BranchListSchema");
const AdminCredsSchema = require("../models/AdminCredsSchema");

const IsSuperAdmin = async (req, res, next) => {
  try {
    const EmployeeId = req.body.EmployeeId;
    const IsSuperAdmin = await AdminCredsSchema.find({
      EmployeeId: EmployeeId,
    });
    const issuper = IsSuperAdmin[0].Role;
    if (issuper === "Admin") {
      res.status(201).send({
        status: false,
        message: "You Are Not Super Admin",
      });
    } else {
      res.status(200).send({
        status: true,
        message: "You Are Super Admin",
      });
    }
    //console.log(IsSuperAdmin[0].IsSuperAdmin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  IsSuperAdmin,
};
