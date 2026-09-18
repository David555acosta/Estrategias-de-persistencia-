const { Serie } = require("../models");

//////////todos

const getAllSeries = async (req, response) => {
  try {
    const series = await Serie.findAll({});
    if (!series) {
      return response
        .status(400)
        .json({ message: "No se encontro ninguna serie" });
    }
    response.status(200).json(series);
  } catch (error) {
    response.status(500).json({ message: "Error en el servidor" });
  }
};

////// filtrar por id
const getSerieById = async (req, response) => {
  try {
    if (isNaN(req.params.id)) {
      response.status(400).json({ msj: "El id debe ser numerico" });
      return;
    }

    const id = req.params.id;
    const serie = await Serie.findByPk(id);

    if (!serie) {
      return response
        .status(400)
        .json({ message: "No se encontro ninguna serie con este id" });
    }

    if (serie) {
      response.status(200).json(serie);
    } else {
      response.status(404).json({ msg: `el id ${id} no se encuentra.` });
    }
  } catch (e) {
    response.status(500).json({ message: "Error en el servidor" });
  }
};

/// crear una nueva serie

const createSerie = async (req, response) => {
  try {
    const body = req.body;
    const serie = await Serie.create({
      nombre: body.nombre,
      temporadas: body.temporadas,
      plataforma: body.plataforma,
      disponible: true,
    });

    if (!serie) {
      return response.status(400).json({ message: "Error al crear serie" });
    }

    response.status(201).json(serie);
  } catch (e) {
    response.status(500).json({ message: "Error en el servidor" });
  }
};

/// Actualizar serie

const updateSerie = async (req, response) => {
  try {
    if (isNaN(req.params.id)) {
      response.status(400).json({ msj: "El id debe ser numerico" });
      return;
    }

    const idSerie = req.params.id;
    const serieActualizada = req.body;
    const serie = await Serie.findByPk(idSerie);

    if (!serie) {
      return response
        .status(400)
        .json({ message: "No se encontro ninguna serie con este id" });
    }

    await serie.update(serieActualizada);
    response.status(200).json(serie);
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
    const serie = await Serie.findByPk(id);

    if (!serie) {
      response.status(404).json({ msg: `el id ${id} no se encuentra!.` });
      return;
    }

    await serie.destroy();
    response.status(200).json({ msg: "serie eliminada", serie: serie });
  } catch (error) {
    response.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  getAllSeries,
  getSerieById,
  updateSerie,
  deleteById,
  createSerie,
};
