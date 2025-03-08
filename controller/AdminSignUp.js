const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
const AdminCredsSchema = require("../models/AdminCredsSchema");
const { UserServices } = require("../services/generateNumber");
//Registration
const AdminSignUp = async (req, res, next) => {
  try {
    const {
      FirstName,
      LastName,
      BranchName,
      EmployeeId,
      PhoneNumber,
      Email,
      PPassword,
      Role,
    } = req.body;
    const response = await UserServices.findAdminByCustomUserId(EmployeeId);
    if (response) {
      res.status(201).send({
        status: false,
        message: "Admin With this EmployeeId already exist",
      });
    } else {
      console.log(response);
      console.log(req.body);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(PPassword, salt);
      let Password = hash;
      const createUser = await new AdminCredsSchema({
        FirstName,
        LastName,
        BranchName,
        EmployeeId,
        PhoneNumber,
        Email,
        Password,
        Role,
      });
      createUser.save();
      res
        .status(200)
        .send({ status: true, message: "Admin SignUp Successful" });
    }
  } catch (err) {
    console.log("---> err -->", err);
    next(err);
  }
};

module.exports = {
  AdminSignUp,
};
