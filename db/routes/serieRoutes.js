const express = require("express");
const route = express.Router();
const { controllerSerie } = require("../controllers");

route.get("/series", controllerSerie.getAllSeries);

route.get("/series/:id", controllerSerie.getSerieById);
route.post("/series", controllerSerie.createSerie);

route.put("/series/:id", controllerSerie.updateSerie);
route.delete("/series/:id", controllerSerie.deleteById);

module.exports = route;
