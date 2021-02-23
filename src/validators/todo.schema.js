const joi = require('joi');

const getTodoByIDSchema = joi.object().keys({
  id: joi.number().required(),
});

module.exports = { getTodoByIDSchema };
