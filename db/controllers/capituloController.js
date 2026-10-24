const { Capitulo, Temporada } = require("../models");

const getAllCapitulos = async (req, res) => {
  try {
    const capitulos = await Capitulo.findAll({
      include: {
        model: Temporada,
        as: "temporada",
      },
    });
    res.status(200).json(capitulos);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getCapituloById = async (req, res) => {
  try {
    const { id } = req.params;
    const capitulo = await Capitulo.findByPk(id, {
      include: {
        model: Temporada,
        as: "temporada",
      },
    });
    res.status(200).json(capitulo);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const createCapitulo = async (req, res) => {
  try {
    const capitulo = await Capitulo.create(req.body);
    res.status(201).json(capitulo);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const updateCapitulo = async (req, res) => {
  try {
    const { id } = req.params;
    const capitulo = await Capitulo.findByPk(id);

    await capitulo.update(req.body);
    res.status(200).json(capitulo);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const capitulo = await Capitulo.findByPk(id);

    await capitulo.destroy();
    res
      .status(200)
      .json({ message: "Capítulo eliminado exitosamente", capitulo });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getTemporadaAndSerieFromCapitulo = async (req, res) => {
  try {
    const { id } = req.params; // ID del capítulo

    const capitulo = await Capitulo.findByPk(id, {
      include: {
        model: Temporada,
        as: "temporada",
        include: {
          model: Serie,
          as: "serie",
        },
      },
    });
    res.status(200).json(capitulo);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  getAllCapitulos,
  getCapituloById,
  createCapitulo,
  updateCapitulo,
  deleteById,
  getTemporadaAndSerieFromCapitulo,
};
