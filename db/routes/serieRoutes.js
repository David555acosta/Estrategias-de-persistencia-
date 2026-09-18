const express = require("express");
const route = express.Router();

const {
  getAllSeries,
  getSerieById,
  createSerie,
  updateSerie,
  deleteById,
} = require("../controllers/serieController");

route.get("/series", getAllSeries);

route.get("/series/:id", getSerieById);
route.post("/series", createSerie);

route.put("/series/:id", updateSerie);
route.delete("/series/:id", deleteById);

module.exports = route;
