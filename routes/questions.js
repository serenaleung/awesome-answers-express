const express = require('express');
const router = express.Router();

const Question = require('../models/index').Question;
// Destructured version
// const {Question} = require('../models/index')

router.get('/', function (request, response, next){
  Question
    .findAll()   //resolving the questions so variable is questions
    .then(function(questions) { // allowing us to use .then
      // the path of the template that response.render takes
      // is relative to the view/ folder by default
      response.render('questions/index', {questions: questions});
      // the second argument passed to response.render is an
      // object where all its properties will be available to
      // the rendered template as variables
    })
  // response.send('Stuff');
  // All Sequelize query methods return a promise
})

module.exports = router;
