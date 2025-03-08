const express = require("express");
const http = require("http");
const cookie = require("cookie");
const axios = require("axios");
const TellerCred = require("../models/TellerCred");
const UserCred = require("../models/TellerCred");
const { compare } = require("bcrypt");
const bcrypt = require("bcrypt");
const AdminCredsSchema = require("../models/AdminCredsSchema");

const AdminLogin = async (req, res, next) => {
  try {
    const { EmployeeId, password } = req.body;
    const user = await AdminCredsSchema.findOne({ EmployeeId: EmployeeId });
    console.log(user);
    if (user === null) {
      res
        .status(404)
        .send({ status: false, message: "There Is No Registered Admin" });
    } else {
      console.log("here...", user.Role);
      if (user) {
        if (user.Role === "Super") {
          const passwd = user.Password;
          const EmployeeI = user.EmployeeId;
          console.log("here...", passwd, " ", EmployeeId, " ", EmployeeI);

          const isMatch = await bcrypt.compare(password, passwd);

          if (EmployeeId !== EmployeeI || isMatch === false) {
            res.status(201).send({
              status: false,
              message: "Username or Password does not match",
            });
          }
          if (isMatch === true && EmployeeId === EmployeeI) {
            res.status(200).send({ status: 1, success: "Login Successful" });
            await AdminCredsSchema.updateOne(
              { EmployeeId: EmployeeId },
              { IsLoggedIn: true }
            );
          }
        } else if (user.Role === "Admin") {
          const passwd = user.Password;
          const EmployeeI = user.EmployeeId;
          console.log("here...", passwd, " ", EmployeeId, " ", EmployeeI);

          const isMatch = await bcrypt.compare(password, passwd);

          if (EmployeeId !== EmployeeI || isMatch === false) {
            res.status(201).send({
              status: false,
              message: "Username or Password does not match",
            });
          }
          if (isMatch === true && EmployeeId === EmployeeI) {
            res.status(200).send({ status: 0, success: "Login Successful" });
            await AdminCredsSchema.updateOne(
              { EmployeeId: EmployeeId },
              { IsLoggedIn: true }
            );
          }
        } else {
          res.status(404).send({
            status: false,
            message: "The Given User Is Neither SuperAdmin Nor Admin",
          });
        }
      } else {
        res.status(404).send({ status: 0, message: "Invalid EmployeeId" });
      }
    }
  } catch (error) {
    console.log(error, "err---->");

    next(error);
  }
};
module.exports = {
  AdminLogin,
};
