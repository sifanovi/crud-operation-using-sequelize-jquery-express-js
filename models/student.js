module.exports = (sequelize, DataTypes) => {
    var student = sequelize.define('student', {

             id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: DataTypes.INTEGER
          },
          batchId: {
              allowNull: false,
              type: DataTypes.INTEGER
          },
          studentName: {
              type: DataTypes.STRING,
              allowNull: false,
          },
          studentDateOfBirth: {
              type: DataTypes.STRING,
              allowNull: false,
          },
          studentAddress: {
              type: DataTypes.STRING,
              allowNull: false,

          },
          studentPhoneNumber: {
              type: DataTypes.STRING,
              allowNull: false,
          },
          sectionName: {
              type: DataTypes.STRING,
              allowNull: false,
          },
          createdAt: {
              allowNull: false,
              type: DataTypes.DATE
          },
          updatedAt: {
              allowNull: false,
              type: DataTypes.DATE
          }
        },
        {
            freezeTableName: true
        })
    return student;
}