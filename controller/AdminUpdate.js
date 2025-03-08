const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
const AdminCredsSchema = require("../models/AdminCredsSchema");
//Registration
const AdminUpdate = async (req, res, next) => {
  try {
    const {
      FirstName,
      LastName,
      EmployeeId,
      PhoneNumber,
      Email,
      PPassword,
      Role,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(PPassword, salt);
    let Password = hash;
    console.log(Password);

    await AdminCredsSchema.updateMany(
      { EmployeeId: EmployeeId },
      {
        FirstName,
        LastName,
        EmployeeId,
        PhoneNumber,
        Email,
        Password,
        Role,
      }
    );
    res.send({ status: true, message: "Admin Data Updated Successfully" });
  } catch (err) {
    console.log("---> err -->", err);
    next(err);
  }
};

module.exports = {
  AdminUpdate,
};
