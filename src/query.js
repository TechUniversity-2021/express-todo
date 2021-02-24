const { Todo } = require('./models');

const findAllTodos = async () => {
  const todo = await Todo.findAll();
  console.log('all todos: ', JSON.stringify(todo, null, 4));
};
findAllTodos();
