'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Todos', [
      // {
      //   "id": 1,
      //   "title": "Shopping",
      //   "userId" : 1,
      // },
      // {
      //   "id": 2,
      //   "title": "Book Ticket",
      //   "userId" : 1,
      // },
      // {
      //   "id": 3,
      //   "title": "Pay EB bill",
      //   "userId" : 1,
      // },
      // {
      //   "id": 4,
      //   "title": "Transfer money",
      //   "userId" : 2,
      // },
      // {
      //   "id": 5,
      //   "title": "Prepare document",
      //   "userId" : 2,
      // },
      // {
      //   "id": 6,
      //   "title": "Call to ramesh",
      //   "userId" : 3,
      // },
      // {
      //   "id": 7,
      //   "title": "Check for report",
      //   "userId" : 3,
      // },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Todos', null, {});
  }
};