import { keyframes } from "@emotion/react"
import { Box, CircularProgress, Typography } from "@mui/joy"

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.5;
  }
`

const fadeInOut = keyframes`
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
`

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100dvh",
        gap: 3,
        background: (theme) => (theme.palette.mode === "dark" ? "neutral.900" : "neutral.100"),
      }}
    >
      {/* Main loader circle */}
      <Box
        sx={{
          position: "relative",
          animation: `${pulseAnimation} 2s ease-in-out infinite`,
        }}
      >
        <CircularProgress
          size="lg"
          variant="soft"
          thickness={3}
          sx={{
            "--CircularProgress-size": "64px",
            "--CircularProgress-trackThickness": "3px",
            "--CircularProgress-progressThickness": "3px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: (theme) =>
              theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)",
            backdropFilter: "blur(4px)",
          }}
        />
      </Box>

      {/* Loading text */}
      <Typography
        level="body-sm"
        sx={{
          animation: `${fadeInOut} 1.5s ease-in-out infinite`,
          color: "neutral.500",
        }}
      >
        Loading...
      </Typography>

      {/* Small dots */}
   
    </Box>
  )
}

