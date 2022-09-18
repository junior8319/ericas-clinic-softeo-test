'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cities', [
      {
        name: 'Cachoeira Paulista',
        phone_code: 12,
        state: 'São Paulo',
        country_id: 1,
      },
      {
        name: 'Canas',
        phone_code: 12,
        state: 'São Paulo',
        country_id: 1,
      },
      {
        name: 'Cruzeiro',
        phone_code: 12,
        state: 'São Paulo',
        country_id: 1,
      },
      {
        name: 'Buenos Aires',
        phone_code: 11,
        state: 'Buenos Aires',
        country_id: 2,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cities', null, {});
  }
};
