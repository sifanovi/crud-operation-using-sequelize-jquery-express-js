module.exports = (sequelize, DataTypes) => {
    var faculty = sequelize.define('faculty', {

            id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
            deparmentId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
            teacherName: {
                    type:DataTypes.STRING,
                    allowNull: false
                },
            address: {
                    type:DataTypes.STRING,
                    allowNull:false,
                },
            phoneNumber: {
                    type:DataTypes.STRING,
                    allowNull:false
                },
            jobDescription:
                {
                    type:DataTypes.STRING,
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
    return faculty;
}