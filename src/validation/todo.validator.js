const { postToDoBodySchema, updateToDoBodySchema } = require('./todo.schema');

const postToDoValidator = (req, res, next) => {
  const { body } = req;
  const { value, error } = postToDoBodySchema;
  if (error) {
    res.status(400).send('Bad Request!');
    return;
  }
  if (!body.status) {
    req.body.status = 'incomplete';
  }
  next();
};
