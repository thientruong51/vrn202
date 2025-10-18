export default async function handler(req, res) {
  // Lấy id flipbook từ query
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Thiếu id flipbook!" });
  }

  // Dán API key của bạn (hoặc lấy từ biến môi trường trong Vercel)
  const apiKey = "dbb219f140da0b86b97e6d03ca81ebd854714607.fb375decc8666a41";

  try {
    // Gọi API Heyzine thật
    const response = await fetch(`https://heyzine.com/api/flipbooks/${id}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();

    // Cho phép frontend gọi không bị CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    return res.status(200).json(data);
  } catch (error) {
    console.error("❌ Lỗi khi gọi API Heyzine:", error);
    return res.status(500).json({ error: "Proxy server error" });
  }
}
