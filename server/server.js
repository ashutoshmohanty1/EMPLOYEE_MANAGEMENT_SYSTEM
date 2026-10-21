require("dotenv").config();

const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const db = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// register
app.post("/register", async (req, res) =>{
    try {
        const {name, email, password, confirmpassword} = req.body;

        if(!name || !email || !password || !confirmpassword) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if(password !== confirmpassword) {
            return res.status(400).json({
                message: "Please check the password"
            });
        }

        const [existingUsers] = await db.query(
            "SELECT id FROM users where email = ?",
            [email]
        );

        if(existingUsers.length > 0) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            "INSERT INTO users(name, email, password) values(?, ?, ?)",
            [name, email, hashPassword]
        );

        res.status(201).json({
            message: "Register data received successfully",
            user: {
                id: result.insertId,
                name: name,
                email: email,
                role: "employee"
            }
        });
    } catch(error) {
        console.error("Register error: ", error);

        res.status(500).json({
            message: "Registration failed"
        });
        
    }
});

//login
app.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const [users] = await db.query(
            "SELECT id, name, email, password, role FROM users WHERE email = ?",
            [email]
        );

        if(users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = users[0];

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if(!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "6h"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch(error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Login failed"
        });
    }
});

//profile
app.get("/profile", authMiddleware, async (req, res) => {
    try {
        const [users] = await db.query(
            "SELECT id, name, email, role FROM users WHERE id = ?",
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            user: users[0]
        });
    } catch(error) {
        console.error("Profile error: ", error);

        res.status(500).json({
            message: "Failed to fetch profile"
        });
    }
});

app.get(
    "/employees",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {
            const [employees] = await db.query(
                "SELECT id, name, email, role, created_at FROM users"
            );

            res.status(200).json({
                message: "Employees fetched successfully",
                count: employees.length,
                employees: employees
            });
        } catch(error) {
            console.error("Fetch employees error: ", error);

            res.status(500).json({
                message: "Failed to fetch employees"
            });
        }
    }
);

app.listen(5000, () => {
    console.log("Server is running");
});
