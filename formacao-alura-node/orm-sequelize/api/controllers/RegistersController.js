const database = require("../models");

class RegistersController {
    static async listRegisters(req, res) {
        try {
            const registers = await database.Registers.findAll();
            res.status(200).json(registers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async listClassesRegisters(req, res) {
        const { classId } = req.params
        try {
            const registers = await database.Registers.findAndCountAll({
                where: {
                    class_id: classId
                },
                limit: 10,
                order: [['student_id','ASC']]
            });
            res.status(200).json(registers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = RegistersController;
