const express = require("express");
const db = require("./db/models");
const PORT = 3000;
const routes = require("./db/routes/index");

const app = express();

app.use(express.json());
app.use("/", routes.seriesRutas);
app.use("/", routes.temporadaRutas);
app.use("/", routes.capituloRutas);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  db.sequelize.sync();
  console.log(`la APP esta escuchando en el puerto ${PORT}...`);
});
