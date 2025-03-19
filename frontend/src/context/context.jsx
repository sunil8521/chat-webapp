import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setOnlineUser } from "../redux/reducer/online_user";
export const Global_var = createContext();

export const Global_var_provider = ({ children }) => {

  const dispatch = useDispatch();
  const [ws, setWs] = useState(null);
  const { user } = useSelector((state) => state.AUTH);

  const peer = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  const dataChannel = peer.createDataChannel("fileTransfer");

  dataChannel.onopen = () => {
    console.log("WebRTC Data Channel Open");
  };

  dataChannel.onclose = () => {
    console.log("WebRTC Data Channel Closed");
  };
  dataChannel.onerror = (error) => {
    console.error("WebRTC Data Channel Error:", error);
  };
  useEffect(() => {
    if (!user._id) return;

    let socket = new WebSocket(import.meta.env.VITE_WSURL, [user._id]);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type == "error") {
        toast.error(`${data.message}`);
      } else if (data.type == "online_users") {
        dispatch(setOnlineUser(data.users));
      }
    };

    socket.onerror = (error) => {
      toast.error("Server error: Failed to connet socket");
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setWs(socket);
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [user, dispatch]);

  return (
    <Global_var.Provider value={{ ws, peer }}>{children}</Global_var.Provider>
  );
};

Global_var_provider.propTypes = {
  children: PropTypes.node.isRequired,
};
