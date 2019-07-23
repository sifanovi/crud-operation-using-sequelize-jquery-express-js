module.exports = (sequelize, DataTypes) => {
    var notice = sequelize.define('notice', {

            id:{
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
            content:
                {
                    type: DataTypes.STRING,
                    allowNull: false
                },
            createdAt:
                {
                    type: DataTypes.DATE,
                    allowNull: false

                },
            updatedAt:
                {
                    type: DataTypes.DATE,
                    allowNull: false

                }


        },
        {
            freezeTableName: true
        })
    return notice;
}