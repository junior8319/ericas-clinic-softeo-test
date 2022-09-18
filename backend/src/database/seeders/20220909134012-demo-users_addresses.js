'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users_addresses', [
      {
        user_id: 1,
        public_place_id: 2,
        address_number: 180,
        type: 'residência',
      },
      {
        user_id: 2,
        public_place_id: 1,
        address_number: 1001,
        type: 'residência',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users_addresses', null, {});
  }
};
