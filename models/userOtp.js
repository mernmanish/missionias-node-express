const {
    DataTypes
} = require('sequelize');
const sequelize =require('./index')

const UserOtp = sequelize.define('UserOtp', {
    // Model attributes are defined here
    mobile: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
     otp: {
        type: DataTypes.INTEGER(6)
    },
}, {
    tableName:'user_otps',
    createdAt:'created_at',
    updatedAt:'updated_at'
    // Other model options go here
});

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true


module.exports=UserOtp