const { Router } = require('express');
const UserService = require('../services/UserService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      console.log('req.body', req.body);
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (e) {
      next(e);
    }
  });
