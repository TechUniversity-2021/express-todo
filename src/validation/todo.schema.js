const joi = require('joi');

const postTodoBodySchema = joi.object().keys({
  status: joi.string(),
  todo: joi.string().required(),
});

const updateTodoBodySchema = joi.object().keys({
  status: joi.string().required(),
  todo: joi.string(),
});

module.exports = {
  postTodoBodySchema,
  updateTodoBodySchema,
};
