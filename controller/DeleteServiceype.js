const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
const BranchListSchema = require("../models/BranchListSchema");
const ServiceTypeSchema = require("../models/ServiceTypeSchema");
//Registration
const DeleteServiceType = async (req, res, next) => {
  try {
    const { ServiceCode } = req.body;
    console.log(ServiceCode);
    const result = await ServiceTypeSchema.deleteOne({
      ServiceCode: ServiceCode,
    });
    if (result.acknowledged === true) {
      res
        .status(200)
        .send({ status: true, message: "ServiceType Deleted Successfully" });
    } else {
      res
        .status(404)
        .send({ status: false, message: "Unable To Delete ServiceType" });
    }
  } catch (err) {
    console.log("---> err -->", err);
    next(err);
  }
};

module.exports = {
  DeleteServiceType,
};
