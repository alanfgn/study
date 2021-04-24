const database = require("../models");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

class ClassesController {
    static async listClasses(req, res) {
        const { startDate, finalDate } = req.query;
        try {
            const classes = await database.Classes.findAll({
                where: {
                    initialDate: {
                        ...(startDate && { [Op.gte]: startDate }),
                        ...(finalDate && { [Op.lte]: finalDate }),
                    },
                },
            });
            res.status(200).json(classes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async listLotationClasses(req, res) {
        const { qnt } = req.query;
        try {
            const classes = await database.Registers.findAndCountAll({
                where: {
                    status: "andamento",
                },
                attributes: ["class_id"],
                group: ["class_id"],
                having: Sequelize.literal(`count(class_id) >= ${qnt || 3}`),
            });
            res.status(200).json(classes.count);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ClassesController;
