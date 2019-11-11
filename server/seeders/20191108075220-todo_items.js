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

   return queryInterface.bulkInsert('TodoItems', [
     
    {
    "content": "Buy soap",
    "todoId": 1,
   },
   {
    "content": "Buy vegetables",
    "todoId": 1,
   },
   {
    "content": "Buy bread",
    "todoId": 1,
   },{
    "content": "chennai to bangalore",
    "todoId": 2,
   },{
    "content": "bangalore to chennai",
    "todoId": 2,
   },{
    "content": "pay 300 to eb bill id 13232",
    "todoId": 3,
   },{
    "content": "Transfer 500rs to kumar ",
    "todoId": 4,
   },{
    "content": "Transfer 1000rs to hari ",
    "todoId": 4,
   }
  ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('TodoItems', null, {});
   
  }
};
