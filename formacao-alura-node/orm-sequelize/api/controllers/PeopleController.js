const database = require("../models");

class PeopleController {
    static async listActivePeople(req, res) {
        try {
            const people = await database.People.findAll();
            res.status(200).json(people);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async listAllPeople(req, res) {
        try {
            const people = await database.People.scope("all").findAll();
            res.status(200).json(people);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getPerson(req, res) {
        const { id } = req.params;
        try {
            const people = await database.People.findOne({
                where: { id: id },
            });
            res.status(200).json(people);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getOnGoingRegistersPersons(req, res) {
        const { id } = req.params;
        try {
            const people = await database.People.findOne({
                where: { id: id },
            });
            res.status(200).json(await people.getOnGoingRegisters());
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async savePerson(req, res) {
        const person = req.body;
        try {
            const newPerson = await database.People.create(person);
            res.status(200).json(newPerson);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async restorePerson(req, res) {
        const { id } = req.params;
        try {
            await database.People.restore({
                where: { id: id },
            });
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async updatePerson(req, res) {
        const { id } = req.params;
        const person = req.body;
        try {
            await database.People.update(person, {
                where: { id: id },
            });
            const newPerson = await database.People.findOne({
                where: { id: id },
            });
            res.status(200).json(newPerson);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async deletePerson(req, res) {
        const { id } = req.params;
        try {
            await database.People.destroy({
                where: { id: id },
            });
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async cancelPerson(req, res) {
        const { id } = req.params;
        try {
            await database.sequelize.transaction(async (transaction) => {
                await database.People.update(
                    { active: false },
                    { where: { id: id } },
                    { transaction: transaction }
                );

                await database.Registers.update(
                    { status: "cancelado" },
                    { where: { student_id: id } },
                    { transaction: transaction }
                );
            });

            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = PeopleController;
