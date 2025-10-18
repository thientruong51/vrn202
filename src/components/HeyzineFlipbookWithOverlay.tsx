import { useState, useRef, useEffect } from "react";
import { Box, IconButton, Typography, Card } from "@mui/material";
import { Volume2, VolumeX, Eye, EyeOff } from "lucide-react";
import { pageData } from "../data/pageData";

export default function HeyzineFlipbookWithDualOverlay() {
  const [spread, setSpread] = useState(1);
  const [playingPage, setPlayingPage] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true); // ✅ trạng thái bật/tắt overlay
  const [autoControlled, setAutoControlled] = useState(true); // ✅ phân biệt bật tự động hay do người dùng

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const bookId = "1cb3bae27e";
  const totalPages = 25;
  const leftPage = spread === 1 ? 1 : spread * 2 - 2;
  const rightPage = spread === 1 ? null : leftPage + 1;
  const flipbookUrl = `https://heyzine.com/flip-book/${bookId}.html#page/${leftPage}`;

  const getPageData = (pageNum: number) => pageData.find((p) => p.page === pageNum);

  // --- Voice toggle ---
  const handleVoiceToggle = (pageNum: number) => {
    const data = getPageData(pageNum);
    if (!data?.voiceSrc) return;

    if (playingPage === pageNum && audioRef.current) {
      audioRef.current.pause();
      setPlayingPage(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(data.voiceSrc);
    audioRef.current = audio;
    setPlayingPage(pageNum);
    audio.play();
    audio.onended = () => setPlayingPage(null);
  };

  // --- Stop voice khi lật trang ---
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingPage(null);
    }
  }, [spread]);

  // --- Điều khiển auto overlay ---
  useEffect(() => {
    if (!isLoaded) return;

    // chỉ chạy auto khi chưa bị user can thiệp
    if (!autoControlled) return;

    // Bật overlay sau 3 giây
    const showTimer = setTimeout(() => setShowOverlay(true), 3000);

    // Ẩn overlay sau 13 giây tổng (3 + 10)
    const hideTimer = setTimeout(() => setShowOverlay(false), 13000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isLoaded, autoControlled]);

  const prevSpread = () => setSpread((p) => Math.max(1, p - 1));
  const nextSpread = () => setSpread((p) => Math.min(Math.ceil(totalPages / 2), p + 1));

  // --- Toggle overlay bằng tay ---
  const toggleOverlayManual = () => {
    setShowOverlay((v) => !v);
    setAutoControlled(false); // user đã can thiệp, tắt chế độ auto
  };

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {/* --- IFRAME HEYZINE --- */}
      <iframe
        src={flipbookUrl}
        allowFullScreen
        allow="clipboard-write"
        scrolling="no"
        onLoad={() => setTimeout(() => setIsLoaded(true), 600)} // delay nhẹ cho mượt
        style={{
          border: "none",
          width: "90%",
          height: "90%",
          position: "absolute",
          top: 80,
          left: 95,
          zIndex: 1,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* --- Loading overlay --- */}
      {!isLoaded && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 600,
            fontSize: "1.2rem",
            bgcolor: "rgba(0,0,0,0.5)",
            zIndex: 2,
          }}
        >
          Đang tải flipbook...
        </Box>
      )}

      {/* --- Nút điều khiển trang --- */}
      {isLoaded && (
        <Box
          sx={{
            position: "absolute",
            bottom: 32,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 3,
            zIndex: 4,
          }}
        >
          <IconButton
            onClick={prevSpread}
            sx={{
              bgcolor: "rgba(255,255,255,0.8)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
              width: 52,
              height: 52,
              borderRadius: "50%",
              fontSize: "2rem",
            }}
          >
            ‹
          </IconButton>
          <IconButton
            onClick={nextSpread}
            sx={{
              bgcolor: "rgba(255,255,255,0.8)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
              width: 52,
              height: 52,
              borderRadius: "50%",
              fontSize: "2rem",
            }}
          >
            ›
          </IconButton>
        </Box>
      )}

      {/* --- Nút toggle overlay --- */}
      {isLoaded && (
        <IconButton
          onClick={toggleOverlayManual}
          sx={{
            position: "absolute",
            top: 64,
            right: 32,
            zIndex: 5,
            bgcolor: "rgba(255,255,255,0.15)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
            width: 46,
            height: 46,
          }}
        >
          {showOverlay ? <EyeOff /> : <Eye />}
        </IconButton>
      )}

      {/* --- Overlay trái/phải --- */}
      {isLoaded && showOverlay && (
        <>
          {leftPage && (
            <OverlayCard
              side="left"
              page={leftPage}
              data={getPageData(leftPage)}
              isPlaying={playingPage === leftPage}
              onVoiceToggle={handleVoiceToggle}
            />
          )}
          {rightPage && (
            <OverlayCard
              side="right"
              page={rightPage}
              data={getPageData(rightPage)}
              isPlaying={playingPage === rightPage}
              onVoiceToggle={handleVoiceToggle}
            />
          )}
        </>
      )}
    </Box>
  );
}

/* --- Overlay component --- */
function OverlayCard({
  side,
  page,
  data,
  isPlaying,
  onVoiceToggle,
}: {
  side: "left" | "right";
  page: number;
  data?: { title: string; text: string };
  isPlaying: boolean;
  onVoiceToggle: (pageNum: number) => void;
}) {
  if (!data) return null;

  return (
    <Card
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        ...(side === "left" ? { left: 0 } : { right: 0 }),
        width: 360,
        height: 720,
        background: "linear-gradient(180deg, #292929 0%, #991a1a 100%)",
        color: "#fff",
        borderRadius: "22px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
        backdropFilter: "blur(10px)",
        p: 3,
        zIndex: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Tiêu đề */}
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{
          fontSize: "1.05rem",
          lineHeight: 1.4,
          textTransform: "uppercase",
          letterSpacing: 0.6,
          mb: 2,
          color: "#e84d4d",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          pb: 1,
        }}
      >
        {data.title}
      </Typography>

      {/* Nội dung */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          pr: 1.2,
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.25)",
            borderRadius: 3,
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.94rem",
            lineHeight: 1.75,
            textAlign: "justify",
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "0.015em",
            whiteSpace: "pre-line",
          }}
        >
          {data.text || "Nội dung đang cập nhật..."}
        </Typography>
      </Box>

      {/* Icon voice */}
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          ...(side === "left" ? { left: 20 } : { right: 20 }),
        }}
      >
        <IconButton
          onClick={() => onVoiceToggle(page)}
          sx={{
            bgcolor: "rgba(255,255,255,0.25)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(255,255,255,0.35)" },
            width: 44,
            height: 44,
            transition: "0.25s",
          }}
        >
          {isPlaying ? <Volume2 /> : <VolumeX />}
        </IconButton>
      </Box>
    </Card>
  );
}
