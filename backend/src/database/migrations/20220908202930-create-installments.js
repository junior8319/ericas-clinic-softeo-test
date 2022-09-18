'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('installments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      attendance_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'attendances', key: 'id' },
        onUpdate: 'CASCADE',
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('installments');
  }
};
