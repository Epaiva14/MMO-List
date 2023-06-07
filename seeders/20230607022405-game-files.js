'use strict';
const axios = require('axios');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await axios.get('https://www.mmobomb.com/api1/games')
      .then(async response => {
        const games = response.data.map(g => {
          const result = {
            serial: g.serial,
            title: g.title,
            thumbnail: g.thumbnail,
            status: g.status,
            short_description: g.short_description,
            game_url: g.game_url,
            genre: g.genre,
            platform: g.platform,
            publisher: g.publisher,
            developer: g.developer,
            release_date: g.release_date,
            system_os: g.system_os,
            system_processor: g.system_processor,
            system_graphics: g.system_graphics,
            system_storage: g.system_storage,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
          return result;
        })
        console.log('all games', games)
        await queryInterface.bulkInsert('games', games, {});
      })
      .catch(err => console.log(err));
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('games', null, {});
  }
};
