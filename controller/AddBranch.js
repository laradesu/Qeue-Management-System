const BranchListSchema = require("../models/BranchListSchema");
//AddBranch
const AddBranch = async (req, res, next) => {
  try {
    const { BranchId, BranchName } = req.body;
    const createUser = await new BranchListSchema({
      BranchId,
      BranchName,
    });
    const result = await createUser.save();
    console.log(result);
    res
      .status(200)
      .send({ status: true, message: "Branch Addded Successfully" });
  } catch (err) {
    console.log("---> err -->", err._message);
    res.status(500).send({ status: false, message: "Internal server error" });
    next(err);
  }
};

module.exports = {
  AddBranch,
};
