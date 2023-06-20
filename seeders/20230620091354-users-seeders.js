"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "John Doe",
        profession: "Colege",
        role: "student",
        email: "jhon@doe.com",
        password: await bcrypt.hash("password", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Aku Admin",
        profession: "Manager of Start UP",
        role: "admin",
        email: "admin@doe.com",
        password: await bcrypt.hash("password", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
