module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('todos', [{
    title: 'eat pizza',
    status: 'Active',

    createdAt: new Date(),
    updatedAt: new Date(),
  }]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('todos', null, {}),
};
