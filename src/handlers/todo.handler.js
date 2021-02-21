const todoServices = require('../services/todo.services');

const todoGetHandler = async (req, res) => {
  const todoList = await todoServices.getTodos();
  res.status(200).send(todoList);
};

const todoGetByIdHandler = async (req, res) => {
  const { body } = req;
  const todoList = await todoServices.getTodos();
  const todoById = todoList.filter((todo) => (todo.id === body.id ? todo : null));
  res.status(200).send(todoById[0]);
};

const todoDeleteByIdHandler = async (req, res) => {
  const { body } = req;
  const todoList = await todoServices.getTodos();
  const updatedListOfTodos = todoList.filter((todo) => (todo.id === body.id ? null : todo));
  const todoFileList = updatedListOfTodos.map((todoObj) => {
    const temp = `${todoObj.id}|${todoObj.todo}|${todoObj.status}`;
    return temp;
  });
  const todoUpdated = todoFileList.toString().replaceAll(',', '\n');
  await todoServices.putTodos(todoUpdated);
  res.status(200).send('Deleted todo successfully');
};

const todoPostHandler = async (req, res) => {
  const { body } = req;
  const todoList = await todoServices.getTodos();
  const todoPost = `\n${parseInt(todoList[todoList.length - 1].id, 10) + 1}|${body.todo}|${body.status}`;
  await todoServices.postTodos(todoPost);
  res.status(200).send('Successfully posted!');
};

const todoPutHandler = async (req, res) => {
  const { body } = req;
  const todoList = await todoServices.getTodos();
  const todoListUpdated = todoList.map((todoObj) => {
    if (todoObj.id === body.id) {
      const updatedTodo = todoObj;
      updatedTodo.todo = body.todo;
      updatedTodo.status = body.status;
      return updatedTodo;
    }
    return todoObj;
  });

  const todoFileList = todoListUpdated.map((todoObj) => {
    const temp = `${todoObj.id}|${todoObj.todo}|${todoObj.status}`;
    return temp;
  });
  const todoPutUpdated = todoFileList.toString().replaceAll(',', '\n');
  await todoServices.putTodos(todoPutUpdated);
  res.status(200).send('Successfully updated!');
};

module.exports = {
  todoGetHandler, todoPostHandler, todoPutHandler, todoGetByIdHandler, todoDeleteByIdHandler,
};
