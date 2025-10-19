import { useEffect, useRef, useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  CircularProgress,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

/* Cho phép dùng <spline-viewer> trong TSX */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        url?: string;
        "loading-anim-type"?: string;
        class?: string;
      };
    }
  }
}

type ChatMsg = { from: "user" | "ai"; text: string };

export default function GeminiChat3D() {
  const [ready, setReady] = useState(false);
  const injected = useRef(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      from: "ai",
      text:
        "Xin chào👋! \n Tôi là AF1 – trợ lý học tập giúp bạn ôn phần \n 'Chương 1: Đảng Cộng sản Việt Nam ra đời và lãnh đạo đấu tranh giành chính quyền (1930–1945)'.\n Hãy đặt câu hỏi để cùng học nhé!",
    },
  ]);
  const chatRef = useRef<HTMLDivElement | null>(null);

  // Load script Spline
  useEffect(() => {
    if (injected.current) return;
    const existing = document.querySelector('script[data-spline="viewer"]');
    if (existing) {
      setReady(true);
      injected.current = true;
      return;
    }
    const s = document.createElement("script");
    s.type = "module";
    s.src =
      "https://unpkg.com/@splinetool/viewer@1.9.86/build/spline-viewer.js";
    s.dataset.spline = "viewer";
    s.onload = () => setReady(true);
    document.head.appendChild(s);
    injected.current = true;
  }, []);

  // --- GỬI CHAT QUA FETCH ---
  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text }]);
    setLoading(true);

    try {
      const prompt = `
Bạn là trợ lý học tập môn "Lịch sử Đảng Cộng sản Việt Nam" – có nhiệm vụ hỗ trợ sinh viên ôn tập, 
giải thích và đối thoại về giai đoạn Đảng ra đời và lãnh đạo đấu tranh giành chính quyền (1930–1945).

🎯 PHẠM VI KIẾN THỨC CHO PHÉP:
"Chương 1: Đảng Cộng sản Việt Nam ra đời và lãnh đạo đấu tranh giành chính quyền (1930 - 1945)
II. Đảng lãnh đạo đấu tranh giành chính quyền (1930 - 1945)
3. Phong trào giải phóng dân tộc 1939 - 1945 (phần 1)
3. Phong trào giải phóng dân tộc 1939 - 1945 (phần 2)
4. Tính chất, ý nghĩa và kinh nghiệm của Cách mạng Tháng Tám năm 1945
Đọc trước giáo trình Lịch sử Đảng Cộng sản Việt Nam từ trang 1 đến trang 125"

📘 NGUYÊN TẮC TRẢ LỜI:
- Trả lời ngắn gọn, chính xác, dễ hiểu, bám sát phạm vi nội dung ở trên.
- Có thể **nêu dẫn chứng lịch sử cụ thể** như: phong trào, địa danh, nhân vật, nghị quyết, hội nghị, 
hoặc các sự kiện tiêu biểu (ví dụ: Cao trào kháng Nhật cứu nước, Hội nghị Trung ương 8 – 1941, 
Mặt trận Việt Minh, Võ Nguyên Giáp, Nguyễn Ái Quốc, Bắc Sơn, Nam Kỳ, v.v...).
- Tuyệt đối **không đề cập đến thời kỳ sau 1945**, các vấn đề chính trị hiện nay, hoặc giai đoạn Đổi Mới 1986.
- Nếu người học hỏi ngoài phạm vi Chương 1, hãy trả lời:
  👉 "⚠️ Nội dung này nằm ngoài phạm vi Chương 1 của giáo trình Lịch sử Đảng Cộng sản Việt Nam."

Câu hỏi của sinh viên: ${text}
`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ Không có phản hồi từ Gemini.";
      setMessages((prev) => [...prev, { from: "ai", text: reply }]);
    } catch (error) {
      console.error("❌ Lỗi gọi Gemini API:", error);
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "⚠️ Lỗi kết nối đến Gemini API." },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        chatRef.current?.scrollTo({
          top: chatRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        bgcolor: "black",
      }}
    >
      {/* NỀN 3D – vẫn tương tác được */}
      {ready && (
        <Box
          component="spline-viewer"
          {...({ "loading-anim-type": "none" } as any)}
          url="https://prod.spline.design/nPQzWw-fod7rsfDx/scene.splinecode"
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "auto",
          }}
        />
      )}

   

      {/* Chatbox */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 2,
          pb: 3,
          pointerEvents: "none",
        }}
      >
        <Box sx={{ pointerEvents: "auto", textAlign: "center", mb: 1.5 }}>
          <Typography
            variant="h5"
            sx={{
              color: "#ec1717ff",
              fontWeight: 700,
              textShadow: "0 0 10px rgba(255,255,255,0.3)",
            }}
          >
            💬 Chat học tập cùng AF1
          </Typography>
        </Box>

        {/* Lịch sử chat */}
        <Box
          ref={chatRef}
          sx={{
            width: "min(900px, 92vw)",
            height: "60vh",
            overflowY: "auto",
            p: 2,
            borderRadius: 3,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            mb: 2,
            pointerEvents: "auto",
          }}
        >
          {messages.map((msg, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent:
                  msg.from === "user" ? "flex-end" : "flex-start",
                mb: 1.5,
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 3,
                  background:
                    msg.from === "user"
                      ? "linear-gradient(135deg,#C1172C,#E95E42)"
                      : "rgba(255,255,255,0.15)",
                  color: "#fff",
                  maxWidth: "75%",
                  fontSize: 15,
                  boxShadow: "0 3px 12px rgba(0,0,0,0.4)",
                  whiteSpace: "pre-line",
                }}
              >
                {msg.text}
              </Box>
            </Box>
          ))}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            </Box>
          )}
        </Box>

        {/* Ô nhập chat */}
        <Box
          sx={{
            width: "min(900px, 92vw)",
            display: "flex",
            alignItems: "center",
            gap: 1,
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 999,
            px: 1.2,
            py: 0.6,
            backdropFilter: "blur(8px)",
            pointerEvents: "auto",
          }}
        >
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Nhập câu hỏi về Chương 1 (1939–1945)"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                color: "#fff",
                px: 1.5,
                fontSize: 15,
                width: "100%",
              },
            }}
            sx={{ flex: 1 }}
          />
          <Tooltip title="Gửi câu hỏi">
            <IconButton
              onClick={handleSend}
              sx={{
                color: "#fff",
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
            >
              <SendRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
