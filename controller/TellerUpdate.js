const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
//Registration
const TellerUpdate = async (req, res, next) => {
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
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(PPassword, salt);
    let Password = hash;
    console.log(Password);

    await UserCred.updateMany(
      { TellerId: TellerId },
      {
        WindowNumber: WindowNumber,
        FirstName: FirstName,
        LastName: LastName,
        BranchName: BranchName,
        TellerId: TellerId,
        PhoneNumber: PhoneNumber,
        Email: Email,
        Password: Password,
        WindowNumber: WindowNumber,
      }
    );
    res
      .status(200)
      .send({ status: true, message: "Data Updated Successfully" });
  } catch (err) {
    console.log("---> err -->", err);
    next(err);
  }
};

module.exports = {
  TellerUpdate,
};
