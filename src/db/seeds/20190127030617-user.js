'use strict';

const faker = require("faker");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync();
const hashedPassword = bcrypt.hashSync("password", salt);

let users = [];
let roles = [0,0,0,0,0,1,1,1,1,1,2,2,2,2,2]

for(let i=1; i<=20; i++){
  users.push({
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: roles[i],
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {


  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});


  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});

  }
};
