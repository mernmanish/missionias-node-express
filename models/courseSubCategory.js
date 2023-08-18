const {
    DataTypes
} = require('sequelize');
const sequelize =require('./index')
const Course = required('./course');
const CourseCategory = required('./courseSubCategory');
const CourseSubCategory = sequelize.define('CourseSubCategory', {
    // Model attributes are defined here
    course_id: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    category_id: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
}, {
    tableName:'sub_categories',
    createdAt:'created_at',
    updatedAt:'updated_at'
    // Other model options go here
});

CourseSubCategory.hasMany(Course,{foreignKey:'id', sourceKey:'course_id', as:'course' });
CourseSubCategory.hasMany(CourseCategory,{foreignKey:'id', sourceKey:'category_id', as:'category'});
// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true


module.exports=CourseSubCategory