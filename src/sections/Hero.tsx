import { useState } from "react";
import { Box } from "@mui/material";
import HeyzineFlipbookWithOverlay from "../components/HeyzineFlipbookWithOverlay";
import backgroundVideo from "../assets/videoplayback (4).mp4";

export default function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        color: "#fff",
      }}
    >
      {/* 🎬 Nền video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* 🌈 Lớp phủ gradient */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(174,48,52,0.75) 0%, rgba(22,6,6,0.6) 70%)",
          zIndex: 1,
        }}
      />

      {/* 📖 Flipbook + Overlay */}
      <HeyzineFlipbookWithOverlay />
    </Box>
  );
}
