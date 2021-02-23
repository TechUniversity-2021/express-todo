const service = require('../services/todo.service');

const getAllTodosHandler = async (req, res) => {
  try {
    const tasksData = await service.getAllTodos();
    res.status(200).send(tasksData);
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
  const response = await service.updateTodo(req.query.id, body.title, body.status);
  res.status(response.status).send(response.message);
};

const deleteTodoHandler = async (req, res) => {
  try {
    const { query } = req;
    await service.deleteTodoByID(query.id);
    res.status(200).send('todo deleted Successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

module.exports = {
  getAllTodosHandler, createTodoHandler, updateTodoHandler, deleteTodoHandler,
};
