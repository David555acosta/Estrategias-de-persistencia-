const express = require("express");
const route = express.Router();
const { controllerTemporada } = require("../controllers");
const { schemaTemporada } = require("../schemas");
const { validadorSchema, validadorExsitencia } = require("../middlewares/validadorMiddleware");
const { Temporada } = require("../db/models");

route.get("/temporadas", controllerTemporada.getAllTemporadas);
route.get("/temporadas/:id", validadorExsitencia(Temporada), controllerTemporada.getTemporadaById);
route.post("/temporadas", validadorSchema(schemaTemporada), controllerTemporada.createTemporada);
route.put("/temporadas/:id", validadorExsitencia(Temporada), validadorSchema(schemaTemporada), controllerTemporada.updateTemporada);
route.delete("/temporadas/:id", validadorExsitencia(Temporada), controllerTemporada.deleteById);

module.exports = route;