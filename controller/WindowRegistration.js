const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
const WinNoAndServiceType = require("../models/WinNoSchema");
//Registration
const WindowRegistration = async (req, res, next) => {
  try {
    const { WindowNumber } = req.body;

    const createUser = await new WinNoAndServiceType({
      WindowNumber,
    });
    createUser.save();
    res.send({ status: true, message: "Data Saved Successfully" });
  } catch (err) {
    console.log("---> err -->", err);
    next(err);
  }
};

module.exports = {
  WindowRegistration,
};
