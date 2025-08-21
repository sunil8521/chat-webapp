import jwt from "jsonwebtoken";
import "dotenv/config";
export const cookieOption = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "Strict",
  // sameSite: "None",
  // secure: true,
};
export const tokenProvider = (code, res, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWTSECRET);
  res.cookie("token", token, cookieOption).status(code).json({
    success: true,
    token: token,
  });
};
