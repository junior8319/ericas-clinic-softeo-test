'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('telephones', [
      {
        prefix: 3103,
        number: 2907,
        city_id: 1,
      },
      {
        prefix: 99625,
        number: 4431,
        city_id: 1,
      },
      {
        prefix: parseInt('01234'),
        number: 5678,
        city_id: 4,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('telephones', null, {});
  }
};
