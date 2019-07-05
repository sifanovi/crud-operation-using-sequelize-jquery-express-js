module.exports = (sequelize, DataTypes) => {
    var takes = sequelize.define('takes', {

            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: DataTypes.INTEGER
          },
          studentId: {
              allowNull: false,
              type: DataTypes.INTEGER
          },
          courseId: {
              allowNull: false,
              type: DataTypes.INTEGER
          },
          marks: {
              allowNull: false,
              type: DataTypes.INTEGER
          },
          Grade: {
              type: DataTypes.STRING,
              allowNull: false
          },
          createdAt: {
              type: DataTypes.DATE,
              allowNull: false

          },
          updatedAt: {
              type: DataTypes.DATE,
              allowNull: false

          }

        },
        {
            freezeTableName: true
        })
    return takes;
}