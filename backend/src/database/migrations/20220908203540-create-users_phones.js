'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users_phones', {
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
      },
      phone_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'telephones', key: 'id' },
        onUpdate: 'CASCADE',
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('users_phones');
  }
};
