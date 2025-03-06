import Box from "@mui/joy/Box";
import { useEffect } from "react";
import { Sheet } from "@mui/joy";
import LayoutPage from "./LayoutPage";
import { useMyAllchatQuery } from "../../redux/api";
import ChatsPane from "../ChatsPane";
import { useGlobalVar } from "../../context/ContextUse";
import toast from "react-hot-toast";

function MessageLayout(WrappedComponent) {
  const WithLayout = (props) => {
    const { ws } = useGlobalVar();
    const { data, isError, isLoading, refetch } = useMyAllchatQuery("");
    useEffect(() => {
      if (!ws) return;
      const handleMessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "notification_status") {
          if (data.payload.status === "accept") {
            refetch();
          }
          const message = `${data.payload.fullname} ${data.payload.status} your request`;
          const icon = `${data.payload.status === "accept" ? "👍" : "👎"}`;
          toast(message, {
            icon: icon,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      };
      ws.addEventListener("message", handleMessage);
      return () => {
        ws.removeEventListener("message", handleMessage);
      };
    }, [ws, refetch]);

    return (
      <Box component="main" className="MainContent" sx={{ flex: 1 }}>
        <Sheet
          sx={{
            flex: 1,
            width: "100%",
            mx: "auto",
            pt: { xs: "var(--Header-height)", md: 0 },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "minmax(min-content, min(30%, 400px)) 1fr",
            },
          }}
        >
          <Sheet
            sx={{
              position: { xs: "fixed", sm: "sticky" },
              transform: {
                xs: "translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))",
                sm: "none",
              },
              transition: "transform 0.4s, width 0.4s",
              zIndex: 100,
              width: { xs: "45%", sm: "100%" },
              top: 52,
              height: { xs: "calc(100dvh - var(--Header-height))", sm: "100%" },
            }}
          >
            <ChatsPane
              chats={data?.matchedChats}
              isLoading={isLoading}
              isError={isError}
            />
          </Sheet>
          <WrappedComponent {...props} />
        </Sheet>
      </Box>
    );
  };

  WithLayout.displayName = `MessagePage(${getDisplayName(WrappedComponent)})`;
  return WithLayout;
}
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

const MessageLayouts = (WrappedComponent) =>
  LayoutPage(MessageLayout(WrappedComponent));

export default MessageLayouts;
// const MessageLayouts = LayoutPage(MessageLayout);
// export default MessageLayouts;
