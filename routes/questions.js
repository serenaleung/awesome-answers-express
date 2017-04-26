const express = require('express');
const router = express.Router();

const Question = require('../models/index').Question;
// Destructured version
// const {Question} = require('../models/index')

router.get('/', function (request, response, next){
  Question
    .findAll({order: [['createdAt', 'DESC'], ['updatedAt', 'DESC']]})   //resolving the questions so variable is questions
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

// Questions#new URL: /questions/new VERB: GET
router.get('/new', function (req, res) {
  const question = Question.build();

  res.render('questions/new', {question: question});
})

router.post('/', function (req, res) {
  // .body is a property of the request object that
  // contains all form data as a JavaScript object
  // res.send(req.body);
  // const title = req.body.title;
  // const description = req.body.description;

 const {title, description} = req.body;

 Question
 .create({title: title, description: description})
 .then(function (question) {
   res.redirect('/questions');
 })
})

router.get('/:id', function (req, res) {
  const id = req.params.id;


  Question
  .findById(id)
  .then(function (question){
    res.render('questions/show', {question: question})
  });
})

module.exports = router;
