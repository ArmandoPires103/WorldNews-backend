const db = require("../db/dbConfig.js")

const getAllFavorites = async () => {
    try{
        const allFavorites = await db.any ("SELECT * FROM favorites");
        return allFavorites;
    } catch (error) {
        return error;
    }
};

const createFavorite = async (favorite) => {
    try {
      const query = `
        INSERT INTO favorites (url, description, title, url_to_image )
        VALUES ($1, $2, $3, $4) RETURNING *`;
      const newFavorite = await db.one(query, [
        favorite.url,
        favorite.description,
        favorite.title,
        favorite.url_to_image
      ]);
      return newFavorite;
    } catch (error) {
      console.error("Error creating favorite:", error);
      throw error;
    }
  };

  const updateFavorite = async (id, updatedFavorite) => {
    try {
        const query = `
            UPDATE favorites 
            SET url = $1, description = $2, title = $3, url_to_image = $4
            WHERE id = $5
            RETURNING *`;
        const updatedRecord = await db.one(query, [
            updatedFavorite.url,
            updatedFavorite.description,
            updatedFavorite.title,
            updatedFavorite. url_to_image,
            id
        ]);
        return updatedRecord;
    } catch (error) {
        console.error("Error updating favorite:", error);
        throw error;
    }
};

const deleteFavorite = async (id) => {
    try {
        const query = `
            DELETE FROM favorites 
            WHERE id = $1
            RETURNING *`;
        const deletedRecord = await db.one(query, [id]);
        return deletedRecord;
    } catch (error) {
        console.error("Error deleting favorite:", error);
        throw error;
    }
};



module.exports = { getAllFavorites, createFavorite, updateFavorite, deleteFavorite}