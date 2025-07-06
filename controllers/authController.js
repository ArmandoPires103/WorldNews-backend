const express = require("express");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const { findUserByUsername, createUser } = require("../queries/users");
const { authenticateToken } = require("../middlewares/authenticateToken");
const auth = express.Router();

console.log("✅ authController has been loaded!");

// TEST ROUTE
auth.get("/test", (req, res) => {
  res.json({ message: "Auth route is working!" });
});

// LOGIN ROUTE
auth.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during the login process." });
  }
});

// REGISTER ROUTE
auth.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  console.log("Incoming register body:", req.body);

  try {
    if (!username || !password || !email) {
      return res.status(400).json({ message: "Username, password, and email are required." });
    }

    // Check if user exists
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = await createUser({
      username,
      passwordHash: hashedPassword,
      email,
    });

    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      newUser,
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "An error occurred during the registration process." });
  }
});

// CHECK AUTH ROUTE
auth.get("/check-auth", authenticateToken, (req, res) => {
  if (req.user) {
    return res.status(200).json({
      isAuthenticated: true,
      user: req.user,
    });
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
});

// GET USER ROUTE
auth.get("/user", authenticateToken, (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
});

module.exports = auth;
