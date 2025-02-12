import { WebSocketServer } from "ws";
import userModel from "./schema/User.js";
import messageModel from "./schema/Message.js";
import chatModel from "./schema/Chat.js";
const users = new Map();
const broadcastOnlineUsers = () => {
  const onlineUsers = Array.from(users.keys());
  users.forEach((ws) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(
        JSON.stringify({
          type: "online_users",
          users: onlineUsers,
        })
      );
    }
  });
};
const websocketServer = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", async function connection(ws, req) {
    const userId = req.headers["sec-websocket-protocol"];

    // users.set(userId, ws);

    try {
      const user = await userModel.findById(userId);
      if (!user) {
        ws.close(1008, "Invalid user");
        return;
      }
      users.set(userId, ws);
      broadcastOnlineUsers();
    } catch (error) {
      ws.close(1011, "Internal server error");
      return;
    }

    ws.on("message", async function incoming(message) {
      const { message: data } = JSON.parse(message);
      if (data.type === "friendrequest") {
        const socketUser=users.get(data.payload.id)
       if(socketUser){
        socketUser.send(JSON.stringify({
          type:"notification",
          id:data.payload.id,
          avtar:data.payload.avtar,
          fullname:data.payload.fullname
        }))
       }
       
      }
      if (data.type === "message") {
        const { chatid, senderid, content, members } = data.payload;

        const memberSocket = members
          .map((id) => users.get(id))
          .filter((ws) => ws !== undefined);

        memberSocket.forEach((ws) => {
          ws.send(
            JSON.stringify({
              type: "last_message",
              chatid: chatid,
              content: content,
              updatedAt: Date.now(),
            })
          );
        }); // this will send last message

        memberSocket.forEach((ws) => {
          ws.send(
            JSON.stringify({
              type: "new_message",
              payload: {
                senderid,
                chatid: chatid,
                content: content,
                createdAt: Date.now(),
              },
            })
          );
        }); // this helps to send message

        // try{
        //   const newMessage=await messageModel.create({
        //     chatid:chatid,
        //     senderid:senderid._id,
        //     content:content
        //   });
        //   await chatModel.findByIdAndUpdate(chatid,{
        //     lastmessage:newMessage._id
        //   },{new:true})
        // }catch(dbError){
        //   console.error("Database error:", dbError);
        //   ws.send(JSON.stringify({
        //     type: "error",
        //    message: `Failed to save message, Server error`
        //   }));
        // }
      }
    });

    ws.on("close", () => {
      users.delete(userId);
      broadcastOnlineUsers();
    });
  });

  console.log("WebSocket server is running...");
};

export default websocketServer;
