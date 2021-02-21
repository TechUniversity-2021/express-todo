const joi = require('joi');

const postBodySchema = joi.object().keys({
  description: joi.string().required(),
});
const updateBodySchema = joi.object().keys({
  description: joi.string().required(),
  status: joi.string().required(),
});
module.exports = {
  postBodySchema,
  updateBodySchema,

};
