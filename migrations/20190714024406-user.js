'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user',{
  id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
        username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    },
    allowNull:false
  },
  password: {
    type: Sequelize.STRING,
    allowNull:false
  },
  createdAt:{
    allowNull:false,
    type:Sequelize.DATE
  },
  updatedAt:{
    allowNull:false,
    type:Sequelize.DATE
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

    return queryInterface.dropTable('user')
    /*

      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
