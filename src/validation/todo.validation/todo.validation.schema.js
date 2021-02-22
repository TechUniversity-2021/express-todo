const joi = require('joi');

const postBodySchema = joi.object().keys({
  status: joi.string(),
  description: joi.string().required(),
  id: joi.string(),
});
const updateBodySchema = joi.object().keys({
  description: joi.string().required(),
  status: joi.string().required(),
});
module.exports = {
  postBodySchema,
  updateBodySchema,

};
