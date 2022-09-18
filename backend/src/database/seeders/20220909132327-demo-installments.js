'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('installments', [
      {
        attendance_id: 1,
        date: '2022-10-09',
        price: 50.00,
        status: 0,
      },
      {
        attendance_id: 1,
        date: '2022-11-09',
        price: 50.00,
        status: 0,
      },
      {
        attendance_id: 1,
        date: '2022-12-09',
        price: 50.00,
        status: 0,
      },
      {
        attendance_id: 2,
        date: '2022-10-12',
        price: 50.00,
        status: 0,
      },
      {
        attendance_id: 2,
        date: '2022-11-12',
        price: 50.00,
        status: 0,
      },
      {
        attendance_id: 2,
        date: '2022-12-12',
        price: 50.00,
        status: 0,
      },
      {
        attendance_id: 2,
        date: '2023-01-12',
        price: 50.00,
        status: 0,
      },
      {
        attendance_id: 2,
        date: '2023-02-12',
        price: 50.00,
        status: 0,
      },
      {
        attendance_id: 3,
        date: '2022-10-14',
        price: 50.00,
        status: 0,
      },
      {
        attendance_id: 3,
        date: '2022-11-14',
        price: 50.00,
        status: 0,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('installments', null, {});
  }
};
