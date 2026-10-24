const { Serie, Actor, Temporada } = require("../models");

const getAllSeries = async (req, res) => {
  try {
    const series = await Serie.findAll({});
    res.status(200).json(series);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getSerieById = async (req, res) => {
  try {
    const { id } = req.params;
    const serie = await Serie.findByPk(id, {
      include: {
        model: Actor,
        through: { attributes: [] },
      },
    });
    res.status(200).json(serie);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const createSerie = async (req, res) => {
  try {
    const serie = await Serie.create(req.body);
    res.status(201).json(serie);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const updateSerie = async (req, res) => {
  try {
    const { id } = req.params;
    const serie = await Serie.findByPk(id);

    await serie.update(req.body);
    res.status(200).json(serie);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const serie = await Serie.findByPk(id);

    await serie.destroy();
    res.status(200).json({ message: "Serie eliminada", serie });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// --- Métodos para la relación 1:N (Asociar/Desasociar Temporadas) ---

const createTemporadaFromSerie = async (req, res) => {
  try {
    const { id } = req.params;

    const serie = await Serie.findByPk(id);

    const nuevaTemporada = await serie.createTemporada(req.body);

    res.status(201).json({
      message: "Temporada creada y vinculada exitosamente",
      temporada: nuevaTemporada,
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getTemporadaByIdFromSerie = async (req, res) => {
  try {
    const { idTemporada } = req.params;

    const temporada = await Temporada.findByPk(idTemporada);

    res.status(200).json(temporada);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};




const getAllTemporadasFromSerie = async (req, res) => {
  try {
    const { id } = req.params;

    const temporadas = await Temporada.findAll({
      where: { serieId: id },
    });

    res.status(200).json(temporadas);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const updateTemporadaFromSerie = async (req, res) => {
  try {
    const { idTemporada } = req.params;

    const temporada = await Temporada.findByPk(idTemporada);

    // Actualizamos con los datos validados del body
    await temporada.update(req.body);

    res.status(200).json({
      message: "Temporada actualizada exitosamente",
      temporada,
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const deleteTemporadaFromSerie = async (req, res) => {
  try {
    const { idTemporada } = req.params;

    const temporada = await Temporada.findByPk(idTemporada);

    await temporada.destroy();

    res.status(200).json({
      message: "Temporada eliminada exitosamente",
      temporadaId: idTemporada,
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// --- Métodos para la relación N:M (Asociar/Desasociar Actores) ---

const agregarActorASerie = async (req, res) => {
  try {
    const { id, idActor } = req.params;

    const serie = await Serie.findByPk(id);

    await serie.addActor(idActor);

    res.status(200).json({
      message: "Actor vinculado a la serie exitosamente",
      serieId: id,
      actorId: idActor,
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const removerActorDeSerie = async (req, res) => {
  try {
    const { id, idActor } = req.params;

    const serie = await Serie.findByPk(id);

    await serie.removeActor(idActor);

    res.status(200).json({
      message: "Actor desvinculado de la serie exitosamente",
      serieId: id,
      actorId: idActor,
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  getAllSeries,
  getSerieById,
  createSerie,
  updateSerie,
  deleteById,
  agregarActorASerie,
  removerActorDeSerie,
  createTemporadaFromSerie,
  getTemporadaByIdFromSerie,
  getAllTemporadasFromSerie,
  updateTemporadaFromSerie,
  deleteTemporadaFromSerie,
};
