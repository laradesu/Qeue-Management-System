const Queue = require("../models/Queue");
const axios = require("axios");
const UserServices = require("../services/generateNumber");
const ServiceTypeSchema = require("../models/ServiceTypeSchema");

const ShareServiceType = async (req, res, next) => {
  try {
    let body = [];
    const { user_id, serviceCode } = req.body;
    // const MultiplePriorQueue = await ServiceTypeSchema.find().sort({
    //   _id: 1,
    // });

    // for (let i = 0; i < MultiplePriorQueue.length; i++) {
    //   body = [...body, MultiplePriorQueue[i]];
    // }
    // for (var i = 0; i < body.length; i++) {
    //   let MyAccs = body.map((b) => ({
    //     ServiceCode: b.ServiceCode,
    //     serviceType: b.serviceType,
    //   }));
    //   console.log(MyAccs[i].ServiceCode);
    if (serviceCode === "1") {
      let serviceType = "Deposit";
      const result = await SendServiceTypeRequest(user_id, serviceType);
      console.log("phone ", result);
      //const phone = Queue.findOne({ user_id: user_id });
      const PhoneNumber = result.PhoneNumber;
      const BranchName = result.BranchName;
      const ticketNumberfromDB = result.ticketNumber;
      await res.status(200).json({
        status: true,
        message:
          "Entry Complete, You will recieve SMS, containing your Queue Number",
        value: {
          PhoneNumber: PhoneNumber,
          serviceType: serviceType,
          ticketNumber: ticketNumberfromDB,
        },
      });
      //console.log("hereeee..1", respoo);
      //find phoneNumber for message service and build a json Output
      const sms = await axios.post(process.env.sendSMS, {
        phoneNumber: PhoneNumber,
        message: `Dear ABa Customer, Here Are Your Queue Info. BranchName: ${BranchName}, ServiceType: ${serviceType}, TicketNumber: ${ticketNumberfromDB} Thank you for banking with us.`,
      });
    } else if (serviceCode === "2") {
      let serviceType = "Withdrawal";
      const result = await SendServiceTypeRequest(user_id, serviceType);
      console.log("phone ", result);
      //const phone = Queue.findOne({ user_id: user_id });
      const PhoneNumber = result.PhoneNumber;
      const BranchName = result.BranchName;
      const ticketNumberfromDB = result.ticketNumber;
      await res.status(200).json({
        status: true,
        message:
          "Entry Complete, You will recieve SMS, containing your Queue Number",
        value: {
          PhoneNumber: PhoneNumber,
          serviceType: serviceType,
          ticketNumber: ticketNumberfromDB,
        },
      });
      //console.log("hereeee..1", respoo);
      //find phoneNumber for message service and build a json Output
      const sms = await axios.post(process.env.sendSMS, {
        phoneNumber: PhoneNumber,
        message: `Dear ABa Customer, Here Are Your Queue Info. BranchName: ${BranchName}, ServiceType: ${serviceType}, TicketNumber: ${ticketNumberfromDB} Thank you for banking with us.`,
      });
    } else if (serviceCode === "3") {
      let serviceType = "Open Account";
      const result = await SendServiceTypeRequest(user_id, serviceType);
      console.log("phone ", result);
      //const phone = Queue.findOne({ user_id: user_id });
      const PhoneNumber = result.PhoneNumber;
      const BranchName = result.BranchName;
      const ticketNumberfromDB = result.ticketNumber;
      await res.status(200).json({
        status: true,
        message:
          "Entry Complete, You will recieve SMS, containing your Queue Number",
        value: {
          PhoneNumber: PhoneNumber,
          serviceType: serviceType,
          ticketNumber: ticketNumberfromDB,
        },
      });
      //console.log("hereeee..1", respoo);
      //find phoneNumber for message service and build a json Output
      const sms = await axios.post(process.env.sendSMS, {
        phoneNumber: PhoneNumber,
        message: `Dear ABa Customer, Here Are Your Queue Info. BranchName: ${BranchName}, ServiceType: ${serviceType}, TicketNumber: ${ticketNumberfromDB} Thank you for banking with us.`,
      });
      console.log("here...", result);
    } else {
      res.status(404).send({
        status: false,
        message: "There is No ServiceType With The Code You Provided",
      });
    }
    //}
  } catch (err) {
    console.error("err--->", err);
  }
};

const SendServiceTypeRequest = async (user_id, serviceType) => {
  try {
    console.log("requests: ", user_id, serviceType);
    const status = "pending";
    const phone = await Queue.findOneAndUpdate(
      { user_id: user_id, TGComplete: false },
      { serviceType: serviceType, TGComplete: true }
    );

    return phone;
  } catch (err) {}
};

module.exports = {
  ShareServiceType,
};
