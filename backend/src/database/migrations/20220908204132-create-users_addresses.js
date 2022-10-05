'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users_addresses', {
      address_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      address_complement: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_comp_info: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
      },
      public_place_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'public_places', key: 'id' },
        onUpdate: 'CASCADE',
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('users_addresses');
  }
};
