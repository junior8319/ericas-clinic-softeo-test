'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('attendances', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      professional_user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      appointment_hour: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      total_price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      installments_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('attendances');
  }
};
