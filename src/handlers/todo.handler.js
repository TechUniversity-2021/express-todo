const service = require('../services/todo.service');

const getAllTodosHandler = async (req, res) => {
  try {
    const { db } = req.app.locals;
    const todos = await service.getAllTodos(db);
    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send();
  }
};

const createTodoHandler = async (req, res) => {
  const { body } = req;

  const response = await service.createTodo(body.title, body.status);
  res.status(response.status).send(response.message);
};

const updateTodoHandler = async (req, res) => {
  const { body } = req;
  try {
    await service.updateTodo(req.query.id, body.title, body.status);
    res.status(200).send('todo updated Successfully');
  } catch (error) {
    res.status(500).send();
  }
};

const deleteTodoHandler = async (req, res) => {
  try {
    const { query } = req;
    await service.deleteTodoByID(query.id);
    res.status(200).send('todo deleted Successfully');
  } catch (err) {
    res.status(500).send();
  }
};

module.exports = {
  getAllTodosHandler, createTodoHandler, updateTodoHandler, deleteTodoHandler,
};
