'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cities', [
      {
        name: 'Cachoeira Paulista',
        phoneCode: 12,
        state: 'São Paulo',
        countryId: 1,
      },
      {
        name: 'Canas',
        phoneCode: 12,
        state: 'São Paulo',
        countryId: 1,
      },
      {
        name: 'Cruzeiro',
        phoneCode: 12,
        state: 'São Paulo',
        countryId: 1,
      },
      {
        name: 'Buenos Aires',
        phoneCode: 11,
        state: 'Buenos Aires',
        countryId: 2,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cities', null, {});
  }
};
