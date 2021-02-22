/* eslint-disable no-unused-vars */
const { postBodySchema, updateBodySchema } = require('./todo.validation.schema');

const postValidator = (req, res, next) => {
  const { body } = req;
  const { value, error } = postBodySchema.validate(body);
  if (error) {
    res.status(400).send('Bad Request!');
    return;
  }
  next();
};
const updateValidator = (req, res, next) => {
  const { body } = req;
  const { value, error } = updateBodySchema.validate(body);
  if (error) {
    res.status(400).send('Bad Request!');
  }
  next();
};

module.exports = {
  postValidator,
  updateValidator,
};
