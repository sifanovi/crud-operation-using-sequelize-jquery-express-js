module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('user', {

            id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
        username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    },
    allowNull:false
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false
  },
  createdAt:{
    allowNull:false,
    type:DataTypes.DATE
  },
  updatedAt:{
    allowNull:false,
    type:DataTypes.DATE
  }

 

        },
        {
            freezeTableName: true
        })
    return user;
}