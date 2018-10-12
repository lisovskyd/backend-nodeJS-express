const express =  require('express');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const routes = express();

const config = require('../config/config.json').development;
const models = require("../models");
const checkAuth = require('../middleware/check-auth');

// singup functionality
routes.post('/singup', async (req, res) => {
  try {
    const salt = await bCrypt.genSalt(10)
    const hashPassword = await bCrypt.hash(req.body.password, salt, null)

    const user = await models.user.create({ 
      username: req.body.username,
      password: hashPassword,
      email: req.body.email,
      salt: salt
    });
    
    return res.send({ user }) 
  } catch (err) {   
    const user = await models.user.findOne({
      where: {
        email: req.body.email
      }
    });    
    if (user.dataValues.email === req.body.email || user.dataValues.username === req.body.username) {
      res.status(400).send('Username or email already used');
    }
  } 
});

// singin functionality

routes.post('/signin', async (req, res) => {
  try {    
    const user = await models.user.findOne({
      where: {
        username: req.body.username
      }
    });
    //validate user
    await bCrypt.compare(req.body.password, user.dataValues.password, async (err, result) => {
      if (result) {
        await models.user.update(
          {last_login: Date.now()}, 
          {where: {username: req.body.username}
        });
        //Gives token if validated
        const payload = { 
          id: user.id
        };
        const jwtData = { expiresIn: '1d'};            
        const jwtAsync = promisify(jwt.sign);      
        const token = await jwtAsync(payload, config.jwtsecret, jwtData);
        res.status(200).send({ token });
      } else {
        throw new Error('incorrect password');
      }
    });
  } catch (err) {
    res.status(401).send({ err: 'Wrong username or password' });
  }
});

routes.post('/isAuthorized', checkAuth, async (req, res) => {
  try {
    const userId = `${req.user.dataValues.id}`;
    const userTodos = await models.todos.findAll({
      where: {
        userId
      }
    });

    const userTodosArr = userTodos.map(todos => {
      return {
        id: todos.dataValues.todoId, 
        value: todos.dataValues.value, 
        taskStatus: todos.dataValues.todoStatus 
      }
    });
    
    res.status(200).send({ isAuthorized: true, todos: userTodosArr });
  } catch (err) {
    res.status(403).send('Error:', err);
  }
})


module.exports = routes;