const {
  getTodoSchema,
} = require('./todo.schema');

const getTodoValidaton = (req, res, next) => {
  const { body } = req;
  const { value, error } = getTodoSchema.validate(body);
  if (error) {
    res.status(400).send('Bad Request!');
    return;
  }
  next();
};

module.exports = { getTodoValidaton };
