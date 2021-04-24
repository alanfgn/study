'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Classes.hasMany(models.Registers, {
        foreignKey: "class_id"
      });
      Classes.belongsTo(models.People, {
        foreignKey: "docent_id"
      });
      Classes.belongsTo(models.Levels, {
        foreignKey: "level_id"
      });
    }
  };
  Classes.init({
    initialDate: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Classes',
  });
  return Classes;
};