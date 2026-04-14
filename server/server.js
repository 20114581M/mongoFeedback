const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Force Node.js to use Google DNS
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://servicesjmseptember_db_user:HwempoyKbcSbf00j@cluster0.yt5pl13.mongodb.net/aptech?retryWrites=true&w=majority", {
    serverSelectionTimeoutMS: 60000,
})
    .then(() => console.log("MongoDB connected Successfully"))
    .catch((err) => console.error("Connection failed:", err.message));

const feedbackSchema = new mongoose.Schema({
    studentName: String,
    course: String,
    rating: Number,
    comment: String,
});

const Feedback = mongoose.model("feedback", feedbackSchema, "feedback");

app.post("/feedback", async (req, res) => {
    try {
        const AllFeedback = await Feedback.create(req.body);
        res.json({ message: "Feedback submitted Successfully", AllFeedback });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => { console.log("Server running on port 5000") });