const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
const AdminCredsSchema = require("../models/AdminCredsSchema");
const { UserServices } = require("../services/generateNumber");
const TellerCred = require("../models/TellerCred");

const TellerPasswordChange = async (req, res, next) => {
  const { TellerId, newPassword, old_password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);
  let Password = hash;
  console.log(Password);
  try {
    let admin = await UserServices.findAdminByCustomTellerId(TellerId);
    const passwd = admin.Password;
    console.log(passwd);
    if (!admin) {
      return res.status(201).send({
        message: "User Doesn't Exist",
      });
    } else {
      const isMatch = await bcrypt.compare(old_password, passwd);
      console.log(isMatch);
      if (isMatch === true) {
        await TellerCred.updateOne(
          {
            TellerId: TellerId,
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
          .send({ status: false, message: "Password Doesn't match" });
      }
    }
  } catch (err) {
    return res.status(201).send({
      message: `Password Update Failed ${err.message}`,
    });
  }
};

module.exports = {
  TellerPasswordChange,
};
