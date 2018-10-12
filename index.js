const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = require('./config/config').port;
const models = require("./models");
const authRoutes = require('./routes/auth')
const todoRoutes = require('./routes/todo')

app.use(bodyParser.json());
app.use(cors());
app.use('/', authRoutes);
app.use('/', todoRoutes);

app.listen(port, () => console.log( 'Server started!' ));

models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.', `Port:${port}`);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });