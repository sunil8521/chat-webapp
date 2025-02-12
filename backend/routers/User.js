import {signIn,signUp,getMe,sendRequest,handleRequest,findFriends,findMyMessages,logout,getMembers,searchUser,myfrinendRequest} from "../functions/User.js"
import { Router } from "express"
import { protector } from "../helpers/Protector.js"
import chatModel from "../schema/Chat.js"

const userRoutes=Router()
userRoutes.post("/signin",signIn)
userRoutes.post("/signup",signUp)
userRoutes.get("/logout",logout)

userRoutes.use(protector)
userRoutes.get("/me",getMe)

userRoutes.post("/sendrequest",sendRequest)
userRoutes.post("/handlerequest",handleRequest)
userRoutes.get("/requests",myfrinendRequest)

userRoutes.get("/friends",findFriends)

userRoutes.get("/messages/:chatId",findMyMessages)
userRoutes.get("/members/:chatId",getMembers)
userRoutes.get("/users",searchUser)



// userRoutes.post("/c",async(req,res)=>{
//     const {id,id1}=req.body

//     await chatModel.create({participants:[id,id1]})
//     res.send("done")
// })

export default userRoutes