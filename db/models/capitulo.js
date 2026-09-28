"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Capitulo extends Model {
    static associate(models) {
      // Pertenece a una Temporada
      Capitulo.belongsTo(models.Temporada, {
        foreignKey: "temporadaId",
        as: "temporada",
      });
    }
  }

  Capitulo.init(
    {
      nombre: DataTypes.STRING,
      disponible: DataTypes.BOOLEAN,
      temporadaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Capitulo",
    }
  );

  return Capitulo;
};
