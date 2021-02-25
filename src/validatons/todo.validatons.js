const {
  getTodoSchema, createTodoSchema, updateTodoSchema,
} = require('./todo.schema');

const getTodoValidaton = (req, res, next) => {
  const { params } = req;
  const { value, error } = getTodoSchema.validate(params);
  if (error) {
    res.status(400).send('Bad Request!');
    return;
  }
  next();
};

const createTodoValidaton = (req, res, next) => {
  const { body } = req;
  const { value, error } = createTodoSchema.validate(body);
  if (error) {
    res.status(400).send('Bad Request!');
    return;
  }
  next();
};

const updateTodoValidaton = (req, res, next) => {
  const { params, body } = req;
  const test = {
    id: params.id,
    title: body.title,
    status: body.status,
  };
  const { value, error } = updateTodoSchema.validate(test);
  if (error) {
    res.status(400).send('Bad Request!');
    return;
  }
  next();
};

module.exports = { getTodoValidaton, createTodoValidaton, updateTodoValidaton };
