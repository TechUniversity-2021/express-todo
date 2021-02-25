const service = require('../services/todo.service');

const getAllTodosHandler = async (req, res) => {
  try {
    const todos = await service.getAllTodos();
    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send();
  }
};

const getTodoByIDHandler = async (req, res) => {
  try {
    const { params } = req;
    const todo = await service.getTodoByID(params.id);
    res.status(200).send(todo);
  } catch (error) {
    if (error instanceof RangeError) {
      res.status(404).send(error.message);
    } else res.status(500).send();
  }
};

const createTodoHandler = async (req, res) => {
  try {
    const { body } = req;
    const todo = await service.createTodo(body.title, body.status);
    res.status(201).send(todo);
  } catch (error) {
    res.status(500).send();
  }
};

const updateTodoHandler = async (req, res) => {
  try {
    const { body } = req;
    const { params } = req;
    const todo = await service.updateTodo(params.id, body.title, body.status);
    res.status(200).send(todo);
  } catch (error) {
    if (error instanceof RangeError) {
      res.status(404).send(error.message);
    } else res.status(500).send();
  }
};

const deleteTodoHandler = async (req, res) => {
  try {
    const { db } = req.app.locals;
    const { params } = req;
    await service.deleteTodo(db, params.id);
    res.status(200).send('Todo deleted Successfully');
  } catch (error) {
    if (error instanceof RangeError) {
      res.status(404).send(error.message);
    } else res.status(500).send();
  }
};

module.exports = {
  getAllTodosHandler, createTodoHandler, updateTodoHandler, deleteTodoHandler, getTodoByIDHandler,
};
