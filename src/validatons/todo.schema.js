const joi = require('joi');

const getTodoSchema = joi.object().keys({
  id: joi.number().required(),
});

const createTodoSchema = joi.object().keys({
  title: joi.string().required(),
  status: joi.string().required().valid('active', 'inactive').required(),
});

const updateTodoSchema = joi.object().keys({
  id: joi.number().required(),
  title: joi.string().required(),
  status: joi.string().required().valid('active', 'inactive').required(),
});

module.exports = { getTodoSchema, createTodoSchema, updateTodoSchema };
