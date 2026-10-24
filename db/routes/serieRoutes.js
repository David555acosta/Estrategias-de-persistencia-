const express = require("express");
const route = express.Router();
const { controllerSerie } = require("../controllers");
const { schemaSerie } = require("../schemas");
const { validadorSchema, validadorExsitencia } = require("../middlewares/validadorMiddleware");
const { Serie } = require("../db/models");

route.get("/series", controllerSerie.getAllSeries);
route.get("/series/:id", validadorExsitencia(Serie), controllerSerie.getSerieById);
route.post("/series", validadorSchema(schemaSerie), controllerSerie.createSerie);
route.put("/series/:id", validadorExsitencia(Serie), validadorSchema(schemaSerie), controllerSerie.updateSerie);
route.delete("/series/:id", validadorExsitencia(Serie), controllerSerie.deleteById);

module.exports = route;
