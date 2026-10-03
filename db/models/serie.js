"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Serie extends Model {
    static associate(models) {
      Serie.belongsToMany(models['Actor'], {
        through: "serie_actor",
        as: "actores",
      });

      // Relación 1:N con Temporada
      Serie.hasMany(models.Temporada, {
        foreignKey: "serieId",
        as: "temporadas",
      });
    }
  }

  Serie.init(
    {
      nombre: DataTypes.STRING,
      plataforma: DataTypes.STRING,
      fechaEstreno: DataTypes.DATEONLY,
      disponible: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Serie",
    },
  );

  return Serie;
};
