import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import { IconButton, Stack, Typography, Sheet } from "@mui/joy";
import ReactMarkdown from "react-markdown";
import ReactQuill from "react-quill";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import StrikethroughSRoundedIcon from "@mui/icons-material/StrikethroughSRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useForm } from "react-hook-form";
import { useGlobalVar } from "../context/ContextUse";
import toast from "react-hot-toast";
import { useState, useRef, useReducer } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function MessageInput({ payload }) {
  const { online_users } = useSelector((state) => state.ONLINEUSER);
  console.log(online_users);
  const { ws, peer } = useGlobalVar();
  const { handleSubmit, register, reset, getValues, setValue } = useForm();
  const fileInputRef = useRef(null);
  const currentFile = useRef(null);
  const [fileName, setFileName] = useState(null);
  const dataChannel = useRef(null);
  // to know user is online or not
  const sender = payload.members?.find((id) => id !== payload.senderid._id);
  const is_sender_online = online_users?.includes(sender);

  const onSubmit = (data) => {
    if (data.message.trim() == "" && fileName === null) return;
    console.log("data");

    if (fileName) {
if (dataChannel.readyState === "open") {
  dataChannel.send("Hello! This is a simple text message.");
} else {
  console.warn("Data channel is not open yet");
}    }
    if (!(data.message.trim() == "")) {
      const message = {
        type: "message",
        payload: { ...payload, content: data.message.trim() },
      };

      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ message }));
      } else {
        toast.error("Server error, can not send message");
      }
      reset();
    }
  };

  const handleFileChange = async (e) => {
    if (!is_sender_online) {
      toast.error("User is offline, can't send file");
      return;
    }

    setFileName(e.target.files[0].name);
    currentFile.current = e.target.files[0];

    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = {
        type: "file-details",
        payload: {
          details: {
            name: currentFile.current.name,
            size: currentFile.current.size,
            type: currentFile.current.type,
            lastModified: currentFile.current.lastModified,
          },
          from: payload.senderid._id,
          to: sender,
        },
      };
      ws.send(
        JSON.stringify({
          message,
        })
      );
      if (dataChannel.current && dataChannel.current.readyState !== "closed") {
        console.warn("File transfer already in progress");
        return;
      }

      dataChannel.current = peer.createDataChannel("fileTransfer");
      dataChannel.current.binaryType = "arraybuffer";
      dataChannel.current.onopen = () => {
        console.log("Data channel opened");
      };

      dataChannel.current.onclose = () => {
        console.log("Data channel closed");
      };

      peer.onicecandidate = (event) => {
        if (event.candidate) {
          const message = {
            type: "ice-candidate",
            payload: {
              webRtcData: event.candidate,
              from: payload.senderid._id,
              to: sender,
            },
          };
          ws.send(
            JSON.stringify({
              message,
            })
          );
        }
      };
      try {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(new RTCSessionDescription(offer));

        const message = {
          type: "offer",
          payload: {
            webRtcData: offer,
            from: payload.senderid._id,
            to: sender,
          },
        };
        ws.send(JSON.stringify({ message }));
        console.log("Sending offer to" + sender);
      } catch (er) {
        console.log("Failed to create session description: ", er);
        toast.error("Failed to send file");
      }
    } else {
      toast.error("Server error, can not send message");
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset input
    }
  };
  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Textarea
            placeholder="Type something here…"
            aria-label="Message"
            minRows={3}
            maxRows={10}
            {...register("message", {})}
            endDecorator={
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexGrow: 1,
                  py: 1,
                  pr: 1,
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {!fileName ? (
                    <IconButton
                      variant="outlined"
                      color="neutral"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <AttachFileIcon />
                    </IconButton>
                  ) : (
                    <Sheet
                      variant="outlined"
                      color="neutral"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        px: 1,
                        py: 0.5,
                        borderRadius: "md",
                        gap: 0.5,
                      }}
                    >
                      <Typography level="body2">{`${fileName.slice(
                        0,
                        6
                      )}...${fileName.slice(-8)}`}</Typography>
                      <IconButton
                        size="sm"
                        variant="plain"
                        color="danger"
                        onClick={handleRemoveFile}
                      >
                        <CloseRoundedIcon />
                      </IconButton>
                    </Sheet>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  color="primary"
                  sx={{ alignSelf: "center", borderRadius: "sm" }}
                  endDecorator={<SendRoundedIcon />}
                >
                  Send
                </Button>
              </Stack>
            }
            sx={{
              "& textarea:first-of-type": {
                minHeight: 72,
              },
            }}
          />
        </FormControl>
      </form>
    </Box>
  );
}
MessageInput.propTypes = {
  payload: PropTypes.shape({
    chatid: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.string),
    senderid: PropTypes.shape({
      _id: PropTypes.string,
      username: PropTypes.string,
      fullname: PropTypes.string,
      email: PropTypes.string,
      avtar: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      __v: PropTypes.number,
    }),
  }),
};
