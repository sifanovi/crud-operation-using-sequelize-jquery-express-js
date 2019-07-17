module.exports = (sequelize, DataTypes) => {
    var batch = sequelize.define('batch', {

            id:{
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
            batchName:
                {
                    type: DataTypes.STRING,
                    allowNull: false
                },
            session:
                {
                    type: DataTypes.ENUM("summer", "spring", "fall"),
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