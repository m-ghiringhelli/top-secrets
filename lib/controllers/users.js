const { Router } = require('express');
const User = require('../models/User');
const UserService = require('../services/UserService');

module.exports = Router()
  .post('/sessions', async (req, res, next) => {
    try {
      
      const user = await UserService.create(req.body);
      console.log('user', user);
      res.json(user);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log('id', id);
      const user = await User.delete(id);
      res.json(user);
    } catch (e) {
      next(e);
    }
  });

