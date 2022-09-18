'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('telephones', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      prefix: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('telephones');
  }
};
