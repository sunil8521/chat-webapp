import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import { IconButton, Stack } from "@mui/joy";

import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import StrikethroughSRoundedIcon from "@mui/icons-material/StrikethroughSRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useForm } from "react-hook-form";
import { useGlobalVar } from "../context/ContextUse";
export default function MessageInput({ payload }) {
  const { ws } = useGlobalVar();
  const { handleSubmit, register, reset, getValues, setValue } = useForm();


  const onSubmit = (data) => {
    const message = {
      type: "message",
      
      payload:{...payload,content:data.message.trim()}
    };
   

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ message }));
      console.log("Message sent to server:", message);
    }
    reset();
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
                  <IconButton size="sm" variant="plain" color="neutral">
                    <FormatBoldRoundedIcon />
                  </IconButton>
                  <IconButton size="sm" variant="plain" color="neutral">
                    <FormatItalicRoundedIcon />
                  </IconButton>
                  <IconButton size="sm" variant="plain" color="neutral">
                    <StrikethroughSRoundedIcon />
                  </IconButton>
                  <IconButton size="sm" variant="plain" color="neutral">
                    <FormatListBulletedRoundedIcon />
                  </IconButton>
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
