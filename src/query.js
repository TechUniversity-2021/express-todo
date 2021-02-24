const { mytodo } = require('./models');

const findAllTodos = async () => {
  const todo = await mytodo.findAll();
  console.log('all todos: ', JSON.stringify(todo, null, 4));
};
findAllTodos();
