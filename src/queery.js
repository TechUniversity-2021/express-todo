const { Todo } = require('./models');

const findAll = async () => {
  const todos = await Todo.findAll();
  console.log(JSON.stringify(todos, null, '\t'));
};
findAll();
