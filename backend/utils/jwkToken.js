export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateAuthToken();
  const cookieName = user.type === "Admin" ? "adminToken" : "patientToken";
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: message,
      user,
      token: token,
      cookieName: cookieName,
    });
};
