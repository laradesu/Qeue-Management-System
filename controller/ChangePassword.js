const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
const AdminCredsSchema = require("../models/AdminCredsSchema");
const { UserServices } = require("../services/generateNumber");

const ChangePassword = async (req, res, next) => {
  const { EmployeeId, newPassword, old_password } = req.body;
  console.log("request: ", req.body);
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);
  let Password = hash;
  console.log(Password);
  try {
    let admin = await UserServices.findAdminByCustomUserId(EmployeeId);
    if (admin) {
      const passwd = admin.Password;
      console.log(passwd);
      const isMatch = await bcrypt.compare(old_password, passwd);
      console.log(isMatch);
      if (isMatch === true) {
        await AdminCredsSchema.updateOne(
          {
            EmployeeId: EmployeeId,
          },
          {
            Password: Password,
          }
        );
        res
          .status(200)
          .send({ status: true, message: "Password Changed Successfully" });
      } else {
        res
          .status(201)
          .send({ status: false, message: "Password Doesn't Match!" });
      }
    } else {
      return res.status(404).send({
        status: false,
        message: "User Doesn't Exist",
      });
    }
  } catch (err) {
    console.log("err--->", err);
  }
};

module.exports = {
  ChangePassword,
};
