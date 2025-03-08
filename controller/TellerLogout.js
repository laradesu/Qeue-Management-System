const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
const cookie = require("cookie");
const WinNoAndServiceType = require("../models/WinNoSchema");
const BranchListSchema = require("../models/BranchListSchema");
const ServiceTypeSchema = require("../models/ServiceTypeSchema");
const AdminCredsSchema = require("../models/AdminCredsSchema");
const TellerCred = require("../models/TellerCred");
//Registration
const TellerLogout = async (req, res, next) => {
  try {
    const TellerId = req.params.TellerId;
    const user = await TellerCred.findOne({ TellerId: TellerId });
    if (user) {
      const loginStat = user.IsLoggedIn;
      console.log(loginStat);
      if (loginStat === "true") {
        await TellerCred.updateOne(
          { TellerId: TellerId },
          { IsLoggedIn: false }
        );
        res
          .status(200)
          .send({ status: true, message: "Teller LogOut Successful" });
      } else {
        res.status(201).send({ status: false, message: "Already Logged out" });
      }
    } else {
      res.status(404).send({ status: false, message: "Invalid TellerId" });
    }
  } catch (err) {
    console.log("---> err -->", err);
    next(err);
  }
};

module.exports = {
  TellerLogout,
};
