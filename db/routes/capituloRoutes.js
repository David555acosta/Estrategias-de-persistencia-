const express = require("express");
const route = express.Router();

const {
  getAllCapitulos,
  getCapituloById,
  createCapitulo,
  updateCapitulo,
  deleteById,
} = require("../controllers/capituloController");

route.get("/capitulos", getAllCapitulos);

route.get("/capitulos/:id", getCapituloById);
route.post("/capitulos", createCapitulo);

route.put("/capitulos/:id", updateCapitulo);
route.delete("/capitulos/:id", deleteById);

module.exports = route;