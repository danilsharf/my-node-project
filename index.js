const express = require("express");
const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 3000;

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// middleware to parse JSON
app.use(express.json());

//one simple endpoint
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/health", (req, res) => {
    res.status(200).json({ message: "OK" });
});

// OpenAI chat endpoint
app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ error: "OpenAI API key is not configured" });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: message },
            ],
        });

        res.json({
            response: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error("OpenAI API error:", error);
        res.status(500).json({
            error: "Failed to get response from OpenAI",
            details: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});