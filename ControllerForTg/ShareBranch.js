const Queue = require("../models/Queue");
const axios = require("axios");
const UserServices = require("../services/generateNumber");
const BranchListSchema = require("../models/BranchListSchema");

const ShareBranch = async (req, res, next) => {
  try {
    const { user_id, BranchId } = req.body;
    const branchfromdb = await BranchListSchema.find();
    console.log(branchfromdb);
    for (var i = 0; i < branchfromdb.length; i++) {
      var resultBody = branchfromdb.map((b) => ({
        BranchId: b.BranchId,
        BranchName: b.BranchName,
      }));
      const sliceBranchID = resultBody[i].BranchId.slice(-3);
      console.log(sliceBranchID);
      if (BranchId === sliceBranchID) {
        let BranchName = resultBody[i].BranchName;
        console.log("requests: ", req.body);
        const status = "pending";
        const lastTicket = await Queue.findOneAndUpdate(
          {
            user_id: user_id,
            TGComplete: false,
          },
          {
            BranchName: BranchName,
          }
        );
        console.log(lastTicket);

        await res.status(200).send({
          status: true,
          message: "Branch Entry Successful,Now Enter Your ServiceType",
        });
      }
    }
    await res.status(404).send({
      status: false,
      message: "BranchId Doesn't Exist. Enter a Valid BranchId please:",
    });
  } catch (err) {
    console.error("err--->", err);
  }
};

module.exports = {
  ShareBranch,
};
