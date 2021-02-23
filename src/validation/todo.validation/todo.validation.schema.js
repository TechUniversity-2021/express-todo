const joi = require('joi');

const postBodySchema = joi.object().keys({
  status: joi.string().valid('incomplete', 'complete'),
  description: joi.string().required(),
  id: joi.number(),
});
const updateBodySchema = joi.object().keys({
  description: joi.string().required(),
  status: joi.string().required(),
});
const getParamsSchema = joi.object().keys({
  id: joi.number(),
});

const deleteQuerySchema = joi.object().keys({
  status: joi.valid('incomplete', 'complete').required(),
});
module.exports = {
  postBodySchema,
  updateBodySchema,
  getParamsSchema,
  deleteQuerySchema,
};
