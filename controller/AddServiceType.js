const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
const WinNoAndServiceType = require("../models/WinNoSchema");
const BranchListSchema = require("../models/BranchListSchema");
const ServiceTypeSchema = require("../models/ServiceTypeSchema");
//Registration
const AddServiceType = async (req, res, next) => {
  try {
    const { ServiceType } = req.body;
    const ServiceCodelast = await ServiceTypeSchema.findOne().sort({
      ServiceCode: -1,
    });

    const createUser = await new ServiceTypeSchema({
      ServiceCode: ServiceCodelast ? ServiceCodelast.ServiceCode + 1 : 1,
      ServiceType,
    });
    createUser.save();
    res.send({ status: true, message: "ServiceType Added Successfully" });
  } catch (err) {
    console.log("---> err -->", err._message);
    res.status(500).send({ status: false, message: "Internal server error" });
    next(err);
  }
};

module.exports = {
  AddServiceType,
};
