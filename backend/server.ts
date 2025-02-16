import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// ✅ 기본 루트 엔드포인트
app.get("/", (req, res) => {
  res.json({ message: "서버 연결 완료" });
});

// ✅ 메시지를 반환하는 엔드포인트
app.get("/api/message", (req, res) => {
  res.json({ message: "LFG! 🚀" });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});