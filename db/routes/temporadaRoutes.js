const express = require("express");
const route = express.Router();
const { controllerTemporada } = require("../controllers/index");
const {schemaTemporada , schemaCapitulo} = require("../schemas");
const {
  validadorId,
  validadorExsitencia,
  validadorSchema,
} = require("../middlewares/validators");
const { Serie, Temporada } = require("../models");

// --- CRUD Básico de temporadas ---
route.get("/temporadas", controllerTemporada.getAllTemporadas);

route.get(
  "/temporadas/:id",
  validadorId,
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
  validadorId,
  validadorExsitencia(Temporada, "id"),
  validadorSchema(schemaTemporada),
  controllerTemporada.updateTemporada,
);

route.delete(
  "/temporadas/:id",
  validadorId,
  validadorExsitencia(Temporada, "id"),
  controllerTemporada.deleteById,
);

route.get(
  "/temporadas/:id/series",
  validadorId,
  validadorExsitencia(Temporada, "id"),
  controllerTemporada.getSerieFromTemporada,
);

// --- Operaciones de Capítulos anidadas desde Temporada ---

// 1. Crear capítulo en una temporada
route.post(
  "/temporadas/:id/capitulos",
  validadorId,
  validadorExsitencia(Temporada, "id"),
  validadorSchema(schemaCapitulo),
  controllerTemporada.createCapituloFromTemporada,
);

// 2. Actualizar capítulo asegurando pertenencia a la temporada
route.put(
  "/temporadas/:id/capitulos/:idCapitulo",
  validadorId,
  validadorExsitencia(Temporada, "id"),
  validadorId,
  validadorPertenencia(Capitulo, "id", "idCapitulo", "temporadaId"),
  validadorSchema(schemaCapitulo),
  controllerTemporada.updateCapituloFromTemporada,
);

// 3. Eliminar capítulo asegurando pertenencia a la temporada
route.delete(
  "/temporadas/:id/capitulos/:idCapitulo",
  validadorId,
  validadorExsitencia(Temporada, "id"),
  validadorId,
  validadorPertenencia(Capitulo, "id", "idCapitulo", "temporadaId"),
  controllerTemporada.deleteCapituloFromTemporada,
);

module.exports = route;
