'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('telephones', [
      {
        prefix: 3103,
        number: 2907,
        cityId: 1,
      },
      {
        prefix: 99625,
        number: 4431,
        cityId: 1,
      },
      {
        prefix: parseInt('01234'),
        number: 5678,
        cityId: 4,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('telephones', null, {});
  }
};
