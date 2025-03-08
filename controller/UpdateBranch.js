const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
const BranchListSchema = require("../models/BranchListSchema");
//Registration
const UpdateBranch = async (req, res, next) => {
  try {
    const { BranchId, BranchName } = req.body;

    await BranchListSchema.updateMany(
      { BranchId: BranchId },
      {
        BranchId,
        BranchName,
      }
    );
    res
      .status(200)
      .send({ status: true, message: "Branch Name Updated Successfully" });
  } catch (err) {
    console.log("---> err -->", err);
    next(err);
  }
};

module.exports = {
  UpdateBranch,
};
