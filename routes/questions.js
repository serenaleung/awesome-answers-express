const express = require('express');
const router = express.Router();

const answers = require('./answers');

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

// Questions#destroy URL: /questions/:id VERB: DELETE
router.delete('/:id', function (req, res) {
  const id = req.params.id;

  Question
    .findById(id)
    .then(function (question) {return question.destroy()})
    .then(function() {res.redirect('/questions')});
})

// Questions#show URL: /questions/:id VERB: GET
// For a url `/questions/99`, the req.params object will be equal to {id: '99'}
router.get('/:id', function (req, res) {
  const id = req.params.id;

  Question
    .findById(id)
    .then(function (question) {
      return Promise.all([question,
        question.getAnswers({order: [['createdAt', 'DESC']]})])
    })
    // NEW! Array Destructuring
    // const [first, second, ...rest] = [1, 2, 3, 4, 5, 6]
    // first === 1; second === 2, rest === [3, 4, 5. 6]
    // can also be done with function arguments
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    .then(function ([question, answers]) {
      res.render('questions/show', {question: question, answers: answers})
    })
})

// URL: /questions/:questionId/answers VERB: All of them!
router.use('/:questionId/answers', answers);

module.exports = router;
