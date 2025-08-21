import userModel from "../schema/User.js";
import { errorHandler,CustomError } from "../error/error.js";
import "dotenv/config"
import jwt from "jsonwebtoken"
export const protector = errorHandler(async (req, res, next) => {
    let token;
    // if (req.cookies.token||"") {
      token = req.cookies.token;
    // }else if(req.headers.token){
        // token = req.headers.token

    // }
  
    if (!token) {
      return next(
        new CustomError(
          `You are not logged in! Please login to get access..`,
          401
        )
      );
    }
    const decode =jwt.verify(token, process.env.JWTSECRET);
    const user = await userModel.findById(decode.id)
    if (!user) {
      return next(new CustomError("This user no longer exist", 401));
    }
    req.user = user;
    next();
  });