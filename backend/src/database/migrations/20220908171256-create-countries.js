'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('countries', {
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
    
       continent: {
        type: Sequelize.STRING,
        allowNull: false,
       },
    });
    
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('countries');
  }
};
