'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Antonio Carlos Nunes da Silva Júnior',
        birth_date: '1983-08-30',
        cpf: '00000100234',
        rg: '001112220',
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Erica Softeo',
        birth_date: '1999-01-01',
        cpf: '00011122233',
        rg: '112233445',
        role_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Ricardo Roberto Rasputin',
        birth_date: '1999-02-01',
        cpf: '33322211100',
        rg: '554432210',
        role_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
