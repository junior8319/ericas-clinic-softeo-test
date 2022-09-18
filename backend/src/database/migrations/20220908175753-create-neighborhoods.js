'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('neighborhoods', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'cities', key: 'id' },
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('neighborhoods');
  }
};
