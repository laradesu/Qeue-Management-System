const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
//Registration
const DeleteTeller = async (req, res, next) => {
  try {
    const { TellerId } = req.body;
    const result = await UserCred.deleteOne({ TellerId: TellerId });
    if (result.acknowledged === true) {
      res
        .status(200)
        .send({ status: true, message: "User Deleted Successfully" });
    } else {
      res.status(404).send({ status: false, message: "Unable To Delete User" });
    }
  } catch (err) {
    console.log("---> err -->", err);
    next(err);
  }
};

module.exports = {
  DeleteTeller,
};
