"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Capitulo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
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
    },
  );
  return Capitulo;
};
