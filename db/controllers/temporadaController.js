const { Temporada, Serie, Capitulo } = require("../models");

const getAllTemporadas = async (req, res) => {
  try {
    const temporadas = await Temporada.findAll({});
    res.status(200).json(temporadas);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getTemporadaById = async (req, res) => {
  try {
    const { id } = req.params;
    const temporada = await Temporada.findByPk(id, {
      include: {
        model: Serie,
      },
    });
    res.status(200).json(temporada);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const createTemporada = async (req, res) => {
  try {
    const { id } = req.params;

    const temporada = await Temporada.create({
      ...req.body,
      serieId: id,
    });

    res.status(201).json(temporada);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const updateTemporada = async (req, res) => {
  try {
    const { id } = req.params;
    const temporada = await Temporada.findByPk(id);

    await temporada.update(req.body);
    res.status(200).json(temporada);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const temporada = await Temporada.findByPk(id);

    await temporada.destroy();
    res.status(200).json({ message: "Temporada eliminada", temporada });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getSerieFromTemporada = async (req, res) => {
  try {
    const { id } = req.params; // El ID corresponde a la temporada

    const temporada = await Temporada.findByPk(id, {
      include: {
        model: Serie,
        as: "serie",
      },
    });

    res.status(200).json(temporada.serie);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

/////////////////////// crud desde temporada a capitulos

const createCapituloFromTemporada = async (req, res) => {
  try {
    const { id } = req.params; // ID de la temporada

    const capitulo = await Capitulo.create({
      ...req.body,
      temporadaId: id,
    });

    res.status(201).json(capitulo);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Actualizar un capítulo (el middleware ya validó que existe y pertenece a la temporada)
const updateCapituloFromTemporada = async (req, res) => {
  try {
    const { idCapitulo } = req.params;

    const capitulo = await Capitulo.findByPk(idCapitulo);
    await capitulo.update(req.body);

    res.status(200).json({
      message: "Capítulo actualizado exitosamente",
      capitulo,
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Eliminar un capítulo (el middleware ya validó la pertenencia)
const deleteCapituloFromTemporada = async (req, res) => {
  try {
    const { idCapitulo } = req.params;

    const capitulo = await Capitulo.findByPk(idCapitulo);
    await capitulo.destroy();

    res.status(200).json({
      message: "Capítulo eliminado exitosamente",
      capituloId: idCapitulo,
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  getAllTemporadas,
  getTemporadaById,
  createTemporada,
  updateTemporada,
  deleteById,
  getSerieFromTemporada,
  createCapituloFromTemporada,
  updateCapituloFromTemporada,
  deleteCapituloFromTemporada,
};
