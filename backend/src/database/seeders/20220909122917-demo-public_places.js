'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('public_places', [
      {
        type: 'Avenida',
        name: 'Tinogasta',
        neighborhood_id: 4,
      },
      {
        type: 'Rua',
        name: 'Antonio Martins Lara',
        neighborhood_id: 1,
      },
      {
        type: 'Avenida',
        name: 'José Randolfo Lorena',
        neighborhood_id: 2,
      },
      {
        type: 'Avenida',
        name: 'Luís Bittencourt',
        neighborhood_id: 3,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('public_places', null, {});
  }
};
