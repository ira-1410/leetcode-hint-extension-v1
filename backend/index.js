import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateHints } from "./gemini.js";
import { setCachedHints, getCachedHints } from "./cache.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/hints", async (req, res) => {
  const cached = getCachedHints(req.body.title);
  if (cached) {
    return res.json({ hints: cached, cached: true });
  }


  try {
    const raw = await generateHints(req.body);

    const hints = raw
        .split("\n")
        .map(h => h.trim())
        .filter(h => h.length > 0)
        .slice(0, 3);

    await setCachedHints(req.body.title, hints);

    res.json({ hints, cached: false });

  } catch (err) {
    console.error("Gemini error:", err.message);
    //fallback
    res.json({
        hints: [
          "Focus on the core data structure suggested by the problem",
          "Think about how constraints affect your approach",
          "Try solving a small example step by step"
        ]
      });
  }
});

app.listen(3100, "127.0.0.1", () => {
    console.log("Backend running on http://127.0.0.1:3100");
    console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);
});
