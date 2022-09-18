'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('neighborhoods', [
      {
        name: 'Vila Carmem',
        city_id: 1,
      },
      {
        name: 'São João',
        city_id: 1,
      },
      {
        name: 'Itagaçaba',
        city_id: 3,
      },
      {
        name: 'González Catán',
        city_id: 4,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('neighborhoods', null, {});
  }
};
