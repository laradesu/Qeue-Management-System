const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
const cookie = require("cookie");
const WinNoAndServiceType = require("../models/WinNoSchema");
const BranchListSchema = require("../models/BranchListSchema");
const ServiceTypeSchema = require("../models/ServiceTypeSchema");
const AdminCredsSchema = require("../models/AdminCredsSchema");
//Registration
const AdminLogout = async (req, res, next) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const EmployeeId = req.params.EmployeeId;
    const user = await AdminCredsSchema.findOne({ EmployeeId: EmployeeId });
    if (user) {
      const loginStat = user.IsLoggedIn;
      console.log(loginStat);
      if (loginStat === "true") {
        await AdminCredsSchema.updateOne(
          { EmployeeId: EmployeeId },
          { IsLoggedIn: false }
        );
        res
          .status(200)
          .send({ status: true, message: "Admin LogOut Successful" });
      } else {
        res.status(201).send({ status: false, message: "Already LoggedOut" });
      }
    } else {
      res.status(404).send({ status: false, message: "Invalid EmployeeId" });
    }
  } catch (err) {
    console.log("---> err -->", err);
    next(err);
  }
};

module.exports = {
  AdminLogout,
};
