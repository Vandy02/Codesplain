import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import OpenAI from "openai";

const app = express();
app.use(express.json({
    limit: "10mb"
}));
//Security Middleware

app.use(helmet());
app.use(cors({
    //origin: process.env.FRONTEND_URL || "http://localhost:3000",
    origin: true,
    credentials: true
}));


const limiter =
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: "Too many requests from this IP, please try again after 15 minutes"
    })

app.use(limiter);



const API_KEY = process.env.NEBIUS_API_KEY;
//console.log("NEBIUS_API_KEY exists:", !!process.env.NEBIUS_API_KEY);
//console.log("NEBIUS_API_KEY length:", process.env.NEBIUS_API_KEY?.length);


const client = new OpenAI({
    baseURL: 'https://api.tokenfactory.nebius.com/v1/',
    apiKey: API_KEY,
});

app.post("/api/explain-code", async (req, res) => {
    try {
        const { code, language, level } = req.body;
        if (!code) {
            return res.status(400).json({ error: "Code is required" });
        }

        let levelInstruction = "";
        if (level === "Beginner") {
            levelInstruction = "Explain like I'm five. Use simple analogies (like recipes or legos) and avoid technical jargon.";
        } else if (level === "Senior") {
            levelInstruction = "Explain like a professional.";
        } else {
            levelInstruction = "Explain for an Intermediate developer. Balance technical terms with clear logic.";
        }

        const messages = [
            {
                role: "system",
                content: `You are a helpful coding assistant. ${levelInstruction} Explain the code clearly using standard Markdown. Do not over-format every single variable name.`
            },
            {
                role: "user",
                content: `Explain this ${language || "programming"} code in simple terms: \n\n${code}`
            },
        ];

        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages,
            temperature: 0.3,
            max_tokens: 1000,
        });
        const explanation = response?.choices[0]?.message?.content;
        if (!explanation) {
            return res.status(500).json({ error: "Error explaining code" });
        }
        res.json({ explanation, language: language || "unknown" });
    }
    catch (err) {
        console.error("Error explaining code:", err);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

