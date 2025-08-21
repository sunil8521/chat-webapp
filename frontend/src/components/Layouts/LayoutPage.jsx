import Box from "@mui/joy/Box";
import Header from "../Header";
import Sidebar from "../Sidebar";

function LayoutPage(WrappedComponent) {
  const WithLayout = (props) => {
    return (
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <Header />

        <WrappedComponent {...props} />
      </Box>
    );
  };

  WithLayout.displayName = `MainPage(${getDisplayName(WrappedComponent)})`;
  return WithLayout;
}
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default LayoutPage;
