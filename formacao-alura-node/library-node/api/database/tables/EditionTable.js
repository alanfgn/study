const Sequelize = require("sequelize");
const instance = require("..");

const columns = {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.ENUM("paperback", "ebook", "hardcover"),
        allowNull: false,
    },
    pages: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    copies: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    book: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require("./BookTable"),
            key: "id",
        },
    },
};

const options = {
    freezeTableName: true,
    tableName: "editions",
    timestamps: true,
    version: 'version'

};

module.exports = instance.define("editions", columns, options);
