module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('mytodos', [{
    title: 'eat pizza',
    status: 'Active',

    createdAt: new Date(),
    updatedAt: new Date(),
  }]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('mytodos', null, {}),
};
