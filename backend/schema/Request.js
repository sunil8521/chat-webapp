import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "pending",
      enum: ["reject", "pending", "accept"],
    },
    fromuserid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: [true,"Provide sender Id." ],
    },
    touserid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: [true,"Provide recever Id."],
    },
  },
  {
    timestamps: true,
  }
);

const requestModel =mongoose.model("request", requestSchema);

export default requestModel