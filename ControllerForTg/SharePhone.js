const Queue = require("../models/Queue");
const axios = require("axios");
const UserServices = require("../services/generateNumber");

const SharePhone = async (req, res, next) => {
  try {
    const { user_id, PhoneNumber } = req.body;
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
      return (" Que-" + lastTwoDigits + numberOfDays + response).substring(add);
    }
    const UniqueId = generate(10);
    const lastTicket = await Queue.findOne().sort({ ticketNumber: -1 });

    const newTicket = new Queue({
      user_id: user_id,
      ticketNumber: lastTicket ? lastTicket.ticketNumber + 1 : 1,
      PhoneNumber,
      UniqueId: UniqueId,
    });
    await newTicket.save();

    //const ticketNumberfromDB = await newTicket.ticketNumber;
    await res
      .status(200)
      .json({
        status: true,
        message: "PhoneNumber Shared Successfully, Now Enter Branch Name",
      });
  } catch (err) {
    console.error("err--->", err);
  }
};

module.exports = {
  SharePhone,
};
