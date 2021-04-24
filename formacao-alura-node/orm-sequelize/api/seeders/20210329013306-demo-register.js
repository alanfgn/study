"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Registers",
            [
                {
                    student_id: 1,
                    class_id: 1,
                    status: "andamento",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    student_id: 2,
                    class_id: 1,
                    status: "andamento",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    student_id: 3,
                    class_id: 1,
                    status: "andamento",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    student_id: 4,
                    class_id: 2,
                    status: "andamento",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    student_id: 5,
                    class_id: 2,
                    status: "andamento",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    student_id: 6,
                    class_id: 2,
                    status: "andamento",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    student_id: 7,
                    class_id: 3,
                    status: "andamento",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    student_id: 8,
                    class_id: 3,
                    status: "finalizada",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    student_id: 9,
                    class_id: 4,
                    status: "finalizada",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Registers", null, {});
    },
};
