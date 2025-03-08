const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
const { UserServices } = require("../services/generateNumber");
//Registration
const TellerRegistration = async (req, res, next) => {
  try {
    const {
      FirstName,
      LastName,
      BranchName,
      TellerId,
      PhoneNumber,
      Email,
      PPassword,
      WindowNumber,
    } = req.body;
    const response = await UserServices.findAdminByCustomTellerId(TellerId);
    if (response) {
      res.status(201).send({
        status: false,
        message: "Teller With this ID already registered!",
      });
    } else {
      console.log("request: ", req.body);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(PPassword, salt);
      let Password = hash;

      const createUser = await new UserCred({
        FirstName,
        LastName,
        BranchName,
        TellerId,
        PhoneNumber,
        Email,
        Password,
        WindowNumber,
      });
      createUser.save();
      res
        .status(200)
        .send({ status: true, message: "Data Saved Successfully" });
    }
  } catch (err) {
    console.log("---> err -->", err);
    next(err);
  }
};

module.exports = {
  TellerRegistration,
};
