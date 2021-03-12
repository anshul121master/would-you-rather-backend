var express = require('express');
var router = express.Router();
let { _getUsers, _getQuestions } = require('../_DATA');

/* GET users listing. */
router.get('/', function(req, res, next) {
    Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => res.send({
    users,
    questions
  }))
})


module.exports = router;
