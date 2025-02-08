import Box from "@mui/joy/Box";
import { Sheet } from "@mui/joy";
import LayoutPage from "./LayoutPage";
import { useMyAllchatQuery } from "../../redux/api";
import ChatsPane from "../ChatsPane";

function MessageLayout(WrappedComponent) {
  const WithLayout = (props) => {
    const { data, isError, isLoading, error, refetch } = useMyAllchatQuery("");
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
