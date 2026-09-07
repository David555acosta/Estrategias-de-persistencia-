const express = require("express");
const series = require("./data/series.json");

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  console.log(`la APP esta escuchando en el puerto ${PORT}...`);
});

//////////todos

app.get('/series', (req, response) => {
  response.status(200).json(series);
});

////// filtrar por id

app.get('/series/:id', (req, response) => {
  if (isNaN(req.params.id)) {
    response.status(400).json({ msj: "El id debe ser numerico" });
    return;
  }
  const id = Number(req.params.id);
  const serieEncontrada = series.find((serie) => serie.id === id);

  if (serieEncontrada) {
    response.status(200).json(serieEncontrada);
  } else {
    response.status(404).json({ msg: `el id ${id} no se encuentra.` });
  }
});

///// eliminar por id

app.delete('/series/:id', (req, response) => {
  if (isNaN(req.params.id)) {
    response.status(400).json({ msj: "El id debe ser numerico" });
    return;
  }
  const id = Number(req.params.id);
  const indice = series.findIndex((serie) => serie.id === id);

  if (indice === -1) {
    response.status(404).json({ msg: `el id ${id} no se encuentra!.` });
    return;
  }

  const serieBorrada = series.splice(indice, 1);

  response.status(200).json({ msg: "serie eliminada", serie: serieBorrada[0] });
});

/// crear una nueva serie

app.post('/series', (req, response) => {
  const body = req.body;
  const maxId = series.reduce((acum, serie) => {
    return acum > serie.id ? acum : serie.id
  }, 0)
  const serie = {
    id: maxId + 1,
    ...body,
    disponible: true
  }

  series.push(serie);

  response.status(201).json(serie);
});
