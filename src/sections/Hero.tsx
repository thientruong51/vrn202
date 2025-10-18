import { useEffect, useState, useRef } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import backgroundVideo from "../assets/videoplayback (4).mp4";

export default function Hero() {
  const [loading, setLoading] = useState(true);
  const [flipbookUrl, setFlipbookUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // ✅ Thông tin mô tả cho từng trang (tuỳ bạn cập nhật)
  const pageTexts: Record<number, string> = {
    1: "Trang 1 — Khởi đầu lịch sử: Bản tuyên ngôn độc lập 1945.",
    2: "Trang 2 — Hình ảnh Chủ tịch Hồ Chí Minh đọc Tuyên ngôn tại Quảng trường Ba Đình.",
    3: "Trang 3 — Những dòng chữ mở đầu bất hủ của Bản Tuyên ngôn.",
    4: "Trang 4 — Tư tưởng về độc lập dân tộc gắn liền với chủ nghĩa xã hội.",
    5: "Trang 5 — Hình ảnh toàn dân hân hoan đón chào độc lập.",
    6: "Trang 6 — Khát vọng hòa bình và thống nhất toàn vẹn lãnh thổ.",
  };

  // ✅ Gọi proxy API trên Vercel (tránh CORS)
  useEffect(() => {
    async function fetchFlipbook() {
      try {
        const res = await fetch(`/api/heyzine-proxy?id=1cb3bae27e`);
        const data = await res.json();
        if (data?.url) {
          setFlipbookUrl(data.url);
        } else {
          console.error("Không lấy được URL từ Heyzine:", data);
        }
      } catch (err) {
        console.error("❌ Lỗi khi gọi API proxy:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFlipbook();
  }, []);

  // ✅ Theo dõi sự kiện từ iframe (nếu Heyzine hỗ trợ postMessage)
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.origin.includes("heyzine.com") && event.data?.page) {
        setCurrentPage(event.data.page);
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        color: "#fff",
      }}
    >
      {/* Video nền */}
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

      {/* Lớp overlay mờ đỏ */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(174,48,52,0.75) 0%, rgba(22,6,6,0.6) 80%)",
          zIndex: 1,
        }}
      />

      {/* Flipbook */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        {loading ? (
          <CircularProgress sx={{ color: "#fff" }} />
        ) : flipbookUrl ? (
          <iframe
            ref={iframeRef}
            src={flipbookUrl}
            allow="fullscreen; clipboard-write"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        ) : (
          <Typography>Không tải được Flipbook.</Typography>
        )}
      </Box>

      {/* Text chú thích trang */}
      <Box
        sx={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
          px: 3,
          py: 1.5,
          borderRadius: "12px",
          maxWidth: "90%",
          zIndex: 3,
        }}
      >
        <Typography
          sx={{
            color: "#eeb72b",
            fontWeight: 600,
            fontSize: { xs: 14, md: 18 },
          }}
        >
          {pageTexts[currentPage] || "Đang xem flipbook..."}
        </Typography>
      </Box>
    </Box>
  );
}
