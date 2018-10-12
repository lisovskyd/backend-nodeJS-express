module.exports = function(sequelize, Sequelize) { 
  const todos = sequelize.define('todos', {
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
    }
  });
  return todos;
};