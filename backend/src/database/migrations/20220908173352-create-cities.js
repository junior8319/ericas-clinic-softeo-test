'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cities', {
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
  
      phone_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
  
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'countries', key: 'id' },
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('cities');
  }
};
