const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
const AdminCredsSchema = require("../models/AdminCredsSchema");
//Registration
const DeleteAdmin = async (req, res, next) => {
  try {
    const { EmployeeId } = req.body;
    const result = await AdminCredsSchema.deleteOne({ EmployeeId: EmployeeId });
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
  DeleteAdmin,
};
