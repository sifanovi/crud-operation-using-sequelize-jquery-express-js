'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('takes', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
          studentId: {
              allowNull: false,
              type: Sequelize.INTEGER
          },
          courseId: {
              allowNull: false,
              type: Sequelize.INTEGER
          },
          marks: {
              allowNull: false,
              type: Sequelize.INTEGER
          },
          Grade: {
              type: Sequelize.STRING,
              allowNull: false
          },
          createdAt: {
              type: Sequelize.DATE,
              allowNull: false

          },
          updatedAt: {
              type: Sequelize.DATE,
              allowNull: false

          }


      })
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('takes');

  }
};
