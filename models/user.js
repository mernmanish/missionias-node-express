const {
    DataTypes, DATE
} = require('sequelize');
const sequelize =require('./index')
const User = sequelize.define('User', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    mobile	: {
        type: DataTypes.BIGINT,
        // allowNull defaults to true
    },
    image_link: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    api_token: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    fcm_token: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    password: {
        type: DataTypes.STRING,
        //allowNull:true

        // allowNull defaults to true
    },
    status: {
        type: DataTypes.ENUM,
        defaultValue:"active",
        values:['active','inactive','block']
        // allowNull defaults to true
    },
    is_login: {
        type: DataTypes.ENUM,
        defaultValue:"yes",
        values:['yes','no']
        // allowNull defaults to true
    },
    join_date:{
        type:DATE
    }

}, {
    tableName:'users',
    createdAt:'created_at',
    updatedAt:'updated_at'
    // Other model options go here
});

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true


module.exports=User