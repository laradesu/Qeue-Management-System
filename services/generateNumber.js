const AdminCredsSchema = require("../models/AdminCredsSchema");
const TellerCred = require("../models/TellerCred");
const UniqueNumber = require("../models/UniqueNumber");

//let counter = 1;
class UserServices {
  static async generateSequentialTwoDigitNumber() {
    try {
      const count = await UniqueNumber.find();
      let CountFromDB = count[0].UniqueId;

      const latestCount = CountFromDB + 1;

      console.log(latestCount);

      const priorQueue = await UniqueNumber.findOneAndUpdate({
        UniqueId: latestCount,
      });
      return latestCount;
    } catch (err) {
      console.log(err);
    }
  }

  static async findAdminByCustomUserId(EmployeeId) {
    try {
      const existingAdmin = await AdminCredsSchema.findOne({
        EmployeeId: EmployeeId,
      });
      return existingAdmin;
    } catch (ex) {
      throw ex;
    }
  }

  static async findAdminByCustomTellerId(TellerId) {
    try {
      const existingAdmin = await TellerCred.findOne({
        TellerId: TellerId,
      });
      return existingAdmin;
    } catch (ex) {
      throw ex;
    }
  }

  static async setAllCookieValues(res, TellerId, WindowNumber, days) {
    await this.setCookie(res, "TellerId", TellerId, days);
    await this.setCookie(res, "WindowNumber", WindowNumber, days);
    //console.log("TellerId: ", TellerId, "WindowNo.: ", WindowNumber);
  }
  //res.setHeader("Set-Cookie", `myCookie=${cookieValue}; Path=/; HttpOnly`);

  static async setCookie(res, name, value, days) {
    //console.log("TellerIdd: ", value);
    //10 * 365 * === 315360000000, or 10 years in milliseconds
    const numberOfSecond = 24 * 60 * 60 * 1000;
    const expiryDate = new Date(Number(Date.now() + numberOfSecond));
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    res.cookie(name, value, {
      expires: new Date(Date.now() + 24 * 3600000),
      path: "/",
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
  }
}
module.exports = {
  UserServices,
};
