"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Temporada extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Temporada.belongsTo(models.Serie, {
        foreignKey: "serieId",
        as: "serie",
      });

      Temporada.hasMany(models.Capitulo);
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
    },
  );
  return Temporada;
};
