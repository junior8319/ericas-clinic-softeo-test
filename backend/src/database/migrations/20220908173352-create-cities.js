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
  
      phoneCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
  
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  
      countryId: {
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
