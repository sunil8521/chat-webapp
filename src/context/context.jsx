import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
export const Global_var = createContext();

export const Global_var_provider = ({ children }) => {
  const [ws, setWs] = useState(null);
  const { user,loading } = useSelector((state) => state.AUTH);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8080", [user._id]);
    socket.onopen = () => {
      console.log("WebSocket connection established");
    };
    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
    };
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
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
  }, []);

  return <Global_var.Provider value={{ ws }}>{children}</Global_var.Provider>;
};

Global_var_provider.propTypes = {
  children: PropTypes.node.isRequired,
};
