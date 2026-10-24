const express = require("express");
const route = express.Router();
const { controllerCapitulo } = require("../controllers");
const { schemaCapitulo } = require("../schemas");
const { validadorSchema, validadorExsitencia } = require("../middlewares/validadorMiddleware");
const { Capitulo } = require("../db/models");

route.get("/capitulos", controllerCapitulo.getAllCapitulos);
route.get("/capitulos/:id", validadorExsitencia(Capitulo), controllerCapitulo.getCapituloById);
route.post("/capitulos", validadorSchema(schemaCapitulo), controllerCapitulo.createCapitulo);
route.put("/capitulos/:id", validadorExsitencia(Capitulo), validadorSchema(schemaCapitulo), controllerCapitulo.updateCapitulo);
route.delete("/capitulos/:id", validadorExsitencia(Capitulo), controllerCapitulo.deleteById);

module.exports = route;