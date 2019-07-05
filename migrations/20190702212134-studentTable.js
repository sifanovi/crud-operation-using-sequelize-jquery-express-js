'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('student', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
          batchId: {
              allowNull: false,
              type: Sequelize.INTEGER
          },
          studentName: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          studentDateOfBirth: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          studentAddress: {
              type: Sequelize.STRING,
              allowNull: false,

          },
          studentPhoneNumber: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          sectionName: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          createdAt: {
              allowNull: false,
              type: Sequelize.DATE
          },
          updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
          }

      })
  },

  down: (queryInterface, Sequelize) => {
   
    return queryInterface.dropTable('student')
  }
};
