// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const cron = require("node-cron");
const cookieParser = require("cookie-parser");

const authController = require("./controllers/authController");
const worldController = require("./controllers/worldController");
const favoritesController = require("./controllers/favoritesController");




// CONFIGURATION
const app = express();

// cron job to attempt to prevent render from sleeping
cron.schedule("*/5 * * * *", () => {
  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  console.log(`Running a task every 5 minutes. Current time: ${currentTime}`);
});

// MIDDLEWARE change origin to your frontend netlify address for deployment
app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "https://main--jwt-auth-10-3.netlify.app/",
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/news/countries", worldController)
app.use("/news/favorites", favoritesController)

// ROUTES
//http://localhost:3003/news?country=us //TO ACCESS COUNTRY BY 2 LETTERS

app.get('/news', async (req, res) => {
  try {
    const country = req.query.country || 'us'; // Default to 'us' if country parameter is not provided
    const apiKey = '9a742a293e0c409ca0fb88b932aef633'; 
    
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use("/api/auth", authController);

app.get("/", (_req, res) => {
  res.send("Welcome to JWT Auth!");
});

// 404 PAGE
app.get("*", (_req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
