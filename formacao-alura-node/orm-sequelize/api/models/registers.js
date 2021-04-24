'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Registers.belongsTo(models.People, {
        foreignKey: "student_id",
      })
      Registers.belongsTo(models.Classes, {
        foreignKey: "class_id"
      })
    }
  };
  Registers.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Registers',
  });
  return Registers;
};