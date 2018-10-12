module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
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
        unique: true,
      },
      password: {
        type: Sequelize.TEXT,
        required: true,
        minlength: 6,
        maxlength: 24
      },
      last_login: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
      },
      createdAt: {
        type: Sequelize.TEXT
      },
      updatedAt: {
        type: Sequelize.TEXT 
      },
      salt: {
        type: Sequelize.TEXT
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};