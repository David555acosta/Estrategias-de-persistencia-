"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Temporada extends Model {
    static associate(models) {
      // Pertenece a una Serie
      Temporada.belongsTo(models.Serie, {
        foreignKey: "serieId",
        as: "serie",
      });

      // Relación 1:N con Capitulo
      Temporada.hasMany(models.Capitulo, {
        foreignKey: "temporadaId",
        as: "capitulos",
      });
    }
  }

  Temporada.init(
    {
      nombre: DataTypes.STRING,
      numero: DataTypes.INTEGER,
      disponible: DataTypes.BOOLEAN,
      serieId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Temporada",
    }
  );

  return Temporada;
};
