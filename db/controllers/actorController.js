const { Actor } = require("../db/models");

const getAllActores = async (req, res) => {
  try {
    const actores = await Actor.findAll();
    res.status(200).json(actores);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getActorById = async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);
    res.status(200).json(actor);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const createActor = async (req, res) => {
  try {
    const actor = await Actor.create(req.body);
    res.status(201).json(actor);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const updateActor = async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);
    
    await actor.update(req.body);
    res.status(200).json(actor);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);
    
    await actor.destroy();
    res.status(200).json({ message: "Actor eliminado", actor });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  getAllActores,
  getActorById,
  createActor,
  updateActor,
  deleteById,
};