import { createContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setOnlineUser } from "../redux/reducer/online_user";
import { addRealTimeMessage } from "../redux/reducer/realTimeMessagesSlice";
export const Global_var = createContext();

export const Global_var_provider = ({ children }) => {
  const dispatch = useDispatch();
  const [ws, setWs] = useState(null);
  const [peer, setPeer] = useState(null);
  const { user } = useSelector((state) => state.AUTH);
  // Rtc things
  const iceQueue = useRef([]);
  const reciveSizeRef = useRef(0);
  const reciveArry = useRef([]);
  const fileDetails = useRef({});

  // run from here
  useEffect(() => {
    if (!user._id) return;
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });



    let socket = new WebSocket(import.meta.env.VITE_WSURL, [user._id]);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.type == "error") {
        toast.error(`${data.message}`);
      } else if (data.type == "online_users") {
        dispatch(setOnlineUser(data.users));
      } else if (data.type == "file-details") {
        fileDetails.current = data.payload.details;
      } else if (data.type == "offer") {
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            const message = {
              type: "ice-candidate",
              payload: {
                webRtcData: event.candidate,
                from: data.payload.to,
                to: data.payload.from,
              },
            };
            socket.send(
              JSON.stringify({
                message,
              })
            );
          }
        };

        await peerConnection.setRemoteDescription(data.payload.webRtcData);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        iceQueue.current.forEach(async (candidate) => {
          await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        });
        iceQueue.current = []; // clear queue

        // console.log("Sending answer to" + data.payload.from);
        const message = {
          type: "answer",
          payload: {
            webRtcData: answer,
            from: data.payload.to,
            to: data.payload.from,
          },
        };
        socket.send(JSON.stringify({ message }));
      } else if (data.type === "answer") {
        // console.log("answer");
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.payload.webRtcData)
        );
        iceQueue.current.forEach(async (candidate) => {
          await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        });
        iceQueue.current = [];
      } else if (data.type === "ice-candidate") {
        // console.log("ice-candidate");
        if (peerConnection.remoteDescription) {
          await peerConnection.addIceCandidate(data.payload.webRtcData);
        } else {
          iceQueue.current.push(data.payload.webRtcData);
        }
      } else if (data.type === "new_message") {
        dispatch(
          addRealTimeMessage({
            chatId: data.payload.chatid,
            message: data.payload,
          })
        );
      }
    };



        peerConnection.ondatachannel = (event) => {
      const receiveChannel = event.channel;
      let offset = 0;
      let progressPercentage = 0;
      receiveChannel.binaryType = "arraybuffer";

      let downloadLink;
      receiveChannel.onmessage = async (event) => {
        if (typeof event.data === "string") {
          const { message:data } = JSON.parse(event.data);
          const message={
            type:"data_message",
            payload:{...data.payload,attachment:{
              fileName:fileDetails.current.name,
              fileSize:fileDetails.current.size,
              fileType:fileDetails.current.type,
              lastModified:fileDetails.current.lastModified,
              fileUrl:downloadLink
            }}
          }
          setTimeout(() => {
            socket.send(JSON.stringify({ message }));
          }, 1500);
          return;
        }

        let buf;
        if (event.data instanceof ArrayBuffer) {
          buf = event.data;
        } else if (event.data && typeof event.data.arrayBuffer === "function") {
          buf = await event.data.arrayBuffer();
        } else {
          buf = event.data;
        }

        reciveSizeRef.current = reciveSizeRef.current + buf.byteLength;
        offset += buf.byteLength;

        // show progress bar
        progressPercentage = Math.floor(
          (offset / fileDetails.current.size) * 100
        );
        toast.loading(`File receiving: ${progressPercentage}%`, {
          id: `file-progress-${fileDetails.current.name}`,
          duration: Infinity,
        });

        if (progressPercentage === 100) {
          toast.dismiss(`file-progress-${fileDetails.current.name}`);
        }

        // console.log("reciveSizeRef", reciveSizeRef.current);

        reciveArry.current.push(buf);

        if (reciveSizeRef.current == fileDetails.current.size) {
          const received = new Blob(reciveArry.current);
           downloadLink = URL.createObjectURL(received);

          // console.log("File received:", downloadLink);

          toast.success(`File received: ${fileDetails.current.name}`, {
            duration: 4000,
          });
          reciveSizeRef.current = 0;
          reciveArry.current = [];
          progressPercentage = 0;
        }
      };

      receiveChannel.onclose = () => {
        console.log("Data channel closed on receiver");

        reciveSizeRef.current = 0;
        reciveArry.current = [];
        progressPercentage = 0;
        toast.dismiss(`file-progress-${fileDetails.current.name}`);
      };

      receiveChannel.onopen = () => {
        if (receiveChannel) {
          const readyState = receiveChannel.readyState;
          console.log(`Receive channel state is: ${readyState}`);
        }
      };
    };

    socket.onerror = (error) => {
      toast.error("Server error: Failed to connet socket");
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };






    setWs(socket);
    setPeer(peerConnection);

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
      peerConnection.close();
    };
  }, [user, dispatch]);

  return (
    <Global_var.Provider value={{ ws, peer }}>{children}</Global_var.Provider>
  );
};

Global_var_provider.propTypes = {
  children: PropTypes.node.isRequired,
};
