const express =  require('express');
const jwt = require('jsonwebtoken');
const routes = express();

const config = require('../config/config.json').development;
const models = require("../models");
const checkAuth = require('../middleware/check-auth');
routes.use(checkAuth);

routes.post('/todos', async (req, res) => {
  try {
    const userId = `${req.user.dataValues.id}`;
    const todos = await models.todos.create({ 
      userId,
      todoId: req.body.id,
      value: req.body.value,
      todoStatus: req.body.taskStatus
    });
    res.status(200).send({ id: todos.todoId, value: todos.value, status: todos.todoStatus })
  } catch (err) {
    res.status(500).send('Error:', err);
  }
});

routes.post('/delete', async (req, res) => {
  try {
    const userId = `${req.user.dataValues.id}`;
    const usersTodo = await models.todos.findOne({
      where: {
        userId
      }
    });
    if (usersTodo) {
      models.todos.destroy({
        where: {
          todoId: `${req.body.todoId}`
        }
      })
      res.status(200).send({ todoId: req.body.todoId });
    }  
  } catch (err) {
    res.status(500).send('Error:', err);
  }
});

routes.post('/change-complete-value', async (req, res) => {
  try {
    const userId = `${req.user.dataValues.id}`;
    const usersTodo = await models.todos.findOne({
      where: {
        userId
      }
    });
    if (usersTodo) {
      models.todos.update(
        {todoStatus: req.body.value}, 
        {where: {todoId: req.body.todoId}
      });
      res.status(200).send({ todoId: req.body.todoId, value: req.body.value });
    }   
  } catch (err) {
    res.status(500).send('Error:', err);
  }
});

routes.post('/dnd-change-complete-value', async (req, res) => {
  try {
    const token = await req.headers.authorization.split(' ')[1];
    const userId = jwt.verify(token, config.jwtsecret).id;
    const usersTodo = await models.todos.findOne({
      where: {
        userId: `${userId}`
      }
    });
    if (usersTodo) {
      await models.todos.update(
        {todoStatus: req.body.value}, 
        {where: {todoId: req.body.todoId}
      });

      const userTodos = await models.todos.findAll({
        where: {
          userId: `${userId}`
        }
      });
      const userTodosArr = await userTodos.map(todos => {
        return {
          id: todos.dataValues.todoId, 
          value: todos.dataValues.value, 
          taskStatus: todos.dataValues.todoStatus 
        }
      });

      res.status(200).send({ userTodosArr });
    }   
  } catch (err) {
    res.status(500).send('Error:', err);
  }
});

module.exports = routes;