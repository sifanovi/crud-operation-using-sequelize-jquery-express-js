module.exports = (sequelize, DataTypes) => {
    var batch = sequelize.define('course', {

            id:
                {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
            courseName:
                {
                    type: DataTypes.STRING,
                    allowNull: false
                },
            courseNumber:
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
