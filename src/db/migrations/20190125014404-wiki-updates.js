'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    body: {
      type: Sequelize.STRING
    },
    private: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Wikis');

  }
};
