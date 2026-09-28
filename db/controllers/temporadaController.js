const { Temporada } = require("../models");

//////////todos

const getAllTemporadas = async (req, response) => {
  try {
    const temporadas = await Temporada.findAll({});
    if (!temporadas) {
      return response
        .status(400)
        .json({ message: "No se encontro ninguna Temporada" });
    }
    response.status(200).json(temporadas);
  } catch (error) {
    response.status(500).json({ message: "Error en el servidor" });
  }
};

////// filtrar por id
const getTemporadaById = async (req, response) => {
  try {
    if (isNaN(req.params.id)) {
      response.status(400).json({ msj: "El id debe ser numerico" });
      return;
    }

    const id = req.params.id;
    const temporada = await Temporada.findByPk(id);

    if (!temporada) {
      return response
        .status(400)
        .json({ message: "No se encontro ninguna Temporada con este id" });
    }

    if (temporada) {
      response.status(200).json(temporada);
    } else {
      response.status(404).json({ msg: `el id ${id} no se encuentra.` });
    }
  } catch (e) {
    response.status(500).json({ message: "Error en el servidor" });
  }
};

/// crear una nueva serie

const createTemporada = async (req, response) => {
  try {
    const body = req.body;
    const temporada = await Temporada.create({
      nombre: body.nombre,
      numero: body.numero,
      disponible: body.disponible,
      serieId:body.serieId,
    });

    if (!temporada) {
      return response.status(400).json({ message: "Error al crear temporada" });
    }

    response.status(201).json(temporada);
  } catch (e) {
    response.status(500).json({ message: "Error en el servidor" });
  }
};

/// Actualizar serie

const updateTemporada = async (req, response) => {
  try {
    if (isNaN(req.params.id)) {
      response.status(400).json({ msj: "El id debe ser numerico" });
      return;
    }

    const idTemporada = req.params.id;
    const temporadaActualizada = req.body;
    const temporada = await Temporada.findByPk(idTemporada);

    if (!temporada) {
      return response
        .status(400)
        .json({ message: "No se encontro ninguna temporada con este id" });
    }

    await serie.update(temporadaActualizada);
    response.status(200).json(temporada);
  } catch (error) {
    response.status(500).json({ message: "Error en el servidor" });
  }
};

///// eliminar por id

const deleteById = async (req, response) => {
  try {
    if (isNaN(req.params.id)) {
      response.status(400).json({ msj: "El id debe ser numerico" });
      return;
    }
    const id = req.params.id;
    const temporada = await Temporada.findByPk(id);

    if (!temporada) {
      response.status(404).json({ msg: `el id ${id} no se encuentra!.` });
      return;
    }

    await temporada.destroy();
    response.status(200).json({ msg: "temporada eliminada", temporada: temporada });
  } catch (error) {
    response.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  getAllTemporadas,
  getTemporadaById,
  createTemporada,
  updateTemporada,
  deleteById,
};