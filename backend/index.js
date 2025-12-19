import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateHints } from "./gemini.js";
import { setCachedHints, getCachedHints } from "./cache.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK");
});

app.post("/hints", async (req, res) => {
  try {
    const { title = "", tags = [] } = req.body || {};

    if (!title) {
      return res.json({ hints: [] });
    }

    const cached = getCachedHints(title);
    if (cached) {
      return res.json({ hints: cached, cached: true });
    }

    const raw = await generateHints({ title, tags });

    const hints = raw
      .split("\n")
      .map(h => h.trim())
      .filter(Boolean)
      .slice(0, 3);

    setCachedHints(title, hints);

    return res.json({ hints, cached: false });

  } catch (err) {
    console.error("Backend error:", err);
    return res.status(500).json({
      hints: [
        "Focus on the core data structure suggested by the problem",
        "Think about how constraints affect your approach",
        "Try solving a small example step by step"
      ],
      cached: false
    });
  }
});


const PORT = process.env.PORT || 3100;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});