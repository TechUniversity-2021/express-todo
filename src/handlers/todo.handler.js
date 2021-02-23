const service = require('../services/todo.service');

const getAllTodosHandler = async (req, res) => {
  try {
    const { db } = req.app.locals;
    const { query } = req;
    if (query.id === undefined) {
      const todos = await service.getAllTodos(db);
      res.status(200).send(todos);
    } else {
      const todo = await service.getTodoByID(db, query.id);
      res.status(200).send(todo);
    }
  } catch (error) {
    res.status(500).send();
  }
};

const createTodoHandler = async (req, res) => {
  try {
    const { body } = req;
    const { db } = req.app.locals;
    await service.createTodo(db, body.title, body.status);
    res.status(200).send('Todo created Succcessfully');
  } catch (error) {
    res.status(500).send();
  }
};

const updateTodoHandler = async (req, res) => {
  const { body } = req;
  try {
    const { db } = req.app.locals;
    await service.updateTodo(db, req.query.id, body.title, body.status);
    res.status(200).send('Todo updated Successfully');
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  getAllTodosHandler, createTodoHandler, updateTodoHandler,
};
