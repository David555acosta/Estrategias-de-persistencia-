const express = require("express");
const route = express.Router();
const { controllerCapitulo } = require("../controllers");
const { schemaCapitulo } = require("../schemas");
const {
  validadorId,
  validadorExsitencia,
  validadorSchema,
} = require("../middlewares/validators");
const { Capitulo } = require("../models");

// --- CRUD Básico de Capítulos ---
route.get("/capitulos", controllerCapitulo.getAllCapitulos);

route.get(
  "/capitulos/:id",
  validadorId("id"),
  validadorExsitencia(Capitulo, "id"),
  controllerCapitulo.getCapituloById,
);

route.post(
  "/capitulos",
  validadorSchema(schemaCapitulo),
  controllerCapitulo.createCapitulo,
);

route.put(
  "/capitulos/:id",
  validadorId("id"),
  validadorExsitencia(Capitulo, "id"),
  validadorSchema(schemaCapitulo),
  controllerCapitulo.updateCapitulo,
);

route.delete(
  "/capitulos/:id",
  validadorId("id"),
  validadorExsitencia(Capitulo, "id"),
  controllerCapitulo.deleteById,
);


route.get(
  "/capitulos/:id/serieTemporadas",
  validadorId("id"),
  validadorExsitencia(Capitulo, "id"),
  controllerCapitulo.getTemporadaAndSerieFromCapitulo
);

module.exports = route;
