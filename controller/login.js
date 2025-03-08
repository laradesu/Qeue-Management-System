const express = require("express");
const http = require("http");
const cookie = require("cookie");
const axios = require("axios");
const TellerCred = require("../models/TellerCred");
const UserCred = require("../models/TellerCred");
const { compare } = require("bcrypt");
const bcrypt = require("bcrypt");
const { UserServices } = require("../services/generateNumber");

const login = async (req, res, next) => {
  try {
    const { TellerId, WindowNumber, password } = req.body;
    console.log("request: ", req.body);
    const user = await TellerCred.findOne({ TellerId: TellerId });
    if (user) {
      const window = user.WindowNumber;
      const passwd = user.Password;
      const TellerI = user.TellerId;
      console.log("here fromDB...", passwd, " ", TellerI);

      const isMatch = await bcrypt.compare(password, passwd);

      if (TellerId !== TellerI || isMatch === false) {
        res.status(201).send({
          status: false,
          message: "Username or Password does not match",
        });
      }

      if (isMatch === true && TellerId === TellerI) {
        res.status(200).send({ status: true, success: "Login Successful" });
        await TellerCred.updateOne(
          { TellerId: TellerId },
          { WindowNumber: WindowNumber, IsLoggedIn: true }
        );
      }
    } else {
      res.status(404).send({ status: false, message: "Invalid TellerId" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};
module.exports = {
  login,
};
