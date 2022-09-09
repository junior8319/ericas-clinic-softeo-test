'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('neighborhoods', [
      {
        name: 'Vila Carmem',
        cityId: 1,
      },
      {
        name: 'São João',
        cityId: 1,
      },
      {
        name: 'Itagaçaba',
        cityId: 3,
      },
      {
        name: 'González Catán',
        cityId: 4,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('neighborhoods', null, {});
  }
};
