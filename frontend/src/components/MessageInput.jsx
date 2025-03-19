import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import { IconButton, Stack, Typography } from "@mui/joy";
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
import { useState, useRef } from "react";


export default function MessageInput({ payload }) {
  const { ws,peer } = useGlobalVar();
  const { handleSubmit, register, reset, getValues, setValue } = useForm();
  const fileInputRef = useRef(null);

  const onSubmit = (data) => {
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
  };
const handleFileChange = (e) => {

console.log(e.target.files[0]);
}

  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Textarea
            placeholder="Type something here…"
            aria-label="Message"
            minRows={3}
            maxRows={10}
            {...register("message", { required: true })}
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
                <div>
                  <Dropdown>
                    <MenuButton size="sm" variant="plain" color="neutral">
                      <AttachFileIcon />
                    </MenuButton>
                    <Menu>
                      <MenuItem
                        onClick={() => {
                          fileInputRef.current?.click();
                        }}
                      >
                        Image
                     
                      </MenuItem>
                      <MenuItem>My account</MenuItem>
                      <MenuItem>Logout</MenuItem>
                    </Menu>
                  </Dropdown>
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
