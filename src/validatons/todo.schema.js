const joi = require('joi');

const getTodoSchema = joi.object().keys({
  id: joi.number().required(),
});

module.exports = { getTodoSchema };
