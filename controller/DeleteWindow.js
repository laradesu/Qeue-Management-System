const axios = require("axios");
const UserCred = require("../models/TellerCred");
const bcrypt = require("bcrypt");
const WinNoSchema = require("../models/WinNoSchema");

const DeleteWindow = async (req, res, next) => {
  try {
    const { WindowNumber } = req.body;
    console.log(WindowNumber);
    const result = await WinNoSchema.deleteOne({ WindowNumber: WindowNumber });
    console.log(result.acknowledged);
    if (result.acknowledged === true) {
      res
        .status(200)
        .send({ status: true, message: "Window Deleted Successfully" });
    } else {
      res
        .status(404)
        .send({ status: false, message: "Unable To Delete Window" });
    }
  } catch (err) {
    console.log("---> err -->", err);
    next(err);
  }
};

module.exports = {
  DeleteWindow,
};
