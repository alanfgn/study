"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Classes",
            [
                {
                    initialDate: new Date(),
                    docent_id: 3,
                    level_id: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    initialDate: new Date(),
                    docent_id: 3,
                    level_id: 2,

                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    initialDate: new Date(),
                    docent_id: 6,
                    level_id: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    initialDate: new Date(),
                    docent_id: 6,
                    level_id: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Classes", null, {});
    },
};
