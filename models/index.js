const {
    Sequelize
  } = require('sequelize');

  const db={
    db_name:'mission_ias',
    db_username:'root',
    db_password:''
  }
  // Option 3: Passing parameters separately (other dialects)
  const sequelize = new Sequelize(db.db_name,db.db_username,db.db_password, {
    host: 'localhost',
    logging: false,
    dialect: 'mysql'
  });
//   const sequelize = new Sequelize(db.db_name,db.db_username,db.db_password, {
//     host: '128.199.17.125',
//     logging: false,
//     dialect: 'mysql'
//   });
  try {
    sequelize.authenticate();
    console.log('Connection is up!!.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  module.exports = sequelize