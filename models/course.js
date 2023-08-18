const {
    DataTypes, DATE, BLOB
} = require('sequelize');
const sequelize =require('./index')
const CourseType = require('./courseType');
const Course = sequelize.define('Course', {
    // Model attributes are defined here
    course_type_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    image	: {
        type: DataTypes.STRING,
        // allowNull defaults to true
    },
    syllabus: {
        type: DataTypes.STRING
    },
    duration: {
        type: DataTypes.STRING
    },
    course_fee: {
        type: DataTypes.BIGINT
        // allowNull defaults to true
    },
    discount_fee: {
        type: DataTypes.BIGINT
        // allowNull defaults to true
    },
    description: {
        type: DataTypes.TEXT(BLOB),
        //allowNull:true

        // allowNull defaults to true
    },
    status: {
        type: DataTypes.INTEGER,
        // allowNull defaults to true
    },

}, {
    tableName:'courses',
    createdAt:'created_at',
    updatedAt:'updated_at'
    // Other model options go here
});

Course.hasOne(CourseType,{foreignKey:'id', sourceKey:'course_type_id', as:'type' });
// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true


module.exports=Course