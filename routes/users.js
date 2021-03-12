const express = require('express');
const router = express.Router();
const Users = require('../models/users');

router.get('/', async(req, res, next) => {
  //fetch all questions from db and send.
  try{
    const users = await Users.find();
    const us = {};
    users.forEach(user => {
        us[user.id] = user
    })
    res.json(us);
  }catch(err){
      res.json({error: err});
  }
  })

  module.exports = router;