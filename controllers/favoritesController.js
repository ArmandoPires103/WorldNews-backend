const express = require("express")

const favorites = express.Router()

const { getAllFavorites} = require("../queries/favorites")

favorites.get("/", async (_req, res) => {
    const allFavorites = await getAllFavorites();
    if (allFavorites[0]) res.status(200).json(allFavorites);
    else res.status(500).json({ error: "server error" });
  });

  module.exports = favorites