'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addConstraint('marks',['courseId'],{
      type:'foreign key',
      name:'courseId',
      references:{
        table:'course',
        field:'id',
      },
      onDelete:'cascade',
      onUpdate:'cascade'
     })
  },

  down: (queryInterface, Sequelize) => {

    return  queryInterface.removeConstraint('marks',['courseId'],{
      type:'foreign key',
      name:'courseId',
      references:{
        table:'course',
        field:'id',
      },
      onDelete:'cascade',
      onUpdate:'cascade'
     })
  }
};