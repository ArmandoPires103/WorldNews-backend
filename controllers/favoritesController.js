const express = require("express")

const favorites = express.Router()

const { getAllFavorites, createFavorite, updateFavorite, deleteFavorite} = require("../queries/favorites")

favorites.get("/", async (_req, res) => {
    const allFavorites = await getAllFavorites();
    if (allFavorites[0]) res.status(200).json(allFavorites);
    else res.status(500).json({ error: "server error" });
  });

  favorites.post("/", async (req, res) => {
    try {
      const favorite = await createFavorite(req.body);
      res.json(favorite);
    } catch (error) {
      res.status(400).json({ error });
    }
  });

  favorites.put("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    if (id) {
      const updatedFavorite = await updateFavorite(id, req.body);
      res.status(200).json(updatedFavorite);
    } else {
      res.status(400).json({ error });
    }
  });

  favorites.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedfavorite = await deleteFavorite(id);
    if (deletedfavorite.id) {
      res.status(200).json(deletedfavorite);
    } else {
      res.status(404).json("Country not found");
    }
  });
  module.exports = favorites