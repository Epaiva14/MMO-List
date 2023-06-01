'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serial: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      short_description: {
        type: Sequelize.STRING
      },
      game_url: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      platform: {
        type: Sequelize.STRING
      },
      publisher: {
        type: Sequelize.STRING
      },
      developer: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.DATEONLY
      },
      system_os: {
        type: Sequelize.STRING
      },
      system_processor: {
        type: Sequelize.STRING
      },
      system_graphics: {
        type: Sequelize.STRING
      },
      system_storage: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('games');
  }
};