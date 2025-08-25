import React, { useState } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
export default function ChatBubble(props) {
  const { content, variant, createdAt, senderid, isMessage,isAttachment } = props;
  const isSent = variant === "sent";
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleString("en-US", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // const attachment=false
  // Function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  return (
    <Box sx={{ maxWidth: "60%", minWidth: "auto" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "space-between", mb: 0.25 }}
      >
        <Typography
          level="body-xs"
          sx={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
        >
          {isSent ? "You" : senderid.fullname}
        </Typography>
        <Typography level="body-xs">{formattedDate}</Typography>
      </Stack>

      {isAttachment && (
        <>
          <Sheet
            variant="outlined"
            sx={[
              {
                px: 1.75,
                py: 1.25,
                borderRadius: "lg",
              },
              isSent ? { borderTopRightRadius: 0 } : { borderTopLeftRadius: 0 },
            ]}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <IconButton
                color="primary"
                variant="soft"
                size="lg"
                sx={{ borderRadius: "50%" }}
                component="a"
                href={props.attachment.fileUrl}
                download={props.attachment.fileName}
              >
                <CloudDownloadIcon />
              </IconButton>
              <div>
                <Typography
                  sx={{
                    fontSize: "sm",
                    wordBreak: "break-all", 
                    overflowWrap: "anywhere",
                  }}
                >
                  {props.attachment.fileName}
                </Typography>
                <Typography level="body-sm">{formatFileSize(props.attachment.fileSize)}</Typography>
              </div>
            </Stack>
          </Sheet>

          <Typography
            level="body-xs"
            sx={{
              mt: 0.5,
              fontStyle: "italic",
              color: "text.secondary",
            }}
          >
            Temporary file. Download if you want to keep it.
          </Typography>
        </>
      )}

      {isMessage && (
        <Box sx={{ position: "relative" }}>
          <Sheet
            color={isSent ? "primary" : "neutral"}
            variant={isSent ? "solid" : "soft"}
            sx={[
              {
                p: 1.25,
                borderRadius: "lg",
              },
              isSent
                ? {
                    borderTopRightRadius: 0,
                  }
                : {
                    borderTopLeftRadius: 0,
                  },
              isSent
                ? {
                    backgroundColor: "var(--joy-palette-primary-solidBg)",
                  }
                : {
                    backgroundColor: "background.body",
                  },
            ]}
          >
            <Typography
              level="body-sm"
              sx={[
                {
                  wordBreak: "break-all",
                  overflowWrap: "anywhere",
                },
                isSent
                  ? {
                      color: "var(--joy-palette-common-white)",
                    }
                  : {
                      color: "var(--joy-palette-text-primary)",
                    },
              ]}
            >
              {content}
            </Typography>
          </Sheet>
        </Box>
      )}
    </Box>
  );
}
