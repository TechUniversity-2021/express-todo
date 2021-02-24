module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Todos', [{
    title: 'tv',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Todos', null, {}),
};
