'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('public_places', [
      {
        type: 'Avenida',
        name: 'Tinogasta',
        neighborhoodId: 4,
      },
      {
        type: 'Rua',
        name: 'Antonio Martins Lara',
        neighborhoodId: 1,
      },
      {
        type: 'Avenida',
        name: 'José Randolfo Lorena',
        neighborhoodId: 2,
      },
      {
        type: 'Avenida',
        name: 'Luís Bittencourt',
        neighborhoodId: 3,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('public_places', null, {});
  }
};
