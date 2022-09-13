'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users_phones', [
      {
        user_id: 1,
        phone_id: 1,
        type: 'residencial',
      },
      {
        user_id: 1,
        phone_id: 2,
        type: 'celular',
      },
      {
        user_id: 2,
        phone_id: 3,
        type: 'celular',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users_phones', null, {});
  }
};
