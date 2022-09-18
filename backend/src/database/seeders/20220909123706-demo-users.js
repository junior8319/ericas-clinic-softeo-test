'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Antonio Carlos Nunes da Silva Júnior',
        birth_date: '1983-08-30',
        cpf: Number('00000100234'),
        rg: Number('001112220'),
        role_id: 1,
      },
      {
        name: 'Erica Softeo',
        birth_date: '1999-01-01',
        cpf: Number('00011122233'),
        rg: Number('112233445'),
        role_id: 2,
      },
      {
        name: 'Ricardo Roberto Rasputin',
        birth_date: '1999-02-01',
        cpf: Number('33322211100'),
        rg: Number('554432210'),
        role_id: 3,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
