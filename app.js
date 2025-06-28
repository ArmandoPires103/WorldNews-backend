// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const axios = require("axios"); // Import axios

const authController = require("./controllers/authController");
const worldController = require("./controllers/worldController");
const favoritesController = require("./controllers/favoritesController");

// CONFIGURATION
const app = express();

// cron job to attempt to prevent render from sleeping
// cron.schedule("*/5 * * * *", () => {
//   const currentTime = new Date().toLocaleString("en-US", {
//     timeZone: "America/New_York",
//   });
//   console.log(`Running a task every 5 minutes. Current time: ${currentTime}`);
// });

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

// NEWS API ROUTE with NewsData.io
app.get("/news", async (req, res) => {
  try {
    const country = req.query.country || "us"; // Default to 'us'
    const apiKey = "pub_7338935f079c1857106cee91b034736d148db"; // Your provided API key
    
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${country}&language=en`;
    const response = await axios.get(url);  // Use axios for the request

    res.json(response.data); // Send the response data
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// HOME ROUTE
app.get("/", (_req, res) => res.send("Welcome to JWT Auth!"));

// 404 PAGE
app.get("*", (_req, res) => res.status(404).send("Page not found"));

module.exports = app;
