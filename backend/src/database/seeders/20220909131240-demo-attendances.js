'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('attendances', [
      {
        customerUserId: 1,
        professionalUserId: 2,
        date: '2022-09-09',
        appointmentHour: '15:00',
        totalPrice: 150.00,
        installmentsQuantity: 3,
      },
      {
        customerUserId: 3,
        professionalUserId: 2,
        date: '2022-09-12',
        appointmentHour: '15:00',
        totalPrice: 250.00,
        installmentsQuantity: 5,
      },
      {
        customerUserId: 1,
        professionalUserId: 2,
        date: '2022-09-14',
        appointmentHour: '11:00',
        totalPrice: 100.00,
        installmentsQuantity: 2,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('attendances', null, {});
  }
};
