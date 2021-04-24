const Sequelize = require("sequelize");
const instance = require("../");

const columns = {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
    },
};

const options = {
    freezeTableName: true,
    tableName: "books",
    timestamps: true,
    version: 'version'
};

module.exports = instance.define("books", columns, options);
