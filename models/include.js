module.exports = (sequelize, DataTypes) => {
    var include = sequelize.define('include', {

            id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
            departmentId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
            batchId: {
                    type:DataTypes.INTEGER,
                    allowNull: false
                },
            Year: {
                    type:DataTypes.STRING,
                    allowNull:false,
                },
            Semester: {
                    type:DataTypes.INTEGER,
                    allowNull:false
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
    return include;
}