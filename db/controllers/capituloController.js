const { Capitulo } = require("../models");

//////////todos

const getAllCapitulos = async (req, response) => {
  try {
    const capitulos = await Capitulo.findAll({});
    if (!capitulos) {
      return response
        .status(400)
        .json({ message: "No se encontro ningun Capitulo" });
    }
    response.status(200).json(capitulos);
  } catch (error) {
    response.status(500).json({ message: "Error en el servidor" });
  }
};

////// filtrar por id
const getCapituloById = async (req, response) => {
  try {
    if (isNaN(req.params.id)) {
      response.status(400).json({ msj: "El id debe ser numerico" });
      return;
    }

    const id = req.params.id;
    const capitulo = await Capitulo.findByPk(id);

    if (!capitulo) {
      return response
        .status(400)
        .json({ message: "No se encontro ningun capitulo con este id" });
    }

    if (capitulo) {
      response.status(200).json(capitulo);
    } else {
      response.status(404).json({ msg: `el id ${id} no se encuentra.` });
    }
  } catch (e) {
    response.status(500).json({ message: "Error en el servidor" });
  }
};

/// crear una nueva serie

const createCapitulo = async (req, response) => {
  try {
    const body = req.body;
    const capitulo = await Capitulo.create({
      nombre: body.nombre,
      disponible: body.disponible,
      temporadaId: body.temporadaId,
    });

    if (!capitulo) {
      return response.status(400).json({ message: "Error al crear capitulo" });
    }

    response.status(201).json(capitulo);
  } catch (e) {
    response.status(500).json({ message: "Error en el servidor" });
  }
};

/// Actualizar serie

const updateCapitulo = async (req, response) => {
  try {
    if (isNaN(req.params.id)) {
      response.status(400).json({ msj: "El id debe ser numerico" });
      return;
    }

    const idCapitulo = req.params.id;
    const capituloActualizado = req.body;
    const capitulo = await Temporada.findByPk(idCapitulo);

    if (!capitulo) {
      return response
        .status(400)
        .json({ message: "No se encontro ningun capitulo con este id" });
    }

    await capitulo.update(capituloActualizado);
    response.status(200).json(capitulo);
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
    const capitulo = await Capitulo.findByPk(id);

    if (!capitulo) {
      response.status(404).json({ msg: `el id ${id} no se encuentra!.` });
      return;
    }

    await capitulo.destroy();
    response.status(200).json({ msg: "capotulo eliminado", capitulo: capitulo });
  } catch (error) {
    response.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
   getAllCapitulos,
  getCapituloById,
  createCapitulo,
  updateCapitulo,
  deleteById,
};