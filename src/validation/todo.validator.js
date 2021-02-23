const {
  postTodoBodySchema,
  updateTodoBodySchema,
} = require('./todo.schema');

const postTodoValidator = (req, res, next) => {
  const { body } = req;
  const { value, error } = postTodoBodySchema.validate(body);
  if (error) {
    res.status(400).send();
    return;
  }
  next();
};

const updateTodoValidator = (req, res, next) => {
  const { body } = req;
  const { value, error } = updateTodoBodySchema.validate(body);
  if (error) {
    res.status(400).send();
    return;
  }
  next();
};

module.exports = { postTodoValidator, updateTodoValidator };
