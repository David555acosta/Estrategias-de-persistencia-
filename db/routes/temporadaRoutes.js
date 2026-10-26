const express = require("express");
const route = express.Router();
const { controllerTemporada } = require("../controllers/index");
const { schemaTemporada, schemaCapitulo } = require("../schemas");
const {
  validadorId,
  validadorExsitencia,
  validadorSchema,
  validadorPertenencia,
} = require("../middlewares/validators");
const { Serie, Temporada, Capitulo } = require("../models");

// --- CRUD Básico de temporadas ---
route.get("/temporadas", controllerTemporada.getAllTemporadas);

route.get(
  "/temporadas/:id",
  validadorId("id"),
  validadorExsitencia(Temporada, "id"),
  controllerTemporada.getTemporadaById,
);

route.post(
  "/temporadas",
  validadorSchema(schemaTemporada),
  controllerTemporada.createTemporada,
);

route.put(
  "/temporadas/:id",
  validadorId("id"),
  validadorExsitencia(Temporada, "id"),
  validadorSchema(schemaTemporada),
  controllerTemporada.updateTemporada,
);

route.delete(
  "/temporadas/:id",
  validadorId("id"),
  validadorExsitencia(Temporada, "id"),
  controllerTemporada.deleteById,
);

route.get(
  "/temporadas/:id/series",
  validadorId("id"),
  validadorExsitencia(Temporada, "id"),
  controllerTemporada.getSerieFromTemporada,
);

// --- Operaciones de Capítulos anidadas desde Temporada ---

route.post(
  "/temporadas/:id/capitulos",
  validadorId("id"),
  validadorExsitencia(Temporada, "id"),
  validadorSchema(schemaCapitulo),
  controllerTemporada.createCapituloFromTemporada,
);

route.put(
  "/temporadas/:id/capitulos/:idCapitulo",
  validadorId("id"),
  validadorExsitencia(Temporada, "id"),
  validadorId("idCapitulo"),
  validadorPertenencia(Capitulo, "id", "idCapitulo", "temporadaId"),
  validadorSchema(schemaCapitulo),
  controllerTemporada.updateCapituloFromTemporada,
);

route.delete(
  "/temporadas/:id/capitulos/:idCapitulo",
  validadorId("id"),
  validadorExsitencia(Temporada, "id"),
  validadorId("idCapitulo"),
  validadorPertenencia(Capitulo, "id", "idCapitulo", "temporadaId"),
  controllerTemporada.deleteCapituloFromTemporada,
);

module.exports = route;
