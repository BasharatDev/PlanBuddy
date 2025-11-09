import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.post('/plan', async (req, res) => {
  try {
    const { goal, horizon } = req.body;

    if (!goal || !horizon) {
      return res.status(400).json({ error: "goal and horizon are required" });
    }

    const prompt = `
Return ONLY valid JSON. No text outside JSON.

Format:
{
  "tasks": [
    {
      "id": "string",
      "title": "string",
      "dueDate": "YYYY-MM-DD",
      "priority": "low|medium|high",
      "notes": "string (optional)",
      "emoji": "string (optional)"
    }
  ]
}

Goal: "${goal}"
Horizon: "${horizon}"
    `;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    // ✅ Clean extra markdown if AI returns ```json
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(500).json({ error: "Invalid AI response format", raw });
    }

    const data = JSON.parse(jsonMatch[0]);
    return res.json(data);

  } catch (err: any) {
    return res.status(500).json({ error: "Server error", detail: err.message });
  }
});

app.listen(8787, () => console.log("✅ Server running on http://localhost:8787"));
