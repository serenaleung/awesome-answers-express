const express = require('express');
const router = express.Router();

const Question = require('../models/index').Question;
// Destructured version
// const {Question} = require('../models/index')

router.get('/', function (request, response, next){
  Question
    .findAll()   //resolving the questions so variable is questions
    .then(function(questions) {
      response.send(questions);
    })
  // response.send('Stuff');
  // All Sequelize query methods return a promise
})

module.exports = router;
