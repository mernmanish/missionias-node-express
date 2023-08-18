const {
    DataTypes
} = require('sequelize');
const sequelize =require('./index')
const CourseType = sequelize.define('CourseType', {
    // Model attributes are defined here
    course_type: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue:1
    },
}, {
    tableName:'course_types',
    createdAt:'created_at',
    updatedAt:'updated_at'
    // Other model options go here
});

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true


module.exports=CourseType