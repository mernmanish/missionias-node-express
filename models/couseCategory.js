const {
    DataTypes
} = require('sequelize');
const sequelize =require('./index')
const Course = required('./course');
const CourseCategory = sequelize.define('CourseCategory', {
    // Model attributes are defined here
    course_id: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    remarks: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
}, {
    tableName:'categories',
    createdAt:'created_at',
    updatedAt:'updated_at'
    // Other model options go here
});
CourseCategory.hasMany(Course,{foreignKey:'id', sourceKey:'course_id', as:'course' });

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true


module.exports=CourseCategory