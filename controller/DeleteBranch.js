const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
const BranchListSchema = require("../models/BranchListSchema");
//Registration
const DeleteBranch = async (req, res, next) => {
  try {
    const { BranchId } = req.body;
    const result = await BranchListSchema.deleteOne({ BranchId: BranchId });
    console.log(BranchId);
    if (result.acknowledged === true) {
      res
        .status(200)
        .send({ status: true, message: "Branch Deleted Successfully" });
    } else {
      res
        .status(404)
        .send({ status: false, message: "Unable To Delete Branch" });
    }
  } catch (err) {
    console.log("---> err -->", err);
    next(err);
  }
};

module.exports = {
  DeleteBranch,
};
