"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class People extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            People.hasMany(models.Classes, {
                foreignKey: "docent_id",
            });
            People.hasMany(models.Registers, {
                foreignKey: "student_id",
                scope: { status: "andamento" },
                as: "OnGoingRegisters",
            });
        }
    }
    People.init(
        {
            name: {
                type: DataTypes.STRING,
                validate: {
                    functionValidation: (data) => {
                        if (data.length < 3)
                            throw new Error("Nome pequeno hein");
                    },
                },
            },
            active: DataTypes.BOOLEAN,
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: {
                        args: true,
                        msg: "É um campo email mamo",
                    },
                },
            },
            role: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "People",
            paranoid: true,
            defaultScope: {
                where: { active: true },
            },
            scopes: {
                all: {
                    where: {},
                },
            },
        }
    );
    return People;
};
