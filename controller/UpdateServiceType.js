const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
const BranchListSchema = require("../models/BranchListSchema");
const ServiceTypeSchema = require("../models/ServiceTypeSchema");
//Registration
const UpdateServiceType = async (req, res, next) => {
  try {
    const { ServiceCode, ServiceType } = req.body;

    await ServiceTypeSchema.updateMany(
      { ServiceCode: ServiceCode },
      {
        ServiceCode,
        ServiceType,
      }
    );
    res.send({ status: true, message: "ServiceType Updated Successfully" });
  } catch (err) {
    console.log("---> err -->", err);
    next(err);
  }
};

module.exports = {
  UpdateServiceType,
};
