const express = require("express");

const app = express();
const PORT = 3000;

// middleware to parse JSON
app.use(express.json());

//one simple endpoint
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/health", (req, res) => {
    res.status(200).json({ message: "OK" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});