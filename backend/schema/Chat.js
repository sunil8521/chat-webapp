import mongoose from "mongoose";


const chatSchema=new mongoose.Schema({

    participants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModel",
          }
    ],
     lastmessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"messageModel"
     }
},{
    timestamps:true
})

const chatModel=mongoose.model("chat",chatSchema)

export default chatModel