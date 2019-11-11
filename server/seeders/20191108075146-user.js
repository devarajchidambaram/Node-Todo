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
    return queryInterface.bulkInsert('Users', [{
      "name": "test",
      "email": "test@gmail.com",
      "password": "test"
    }, 
    {
      "name": "devaraj",
      "email": "devaraj@gmail.com",
      "password": "devaraj"
    },
    {
      "name": "kumar",
      "email": "kumar@gmail.com",
      "password": "test"
    },]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Users', null, {});
  }
};