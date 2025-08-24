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
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
export default function ChatBubble(props) {
  const { content, variant, createdAt, senderid, isMessage } = props;
  const isSent = variant === "sent";
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleString("en-US", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // const attachment=false
  const attachment = {
    fileName: "hul.pdf",
    fileSize: "15mb",
  };
  const isAttachment = true;
  return (
    <Box sx={{ maxWidth: "60%", minWidth: "auto" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "space-between", mb: 0.25 }}
      >
        <Typography level="body-xs">
          {isSent ? "You" : senderid.fullname}
        </Typography>
        <Typography level="body-xs">{formattedDate}</Typography>
      </Stack>

      {isAttachment === true && (
        <Sheet
          variant="outlined"
          sx={[
            {
              px: 1.75,
              py: 1.25,
              borderRadius: "lg",
            },
            isSent
              ? { borderTopRightRadius: 0 }
              : { borderTopRightRadius: "lg" },
            isSent ? { borderTopLeftRadius: "lg" } : { borderTopLeftRadius: 0 },
          ]}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            {/* <Avatar color="primary" size="lg"> */}
              <a href="https://google.com" target="_blank" rel="noreferrer" >
              
                <CloudDownloadIcon />
              </a>
            {/* </Avatar> */}
            <div>
              <Typography sx={{ fontSize: "sm" }}>
                {attachment.fileName}
              </Typography>
              <Typography level="body-sm">{attachment.fileSize}</Typography>
            </div>
          </Stack>
        </Sheet>
      )}

      {isMessage === true && (
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
                    borderTopRightRadius: "lg",
                  },
              isSent
                ? {
                    borderTopLeftRadius: "lg",
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
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
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
