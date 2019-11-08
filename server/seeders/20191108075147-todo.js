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

    return queryInterface.bulkInsert('Todos', [{
        "id": 1,
        "title": "Shopping",
      },
      {
        "id": 2,
        "title": "Book Ticket",
      },
      {
        "id": 3,
        "title": "Pay EB bill",
      },
      {
        "id": 4,
        "title": "Transfer money",
      },
      {
        "id": 5,
        "title": "Prepare document",
      },
      {
        "id": 6,
        "title": "Call to ramesh",
      },
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