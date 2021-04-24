"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "People",
      [
        {
          name: "Alfa",
          active: 1,
          email: "alfa@email.com",
          role: "student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bravo",
          active: 1,
          email: "bravo@email.com",
          role: "student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Charlie",
          active: 1,
          email: "charlie@email.com",
          role: "docent",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Delta",
          active: 1,
          email: "delta@email.com",
          role: "student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Echo",
          active: 1,
          email: "echo@email.com",
          role: "student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Foxtrot",
          active: 0,
          email: "foxtrot@email.com",
          role: "docent",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Golf",
          active: 0,
          email: "golf@email.com",
          role: "student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hotel",
          active: 1,
          email: "hotel@email.com",
          role: "student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "India",
          active: 1,
          email: "india@email.com",
          role: "student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Juliett",
          active: 1,
          email: "juliett@email.com",
          role: "docent",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("People", null, {});
  },
};
