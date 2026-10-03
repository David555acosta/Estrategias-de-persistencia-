'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Actor.belongsToMany(models['Serie'], {
        through: "serie_actor",
        as: "series",
      });
    }
  }
  Actor.init({
    nombre: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Actor',
  });
  return Actor;
};