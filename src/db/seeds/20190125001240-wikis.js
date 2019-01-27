'use strict';

const faker = require("faker");

//#2
let wikis = [];

for(let i = 1 ; i <= 15 ; i++){
  wikis.push({
    userId: 15,
    title: faker.hacker.noun(),
    body: faker.hacker.phrase(),
    createdAt: new Date(),
    updatedAt: new Date(),
    private: false
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert("Wikis", wikis, {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete("Wikis", null, {});

  }
};
