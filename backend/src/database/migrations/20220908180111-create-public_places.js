'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('public_places', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      neighborhoodId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'neighborhoods', key: 'id' },
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('public_places');
  }
};
