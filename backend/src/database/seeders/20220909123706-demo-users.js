'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Antonio Carlos Nunes da Silva Júnior',
        birthDate: '1983-08-30',
        cpf: Number('00000100234'),
        rg: Number('001112220'),
        roleId: 1,
      },
      {
        name: 'Erica Softeo',
        birthDate: '1999-01-01',
        cpf: Number('00011122233'),
        rg: Number('112233445'),
        roleId: 2,
      },
      {
        name: 'Ricardo Roberto Rasputin',
        birthDate: '1999-02-01',
        cpf: Number('33322211100'),
        rg: Number('554432210'),
        roleId: 3,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
