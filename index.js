const express = require("express");
const db = require("./db/models");
const PORT = 3000;
const seriesRutas = require("./db/routes/serieRoutes");

const app = express();

app.use(express.json());
app.use("/", seriesRutas);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  db.sequelize.sync({ force: true });
  console.log(`la APP esta escuchando en el puerto ${PORT}...`);
});
