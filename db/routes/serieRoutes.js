const express = require("express");
const route = express.Router();
const { controllerSerie } = require("../controllers/index");
const { schemaSerie, schemaTemporada } = require("../schemas");
const {
  validadorId,
  validadorExsitencia,
  validadorSchema,
  validadorPertenencia,
} = require("../middlewares/validators");
const { Serie, Actor, Temporada } = require("../models");

// --- CRUD básico de Series ---
route.get("/series", controllerSerie.getAllSeries);

route.get(
  "/series/:id",
  validadorId("id"),
  validadorExsitencia(Serie, "id"),
  controllerSerie.getSerieById,
);

route.post(
  "/series",
  validadorSchema(schemaSerie),
  controllerSerie.createSerie,
);

route.put(
  "/series/:id",
  validadorId("id"),
  validadorExsitencia(Serie, "id"),
  validadorSchema(schemaSerie),
  controllerSerie.updateSerie,
);

route.delete(
  "/series/:id",
  validadorId("id"),
  validadorExsitencia(Serie, "id"),
  controllerSerie.deleteById,
);

// --- Rutas anidadas para la relación 1:N (Series - Temporadas) ---

route.post(
  "/series/:id/temporadas",
  validadorId("id"),
  validadorExsitencia(Serie, "id"),
  validadorSchema(schemaTemporada),
  controllerSerie.createTemporadaFromSerie
);

route.get(
  "/series/:id/temporadas/:idTemporada",
  validadorId("id"),
  validadorExsitencia(Serie, "id"),
  validadorId("idTemporada"),
  validadorPertenencia(Temporada, "id", "idTemporada", "serieId"),
  controllerSerie.getTemporadaByIdFromSerie,
);

route.get(
  "/series/:id/temporadas/",
  validadorId("id"),
  validadorExsitencia(Serie, "id"),
  controllerSerie.getAllTemporadasFromSerie,
);

route.put(
  "/series/:id/temporadas/:idTemporada",
  validadorId("id"),
  validadorExsitencia(Serie, "id"),
  validadorId("idTemporada"),
  validadorPertenencia(Temporada, "id", "idTemporada", "serieId"),
  validadorSchema(schemaTemporada),
  controllerSerie.updateTemporadaFromSerie,
);

route.delete(
  "/series/:id/temporadas/:idTemporada",
  validadorId("id"),
  validadorExsitencia(Serie, "id"),
  validadorId("idTemporada"),
  validadorPertenencia(Temporada, "id", "idTemporada", "serieId"),
  controllerSerie.deleteTemporadaFromSerie,
);

// --- Rutas anidadas para la relación N:M (Vincular y desvincular actores de una serie) ---
route.post(
  "/series/:id/actores/:idActor",
  validadorId("id"),
  validadorExsitencia(Serie, "id"),
  validadorId("idActor"),
  validadorExsitencia(Actor, "idActor"),
  controllerSerie.agregarActorASerie,
);

route.delete(
  "/series/:id/actores/:idActor",
  validadorId("id"),
  validadorExsitencia(Serie, "id"),
  validadorId("idActor"),
  validadorExsitencia(Actor, "idActor"),
  controllerSerie.removerActorDeSerie,
);

module.exports = route;
