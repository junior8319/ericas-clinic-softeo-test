'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'Paciente',
        type: 'cliente',
      },
      {
        name: 'Dentista',
        type: 'profissional',
      },
      {
        name: 'Recepcionista',
        type: 'profissional',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
