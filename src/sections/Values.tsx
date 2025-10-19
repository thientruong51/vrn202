import { Box } from "@mui/material";

export default function Values() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <iframe
        src="https://padlet.com/embed/78c9fhxv1qgtcr8v"
        allow="camera;microphone;geolocation;display-capture;clipboard-write"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
        title="Padlet VRN202"
      />
    </Box>
  );
}
