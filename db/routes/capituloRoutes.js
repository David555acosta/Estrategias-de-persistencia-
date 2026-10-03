const express = require("express");
const route = express.Router();
const { controllerCapitulo } = require("../controllers");



route.get("/capitulos", controllerCapitulo.getAllCapitulos);

route.get("/capitulos/:id", controllerCapitulo.getCapituloById);
route.post("/capitulos", controllerCapitulo.createCapitulo);

route.put("/capitulos/:id", controllerCapitulo.updateCapitulo);
route.delete("/capitulos/:id", controllerCapitulo.deleteById);

module.exports = route;