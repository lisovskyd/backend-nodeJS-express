module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('todos', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.TEXT
      },
      todoId: {
        type: Sequelize.TEXT
      },
      value: {
        type: Sequelize.TEXT
      },
      todoStatus: {
        type: Sequelize.TEXT
      },
      todoIndex: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.TEXT
      },
      updatedAt: {
        type: Sequelize.TEXT 
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Todos');
  }
};