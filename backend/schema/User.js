import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { getProfileImage } from "../helpers/DefaultProfileImage.js";

const userSchema = new mongoose.Schema(
  {
    avtar: {
      type: String,
      default: () => getProfileImage(),
    },
    bio:{
        type:String,
    },
    coudinaryPublicid: { type: String },
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 5);
  next();
});

userSchema.methods.Checkpassword = async function (password, hashpassword) {
  return await bcrypt.compare(password, hashpassword);
};
const userModel = mongoose.model("user", userSchema);

export default userModel;
