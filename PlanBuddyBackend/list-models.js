import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Use a model from your list:
const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

async function run() {
    try {
        const result = await model.generateContent("Hello! Who are you?");
        console.log(result.response.text());
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

run();
