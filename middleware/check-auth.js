const jwt = require('jsonwebtoken');
const config = require('../config/config.json').development;
const utils  = require('util');
const models = require("../models");

module.exports = async (req, res, next) => {
  try {
    const token =  req.headers.authorization.split(' ')[1];
    const verify = utils.promisify(jwt.verify)

    const {id} = await verify(token, config.jwtsecret);
    const user = await models.user.findOne({
      where: {
        id
      }
    });
    req.user = user;
    next();
  } catch(e) {
    return res.status(401).send({ message: 'Auth failed:' + e })
  }
}