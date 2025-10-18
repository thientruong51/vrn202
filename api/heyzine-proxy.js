export default async function handler(req, res) {
  // ✅ Lấy id flipbook từ query, ví dụ ?id=1cb3bae27e
  const flipbookId = req.query.id || "1cb3bae27e";

  // ✅ Dán API key của bạn (bạn nên để trong biến môi trường Vercel sau)
  const apiKey = "dbb219f140da0b86b97e6d03ca81ebd854714607.fb375decc8666a41";

  try {
    // ✅ Gọi API thật của Heyzine
    const response = await fetch(
      `https://heyzine.com/api/flipbooks/${flipbookId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();

    // ✅ Cho phép React frontend gọi mà không bị CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Lỗi proxy Heyzine:", error);
    res.status(500).json({ error: "Proxy server error" });
  }
}
