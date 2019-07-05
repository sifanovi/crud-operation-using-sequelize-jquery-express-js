'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

  return queryInterface.createTable('batch',{
   id:{
   allowNull:false,
   autoIncrement:true,
   primaryKey:true,
   type:Sequelize.INTEGER
   },
   batchName:{
   type:Sequelize.STRING,
   allowNull:false,
   },
   session:{
   type:Sequelize.ENUM("summer","spring","fall"),
   allowNull:false
   },
   createdAt:{
     type:Sequelize.DATE,
     allowNull:false
   }  ,
      updatedAt:{
     type:Sequelize.DATE,
     allowNull:false
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
