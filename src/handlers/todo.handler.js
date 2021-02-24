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
    res.status(500).send();
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
  const { body } = req;
  try {
    const { db } = req.app.locals;
    const { params } = req;
    await service.updateTodo(db, params.id, body.title, body.status);
    res.status(200).send('Todo updated Successfully');
  } catch (error) {
    res.status(500).send();
  }
};

const deleteTodoHandler = async (req, res) => {
  try {
    const { db } = req.app.locals;
    const { params } = req;
    await service.deleteTodo(db, params.id);
    res.status(200).send('Todo deleted Successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

module.exports = {
  getAllTodosHandler, createTodoHandler, updateTodoHandler, deleteTodoHandler, getTodoByIDHandler,
};
