module.exports = (sequelize, DataTypes) => {
    var marks = sequelize.define('marks', {
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
            studentId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            courseId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            teacherId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            attendance: {
                allowNull: false,
                type: DataTypes.STRING
            },
            quizMarks: {
                allowNull: false,
                type: DataTypes.STRING
            },
            finalMarks: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            grade: {
                allowNull: false,
                type: DataTypes.STRING
            },
            total: {
                allowNull: false,
                type: DataTypes.STRING
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
    return marks;
}