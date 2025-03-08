const Queue = require("../models/Queue");
const say = require("say");
const TellerCred = require("../models/TellerCred");
const Transaction = require("../models/Transaction");
const BranchListSchema = require("../models/BranchListSchema");

const NextCustomer = async (req, res, next) => {
  try {
    const TellerId = req.params.TellerId;
    const userBranch = await TellerCred.findOne({ TellerId: TellerId });
    //const BranchId = req.params.BranchId;
    //const userBranch = await BranchListSchema.findOne({ BranchId: BranchId });
    //console.log(userBranch.BranchName);
    const BranchNameString = userBranch.BranchName;
    //console.log(BranchNameString.toString());

    console.log("TellerId: ", TellerId);
    const user = await TellerCred.findOne({ TellerId: TellerId });
    if (user) {
      console.log(userBranch.BranchName);
      console.log("userInfo :", user);
      const Status = "pending";
      const variableValue = user.WindowNumber;
      console.log("winNo.: ", variableValue);
      const priorQueue = await Queue.findOneAndUpdate(
        { Status: Status, BranchName: BranchNameString },
        { Status: "InProgress" }
      ).sort({
        createdAt: 1,
      });
      console.log(priorQueue);
      const tikForVoice = priorQueue.ticketNumber;
      const UniqueForUpdate = priorQueue.UniqueId;
      const info = await Queue.findOne({ ticketNumber: tikForVoice });
      const NewUpdate = await Queue.findOneAndUpdate(
        { BranchName: BranchNameString, ticketNumber: tikForVoice },
        { WindowNumber: variableValue }
      );
      const PhoneNumber = info.PhoneNumber;
      const BranchName = info.BranchName;
      const serviceType = info.serviceType;
      const UniqueId = info.UniqueId;

      console.log("info...", info.PhoneNumber);

      const textFinal = `Ticket Number ${tikForVoice} go to window ${variableValue}`;
      console.log("here .....", textFinal);

      const newTransaction = new Transaction({
        PhoneNumber,
        BranchName,
        serviceType,
        TellerId: TellerId,
        UniqueId: UniqueId,
      });
      await newTransaction.save();
      res.status(200).send({
        status: true,
        ticketNumber: tikForVoice,
        WindowNumber: variableValue,
        UniqueId: UniqueForUpdate,
      });
    } else {
      res
        .status(404)
        .send({ status: false, message: "TellerId doesn't Exist" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

function speakWithInterval(text, voice, rate, repetitions, interval) {
  let count = 0;

  function speak() {
    if (count < repetitions) {
      say.speak(text, voice, rate, (err) => {
        if (err) {
          console.error("Error speaking:", err);
        } else {
          console.log("Text spoken:", text);
        }

        count++;
        if (count < repetitions) {
          setTimeout(speak, interval);
        }
      });
    }
  }

  //speak();
}

module.exports = {
  NextCustomer,
};
