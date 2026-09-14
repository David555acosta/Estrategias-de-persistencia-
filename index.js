const express = require("express");
const db = require('./db/models')

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  db.sequelize.sync({ force: true })
  console.log(`la APP esta escuchando en el puerto ${PORT}...`);
});

//////////todos

app.get('/series', async (req, response) => {
  const series = await db.Serie.findAll({})
  response.status(200).json(series)
});

////// filtrar por id

app.get('/series/:id', async (req, response) => {
  if (isNaN(req.params.id)) {
    response.status(400).json({ msj: "El id debe ser numerico" });
    return;
  }
  const id = req.params.id
  const serie = await db.Serie.findByPk(id)

  if (serie) {
    response.status(200).json(serie)
  } else {
    response.status(404).json({ msg: `el id ${id} no se encuentra.` });
  }
});



/// crear una nueva serie

app.post('/series', async (req, response) => {
  const body = req.body;
  const serie = await db.Serie.create({
    nombre: body.nombre,
    temporadas: body.temps,
    plataforma: body.plataforma,
    disponible: true
  })

  response.status(201).json(serie);
});



///// eliminar por id

app.delete('/series/:id', async (req, response) => {
  if (isNaN(req.params.id)) {
    response.status(400).json({ msj: "El id debe ser numerico" });
    return;
  }
  const id = req.params.id
  const serie = await db.Serie.findByPk(id)

  if (!serie) {
    response.status(404).json({ msg: `el id ${id} no se encuentra!.` });
    return;
  }

  await serie.destroy();
  response.status(200).json({ msg: "serie eliminada", serie: serie });
});


