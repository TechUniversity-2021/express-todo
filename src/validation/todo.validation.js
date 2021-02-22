const joi = require('joi');

const todoSchema = joi.object().keys({
//   id: joi.number().required(),
  todo: joi.string().required(),
  status: joi.string().required(),
});

const todoValidator = (req, res, next) => {
  const { value, error } = todoSchema.validate(req.body);
  if (error) {
    return res.status(400);
  }
  //  todoSchema.validate(req.body);
  next();
};

module.exports = { todoValidator };
