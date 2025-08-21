import mongoose, { mongo } from "mongoose";


const messageSchema=new mongoose.Schema({
    chatid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chatModel",
        required:true
    },
    senderid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true,
      
    },
    content:{
        type:String,
    },
 
},{
    timestamps:true
})

const messageModel=mongoose.model("message",messageSchema)

export default messageModel