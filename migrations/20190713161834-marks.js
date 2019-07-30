'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('marks', {
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
            studentId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            courseId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            teacherId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            attendance: {
                allowNull: false,
                type: Sequelize.STRING
            },
            quizMarks: {
                allowNull: false,
                type: Sequelize.STRING
            },
            finalMarks: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            total: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            grade: {
                allowNull: false,
                type: Sequelize.STRING
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
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.dropTable('marks');
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    }
};
