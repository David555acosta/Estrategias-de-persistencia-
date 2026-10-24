const express = require("express");
const route = express.Router();
const { controllerActor } = require("../controllers/index");
const { schemaActor } = require("../schemas");
const { validadorId, validadorExsitencia, validadorSchema } = require("../middlewares/validators");
const { Actor } = require("../models");

route.get("/actores", controllerActor.getAllActores);

route.get(
    "/actores/:id",
    validadorId("id"),
    validadorExsitencia(Actor, "id"),
    controllerActor.getActorById
);

route.post(
    "/actores",
    validadorSchema(schemaActor),
    controllerActor.createActor
);

route.put(
    "/actores/:id",
    validadorId("id"),
    validadorExsitencia(Actor, "id"),
    validadorSchema(schemaActor),
    controllerActor.updateActor
);

route.delete(
    "/actores/:id",
    validadorId("id"),
    validadorExsitencia(Actor, "id"),
    controllerActor.deleteById
);

module.exports = route;