'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('countries', [
      {
        name: 'Brasil',
        phoneCode: 55,
        continent: 'América do Sul',
      },
      {
        name: 'Argentina',
        phoneCode: 54,
        continent: 'América do Sul',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('countries', null, {});
  }
};
