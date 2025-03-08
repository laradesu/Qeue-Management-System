const Queue = require("../models/Queue");
const axios = require("axios");
const UserServices = require("../services/generateNumber");
const BranchListSchema = require("../models/BranchListSchema");

const GenerateTicket = async (req, res, next) => {
  try {
    const { PhoneNumber, BranchName, serviceType } = req.body;
    console.log("requests: ", req.body);
    const response =
      await UserServices.UserServices.generateSequentialTwoDigitNumber();
    console.log(response);
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const timeDiff = currentDate - startOfYear;
    const numberOfDays = Math.floor(timeDiff / millisecondsPerDay) + 1;
    console.log("Number of days from the beginning of the year:", numberOfDays);

    const year = currentDate.getFullYear().toString();
    const lastTwoDigits = year.substring(year.length - 2);

    function generate(n) {
      var add = 1,
        max = 1 + add;
      if (n < max) {
        return generate(max) + generate(max + 1);
      }
      max = Math.pow(10, n + add);
      var min = max / 10;
      var number = Math.floor(Math.random() * (max - min + 1)) + min;
      return (" Q-" + lastTwoDigits + numberOfDays + response).substring(add);
    }
    const UniqueId = generate(10);
    console.log(req.body);
    const lastTicket = await Queue.findOne({ BranchName })
      .sort("-ticketNumber")
      .exec();
    const newTicket = new Queue({
      ticketNumber: lastTicket ? lastTicket.ticketNumber + 1 : 1,
      PhoneNumber,
      UniqueId: UniqueId,
    });
    await newTicket.save();

    await Queue.findOneAndUpdate(
      { UniqueId: UniqueId },
      { BranchName: BranchName, serviceType: serviceType }
    );
    const ticketNumberfromDB = await newTicket.ticketNumber;
    const resultt = await Queue.findOne({ UniqueId: UniqueId });
    console.log("response:  : ", resultt);
    await res.status(200).json({ status: true, message: resultt });

    const result = await axios.post(process.env.sendSMS, {
      phoneNumber: PhoneNumber,
      message: `BranchName(ቅርንጫፍ): ${BranchName}  TicketNumber(ትኬት ቁጥር) ፡ ${ticketNumberfromDB} `,
    });

    let timerID = setTimeout(async () => {
      const priorQueue = await Queue.findOneAndUpdate(
        { Status: "pending" },
        { Status: "Expired" }
      );
      console.log(priorQueue);
    }, 86400000); //oneday expiry time
  } catch (err) {
    console.error("err--->", err);
  }
};

module.exports = {
  GenerateTicket,
};
