const setCookieMiddleware = (req, res, next) => {
  const { TellerId, WindowNumber, EmployeeId } = req.body;
  const days = 1; // Adjust the number of days as needed

  setAllCookieValues(res, TellerId, WindowNumber, EmployeeId, days)
    .then(() => {
      next();
    })
    .catch((error) => {
      // Handle any errors that occur during cookie setting
      console.error("Error setting cookies:", error);
      next(error);
    });
};

async function setAllCookieValues(
  res,
  TellerId,
  WindowNumber,
  EmployeeId,
  days
) {
  await setCookie(res, "TellerId", TellerId, days);
  await setCookie(res, "WindowNumber", WindowNumber, days);
  await setCookie(res, "EmployeeId", EmployeeId, days);
}

async function setCookie(res, name, value, days) {
  const numberOfSecond = 24 * 60 * 60 * 1000;
  const expiryDate = new Date(Date.now() + numberOfSecond);
  res.cookie(name, value, {
    expires: expiryDate,
    path: "/",
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });
}

module.exports = { setCookieMiddleware };
