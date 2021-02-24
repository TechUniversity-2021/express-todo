module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Todos', [{
    title: 'Drrink water',
    status: 'Completed',
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Todos', null, {}),
};
