const express = require("express");
const route = express.Router();

const {
  getAllTemporadas,
  getTemporadaById,
  createTemporada,
  updateTemporada,
  deleteById,
} = require("../controllers/temporadaController");

route.get("/temporadas", getAllTemporadas);

route.get("/temporadas/:id", getTemporadaById);
route.post("/temporadas", createTemporada);

route.put("/temporadas/:id", updateTemporada);
route.delete("/temporadas/:id", deleteById);

module.exports = route;