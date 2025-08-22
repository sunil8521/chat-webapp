import { createContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setOnlineUser } from "../redux/reducer/online_user";
export const Global_var = createContext();

export const Global_var_provider = ({ children }) => {
  const dispatch = useDispatch();
  const [ws, setWs] = useState(null);
  const [peer, setPeer] = useState(null);

  const { user } = useSelector((state) => state.AUTH);
  const iceQueue = useRef([]);

  useEffect(() => {
    if (!user._id) return;
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.ondatachannel = (event) => {
      const receiveChannel = event.channel;
      // let offset = 0;
      // receiveChannel.binaryType = "arraybuffer";

      receiveChannel.onmessage = (event) => {
        console.log("Message received from sender:", event.data);
        // You can now update your UI or state with event.data
      };

      receiveChannel.onclose = () =>
        console.log("Data channel closed on receiver");

      receiveChannel.onopen = () => {
        if (receiveChannel) {
          const readyState = receiveChannel.readyState;
          console.log(`Receive channel state is: ${readyState}`);
        }
      };

      receiveChannel.onclose = () => {
        console.log("Receive channel closed");
      };
    };
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
        console.log("i recive file details");
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
        // if (peerConnection.signalingState !== "stable") {
        // } else {
        //   console.warn(
        //     "Peer is already in stable state, skipping setRemoteDescription for answer."
        //   );
        // }
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
      }
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
