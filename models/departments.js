module.exports = (sequelize, DataTypes) => {
    var batch = sequelize.define('departments', {

            id:
                {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
            departmentName:
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
    return batch;
}