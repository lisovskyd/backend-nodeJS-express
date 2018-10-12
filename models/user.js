module.exports = function(sequelize, Sequelize) { 
  const user = sequelize.define('user', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.TEXT,
      minlength: 3,
      maxlength: 24,
      index: true,
      unique: true
    },
    email: {
      type: Sequelize.TEXT,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true
    },
    password: {
      type: Sequelize.TEXT,
      required: true,
      minlength: 6,
      maxlength: 64
    },
    last_login: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    salt: {
      type: Sequelize.TEXT
    }
  });
  return user;
};