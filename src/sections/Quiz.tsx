// src/sections/Quiz.tsx
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import InfoIcon from "@mui/icons-material/Info";
import bgImg from "../assets/sosanhbg.png";
type QA = {
  q: string;
  opts: string[];
  a: number; // index of correct option
  explanation: string;
};

const questions: QA[] = [
  {
    q: "Điểm khác biệt cơ bản nhất khiến Cách mạng Tháng Tám trở thành “tất yếu lịch sử” chứ không phải “ăn may” là:",
    opts: [
      "Đảng Cộng sản đã chủ động chuẩn bị lực lượng chính trị – vũ trang và thời cơ từ trước khi tình thế thay đổi",
      "Mặt trận Việt Minh đã lợi dụng khéo léo biến động quốc tế để giành chính quyền trước các phe phái khác",
      "Nhân dân cả nước tự phát hưởng ứng khởi nghĩa khi thấy kẻ thù suy yếu và chính quyền tê liệt",
      "Sự đầu hàng của Nhật tạo khoảng trống quyền lực để nhân dân vùng dậy giành chính quyền nhanh chóng"
    ],
    a: 0,
    explanation: "Thắng lợi không do may mắn mà nhờ Đảng chủ động chuẩn bị toàn diện cả chính trị, tổ chức và vũ trang trước thời cơ lịch sử."
  },
  {
    q: "Hội nghị Trung ương VIII (5/1941) được xem là “mắt xích quyết định” trong tiến trình dẫn đến thắng lợi năm 1945 vì:",
    opts: [
      "Thông qua chương trình 10 điểm tập trung vào cải cách kinh tế và dân sinh trước mắt",
      "Quyết định phát động khởi nghĩa vũ trang ngay sau khi Nhật – Pháp xung đột tại Đông Dương",
      "Xác định mâu thuẫn chủ yếu là giữa giai cấp công nhân và địa chủ phong kiến phản động",
      "Lần đầu tiên đặt nhiệm vụ giải phóng dân tộc lên trên nhiệm vụ giai cấp và cách mạng ruộng đất"
    ],
    a: 3,
    explanation: "Hội nghị VIII xác định rõ mục tiêu hàng đầu là giải phóng dân tộc, tạo cơ sở lý luận và tổ chức cho Việt Minh ra đời."
  },
  {
    q: "Hai “cuộc tổng diễn tập” 1930–1931 và 1936–1939 có ý nghĩa sâu xa nhất đối với thắng lợi 1945 ở chỗ:",
    opts: [
      "Chứng minh khả năng đấu tranh hợp pháp trong điều kiện chính quyền thực dân lỏng lẻo",
      "Tạo dựng kinh nghiệm quân sự và cơ sở vật chất cho lực lượng vũ trang nhân dân",
      "Rèn luyện Đảng về lý luận, phương pháp lãnh đạo và gắn bó sâu rộng với quần chúng",
      "Chuẩn bị sẵn mạng lưới tổ chức hành chính để quản lý đất nước sau khi giành chính quyền"
    ],
    a: 2,
    explanation: "Hai phong trào là “tổng diễn tập” giúp Đảng rèn luyện bản lĩnh, lý luận và gắn bó chặt chẽ với nhân dân – nền tảng thắng lợi 1945."
  },
  {
    q: "Nói “Cách mạng Tháng Tám là kết quả của sự kết hợp giữa quy luật khách quan và sự chủ động chủ quan” là vì:",
    opts: [
      "Nhật đầu hàng Đồng minh và nhân dân Việt Nam đã nổi dậy tự phát khắp nơi",
      "Các nước xã hội chủ nghĩa hỗ trợ mạnh mẽ cho Việt Nam giành độc lập",
      "Thời cơ quốc tế thuận lợi và đường lối cách mạng trong nước được hoạch định chính xác",
      "Đảng biết vận dụng sự kiện quốc tế để tuyên truyền cho cách mạng trong nước"
    ],
    a: 2,
    explanation: "Thắng lợi phản ánh sự hòa quyện giữa thời cơ quốc tế thuận lợi và sự chuẩn bị chủ động, khoa học của Đảng trong nước."
  },
  {
    q: "Vì sao Hội nghị Trung ương VI (11/1939) được xem là bước ngoặt chiến lược của cách mạng Việt Nam?",
    opts: [
      "Phát động phong trào kháng Nhật cứu nước và thành lập mặt trận Việt Minh toàn quốc",
      "Mở đầu cho quá trình chuyển hướng từ đấu tranh bí mật sang hoạt động công khai",
      "Thay khẩu hiệu “chống đế quốc” bằng “chống địa chủ phong kiến” trong chiến lược cách mạng",
      "Đưa phong trào từ giai đoạn đấu tranh đòi dân sinh, dân chủ sang chuẩn bị khởi nghĩa vũ trang"
    ],
    a: 3,
    explanation: "Hội nghị VI chuyển hướng chiến lược toàn diện, đặt nhiệm vụ giải phóng dân tộc và chuẩn bị khởi nghĩa vũ trang làm trung tâm."
  },
  {
    q: "Bản chất “chủ động” trong thắng lợi Cách mạng Tháng Tám thể hiện rõ nhất ở:",
    opts: [
      "Việt Minh phát động phong trào quần chúng đòi cải cách kinh tế, xã hội trước khi chiến tranh kết thúc",
      "Đảng kiên trì xây dựng lực lượng, căn cứ địa và chủ trương khởi nghĩa ngay khi thời cơ xuất hiện",
      "Phong trào vũ trang miền Bắc và Nam Bộ diễn ra độc lập, không có sự chỉ đạo thống nhất",
      "Nhân dân tự phát nổi dậy, còn Đảng chỉ kịp thời hợp thức hóa chính quyền mới"
    ],
    a: 1,
    explanation: "Đảng chủ động chuẩn bị đầy đủ cả về tổ chức, lực lượng, căn cứ địa và quyết định đúng thời điểm nổ khởi nghĩa."
  },
  {
    q: "Câu nói của Hồ Chí Minh: “Thời cơ nghìn năm có một chỉ đến khi dân ta đã sẵn sàng giành lấy nó” phản ánh quan điểm nào?",
    opts: [
      "Mọi thắng lợi đều do may mắn và hoàn cảnh lịch sử thuận lợi quyết định",
      "Thời cơ cách mạng là yếu tố ngẫu nhiên, phụ thuộc biến động quốc tế",
      "Thời cơ chỉ có ý nghĩa khi lực lượng cách mạng đã được chuẩn bị kỹ lưỡng",
      "Đảng phải chờ đợi thời cơ quốc tế chín muồi mới có thể phát động khởi nghĩa"
    ],
    a: 2,
    explanation: "Hồ Chí Minh khẳng định: thời cơ chỉ có giá trị khi cách mạng đã được chuẩn bị toàn diện để chủ động nắm bắt và hành động."
  },
  {
    q: "Vai trò nổi bật của phong trào “Kháng Nhật cứu nước” (3–8/1945) là:",
    opts: [
      "Giải quyết triệt để nạn đói và khôi phục sản xuất trong vùng Nhật chiếm đóng",
      "Tạo khí thế cách mạng và mở rộng khu giải phóng – bàn đạp trực tiếp cho Tổng khởi nghĩa",
      "Lôi kéo các lực lượng thân Nhật vào mặt trận thống nhất chống thực dân Pháp",
      "Huy động nguồn viện trợ của Liên Xô và Trung Quốc cho lực lượng Việt Minh"
    ],
    a: 1,
    explanation: "Phong trào kháng Nhật cứu nước đã tạo nên cao trào cách mạng toàn quốc, củng cố khu giải phóng Việt Bắc – bàn đạp tổng khởi nghĩa."
  },
  {
    q: "Tuyên ngôn Độc lập (2/9/1945) không chỉ khai sinh một quốc gia mà còn mang ý nghĩa quốc tế sâu sắc vì:",
    opts: [
      "Đặt cách mạng Việt Nam trong dòng chảy chung của tư tưởng nhân quyền và tự do nhân loại",
      "Thể hiện sự ủng hộ đối với khối Đồng minh trong công cuộc tiêu diệt phát xít",
      "Khẳng định Việt Nam là thành viên đầu tiên của Liên Hiệp Quốc sau Thế chiến II",
      "Góp phần chấm dứt hoàn toàn chế độ phong kiến và quân chủ trên toàn Đông Dương"
    ],
    a: 0,
    explanation: "Tuyên ngôn Độc lập khẳng định giá trị phổ quát của quyền con người, đưa cách mạng Việt Nam hòa vào trào lưu tiến bộ nhân loại."
  },
  {
    q: "Từ bài học của Cách mạng Tháng Tám, bài học quan trọng nhất cho công cuộc xây dựng đất nước hiện nay là:",
    opts: [
      "Giữ vững sự lãnh đạo tuyệt đối của Đảng và phát huy sức mạnh toàn dân trong mọi thời điểm",
      "Tập trung phát triển kinh tế – kỹ thuật để tránh xung đột chính trị",
      "Luôn dựa vào sức mạnh quốc tế để đảm bảo nền độc lập dân tộc",
      "Xem thời cơ là yếu tố quyết định duy nhất của thành công trong mọi cuộc cách mạng"
    ],
    a: 0,
    explanation: "Bài học xuyên suốt là phải kiên định sự lãnh đạo của Đảng, phát huy sức mạnh nhân dân và chủ động nắm bắt thời cơ lịch sử."
  }
];




export default function Quiz() {
  const [idx, setIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const q = questions[idx];
  const progress = Math.round((idx / questions.length) * 100);

  const pick = (optIndex: number) => {
    setSelected(optIndex);

    if (optIndex === q.a) {
      setAnswers((prev) => {
        const copy = [...prev];
        copy[idx] = optIndex;
        return copy;
      });
      setScore((s) => (answers[idx] === null ? s + 1 : s));
      setShowExplanation(true);
    }
  };

  const next = () => {
    setSelected(null);
    setShowExplanation(false);
    if (idx + 1 >= questions.length) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
    }
  };

  const prev = () => {
    if (idx === 0) return;
    setIdx((i) => i - 1);
    setSelected(answers[idx - 1] ?? null);
    setShowExplanation(answers[idx - 1] !== null);
  };

  const retry = () => {
    setIdx(0);
    setScore(0);
    setSelected(null);
    setDone(false);
    setAnswers(Array(questions.length).fill(null));
    setShowExplanation(false);
  };

 return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
        px: { xs: 2, md: 8 },
        color: "#fff",
        position: "relative",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.6)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",

        backdropFilter: { md: "blur(0.5px)" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 78,
          left: 56,
          px: 2.2,
          py: 1.2,
          background: "#6464641a",
          borderLeft: `10px solid #bd0009ff`,
          borderRadius: 1,
          boxShadow: "0 12px 28px rgba(0, 0, 0, 0.4)",
          zIndex: 5,
          maxWidth: 950,
          mb:10
        }}
      >
        <Typography sx={{ fontWeight: 900, fontSize: 30, lineHeight: 1.1, color: "#eeb72b" }}>
          Mini Quiz
        </Typography>
       
      </Box>

      {!done ? (
        <Card sx={{ maxWidth: 1050, mx: "auto", bgcolor: "rgba(255,255,255,0.03)",mt:20,ml:50 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Box>
                <Typography variant="subtitle2" sx={{ color: "rgba(255, 217, 0, 0.9)" }}>
                  Câu {idx + 1} / {questions.length}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {q.q}
                </Typography>
              </Box>

              <Box sx={{ width: 150 }}>
                <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 2 }} />
                <Typography variant="caption" sx={{ color: "rgba(255, 217, 0, 0.9)", mt: 0.5 }}>
                  Tiến trình: {idx}/{questions.length}
                </Typography>
              </Box>
            </Stack>

            {/* danh sách đáp án */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
              {q.opts.map((opt, oi) => {
                const isSelected = selected === oi;
                const isCorrect = q.a === oi;

                const bg =
                  isSelected && !isCorrect
                    ? "rgba(244, 67, 54, 0.08)"
                    : isSelected && isCorrect
                    ? "rgba(76, 175, 80, 0.12)"
                    : "transparent";

                return (
                  <Button
                    key={opt}
                    onClick={() => pick(oi)}
                    sx={{
                      textTransform: "none",
                      justifyContent: "flex-start",
                      bgcolor: bg,
                      borderRadius: 2,
                      border: "1px solid rgba(238,183,43,0.12)",
                      color: "#fff",
                      p: 2,
                      "&:hover": { bgcolor: "rgba(238,183,43,0.06)" },
                    }}
                  >
                    <Box sx={{ mr: 2, minWidth: 28 }}>
                      {isSelected ? (
                        isCorrect ? <CheckCircleIcon sx={{ color: "#9be15d" }} /> : <CloseIcon sx={{ color: "#ff6b6b" }} />
                      ) : (
                        <Box sx={{ width: 24 }} />
                      )}
                    </Box>
                    <Typography variant="body1">{opt}</Typography>
                  </Button>
                );
              })}
            </Box>

            {/* giải thích và điều khiển */}
            <Box sx={{ display: "flex", gap: 2, mt: 3, alignItems: "center" }}>
              {showExplanation ? (
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: "#9be15d", mb: 1 }}>
                    <CheckCircleIcon sx={{ color: "#9be15d", mr: 1 }} /> Chính xác!
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
                    <InfoIcon sx={{ fontSize: 16, verticalAlign: "middle", mr: 0.5 }} />
                    {q.explanation}
                  </Typography>
                </Box>
              ) : selected !== null ? (
                <Typography variant="subtitle2" sx={{ color: "#ff6b6b" }}>
                  Sai rồi, hãy thử lại!
                </Typography>
              ) : (
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  Chọn một đáp án để trả lời.
                </Typography>
              )}

              <Box>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    onClick={prev}
                    disabled={idx === 0}
                    sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    Trước
                  </Button>

                  <Button
                    variant="contained"
                    onClick={next}
                    disabled={!showExplanation}
                    sx={{
                      bgcolor: "#eeb72b",
                      color: "#8b1f20",
                      "&:disabled": { bgcolor: "rgba(238,183,43,0.25)" },
                    }}
                  >
                    {idx + 1 === questions.length ? "Hoàn tất" : "Câu tiếp"}
                  </Button>
                </Stack>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ) : (
        // Phần kết quả
        <Box sx={{ maxWidth: 820, mx: "auto", textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Bạn đã hoàn thành quiz!
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Điểm của bạn: {score} / {questions.length}
          </Typography>
          <Button
            variant="contained"
            startIcon={<ReplayIcon />}
            onClick={retry}
            sx={{ bgcolor: "#eeb72b", color: "#8b1f20" }}
          >
            Thử lại
          </Button>
        </Box>
      )}
    </Box>
  );
}
