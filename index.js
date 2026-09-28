const express = require("express");
const db = require("./db/models");
const PORT = 3000;
const seriesRutas = require("./db/routes/serieRoutes");
const temporadasRutas = require("./db/routes/temporadaRoutes");

const app = express();

app.use(express.json());
app.use("/", seriesRutas);
app.use("/" , temporadasRutas)

app.listen(PORT, (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  db.sequelize.sync();
  console.log(`la APP esta escuchando en el puerto ${PORT}...`);
});
