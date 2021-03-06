'use strict';
const M = require('../models/index');
const Question = M.Question; //puts question model in its own model
const faker = require('faker');

// Array.from can create arrays in a variety of different ways
// using it as follows will create an array with 100 undefined elements
const questions = Array
  .from({length: 100})
  .map(function () {
    return Question.create({
      title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
      description: faker.hacker.phrase()
    })
   // we're using .catch to prevent our query from crashing
   // our program when the title is not unique
  .catch(function (error) { console.log('Duplicate Question') })
})

module.exports = {
  up: function (queryInterface, Sequelize) {
    // the up & down methods need to return a promise
    // otherwise the command `sequelize db:seed:all` won't work
  // return Question.create({title: 'Bob', description: 'Stuff'});
  return Promise.all(questions);
    // All Sequelize model methods return promises
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function (queryInterface, Sequelize) {
    // queryInterface is an object that has methods to directly
    // query our database skipping models
    // TODO: find list of queries for queryInterface
    return queryInterface.bulkDelete('Questions', null, {});

  }
};
