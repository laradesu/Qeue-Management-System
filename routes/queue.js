const express = require("express");
const router = express.Router();
const Queue = require("../models/Queue");
const axios = require("axios");
const bcrypt = require("bcrypt");
const googleTTS = require("google-tts-api");
const fs = require("fs");
const https = require("https");
const TellerCred = require("../models/TellerCred");
const { GenerateTicket } = require("../controller/GenerateTicket");
const { NextCustomer } = require("../controller/NextCustomer");
const {
  NumberOfPendingCustomer,
} = require("../controller/NumberOfPendingCustomer");
const {
  NumberOfServedCustomer,
} = require("../controller/NumberOfServedCustomer");
const { voice } = require("../controller/Voice");
const { login } = require("../controller/login");
const { getStatus } = require("../controller/getStatus");
const { StatusUpdate } = require("../controller/StatusUpdate");
const { StartCounter } = require("../controller/StartCounter");
const { TellerRegistration } = require("../controller/TellerRegistration");
const { WindowRegistration } = require("../controller/WindowRegistration");
const { getTellerTransInfo } = require("../controller/getTellerTransInfo");
const { TellerUpdate } = require("../controller/TellerUpdate");
const { DeleteTeller } = require("../controller/DeleteTeller");
const { DeleteWindow } = require("../controller/DeleteWindow");
const { AddBranch } = require("../controller/AddBranch");
const { DeleteBranch } = require("../controller/DeleteBranch");
const { UpdateBranch } = require("../controller/UpdateBranch");
const { AddServiceType } = require("../controller/AddServiceType");
const { DeleteServiceType } = require("../controller/DeleteServiceype");
const { UpdateServiceType } = require("../controller/UpdateServiceType");
const { getTellerInfo } = require("../controller/GetTellerInfo");
const { getWindow } = require("../controller/GetWindows");
const { getServiceTypes } = require("../controller/GetServiceTypes");
const { getBranches } = require("../controller/GetBranches");
const { AdminSignUp } = require("../controller/AdminSignUp");
const { AdminLogin } = require("../controller/AdminLogin");
const { AdminLogout } = require("../controller/AdminLogout");
const { AdminUpdate } = require("../controller/AdminUpdate");
const { ChangePassword } = require("../controller/ChangePassword");
const { TellerPasswordChange } = require("../controller/TellerPasswordChange");
const { TellerLogout } = require("../controller/TellerLogout");
const { UserServices } = require("../services/generateNumber");
const { setCookieMiddleware } = require("../Middleware/setCookieMiddleware");
const { SharePhone } = require("../ControllerForTg/SharePhone");
const { ShareBranch } = require("../ControllerForTg/ShareBranch");
const { ShareServiceType } = require("../ControllerForTg/ShareServiceType");
const { NoOfPendingForAdmin } = require("../controller/NoOfPendingForAdmin");
const { NoOfServedForAdmin } = require("../controller/NoOfServedForAdmin");
const { IsSuperAdmin } = require("../controller/IsSuperAdmin");
const { GetAdmins } = require("../controller/GetAdmins");
const { NumberOfAdmins } = require("../controller/NumberOfAdmins");
const { NumberOfBranchs } = require("../controller/NumberOfBranchs");
const { NumberOfServiceTypes } = require("../controller/NumberOfServiceTypes");
const { TellerCountByBranch } = require("../controller/TellerCountByBranch");
const { DeleteAdmin } = require("../controller/DeleteAdmin");

router.post("/generate-ticket", GenerateTicket);

router.get("/prior-queue/:TellerId", NextCustomer);

router.get("/NoOfPendingForAdmin/:EmployeeId", NoOfPendingForAdmin);

router.get("/NoOfServedForAdmin/:EmployeeId", NoOfServedForAdmin);

router.get("/NumberOfPendingCustomer/:TellerId", NumberOfPendingCustomer);

router.get("/NumberOfServedCustomer/:TellerId", NumberOfServedCustomer);

router.post("/voice", voice);

router.get("/getStatus/:BranchName", getStatus);

router.post("/StatusUpdate", StatusUpdate);

router.post("/StartCounter", StartCounter);

router.post("/TellerRegistration", TellerRegistration);

router.post("/WindowRegistration", WindowRegistration);

router.post("/getTellerTransInfo", getTellerTransInfo);

router.post("/TellerUpdate", TellerUpdate);

router.post("/DeleteTeller", DeleteTeller);

router.post("/DeleteWindow", DeleteWindow);

router.post("/AddBranch", AddBranch);

router.post("/DeleteBranch", DeleteBranch);

router.post("/UpdateBranch", UpdateBranch);

router.post("/AddServiceType", AddServiceType);

router.post("/DeleteServiceType", DeleteServiceType);

router.post("/UpdateServiceType", UpdateServiceType);

router.get("/getTellerInfo/:EmployeeId", getTellerInfo);

router.get("/getWindow", getWindow);

router.get("/getServiceTypes", getServiceTypes);

router.get("/getBranches", getBranches);

router.post("/AdminSignUp", AdminSignUp);

router.post("/AdminLogin", setCookieMiddleware, AdminLogin);

router.get("/AdminLogout/:EmployeeId", AdminLogout);

router.post("/AdminUpdate", AdminUpdate);

router.post("/ChangePassword", ChangePassword);

router.post("/TellerPasswordChange", TellerPasswordChange);

router.get("/TellerLogout/:TellerId", TellerLogout);

router.post("/SharePhone", SharePhone);

router.post("/ShareBranch", ShareBranch);

router.post("/ShareServiceType", ShareServiceType);

router.post("/IsSuperAdmin", IsSuperAdmin);

router.get("/GetAdmins", GetAdmins);

router.get("/NumberOfAdmins", NumberOfAdmins);

router.get("/NumberOfBranchs", NumberOfBranchs);

router.get("/NumberOfServiceTypes", NumberOfServiceTypes);

router.get("/TellerCountByBranch/:BranchName", TellerCountByBranch);

router.post("/DeleteAdmin", DeleteAdmin);

router.get("/current-ticket", async (req, res) => {
  try {
    const currentTicket = await Queue.findOne().sort({ createdAt: 1 });

    console.log("currentTicket", currentTicket);
    res.status(200).json(currentTicket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// const setCookieMiddleware = (req, res, next) => {
//   const { TellerId, WindowNumber, password } = req.body;
//   UserServices.setAllCookieValues(res, TellerId, WindowNumber, 1);
//   next();
// };

router.post("/login", setCookieMiddleware, login);
module.exports = router;
