'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('attendances', [
      {
        customer_user_id: 1,
        professional_user_id: 2,
        date: '2022-09-09',
        appointment_hour: '15:00',
        total_price: 150.00,
        installments_quantity: 3,
      },
      {
        customer_user_id: 3,
        professional_user_id: 2,
        date: '2022-09-12',
        appointment_hour: '15:00',
        total_price: 250.00,
        installments_quantity: 5,
      },
      {
        customer_user_id: 1,
        professional_user_id: 2,
        date: '2022-09-14',
        appointment_hour: '11:00',
        total_price: 100.00,
        installments_quantity: 2,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('attendances', null, {});
  }
};
