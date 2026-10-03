const express = require("express");
const route = express.Router();
const { controllerTemporada } = require("../controllers");



route.get("/temporadas", controllerTemporada.getAllTemporadas);

route.get("/temporadas/:id", controllerTemporada.getTemporadaById);
route.post("/temporadas", controllerTemporada.createTemporada);

route.put("/temporadas/:id", controllerTemporada.updateTemporada);
route.delete("/temporadas/:id", controllerTemporada.deleteById);

module.exports = route;