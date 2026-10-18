require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


// Home route
app.get("/", (req, res) => {
    res.send("Employee Management System Backend is running...");
});


// Database test
app.get("/test-db", async (req, res) => {
    try {
        const [result] = await db.query("SELECT 1");

        res.json({
            success: true,
            message: "MySQL connected successfully",
            result
        });
    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            success: false,
            message: "MySQL connection failed"
        });
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});