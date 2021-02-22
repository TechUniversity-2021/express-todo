const Joi = require('joi');

const postTodoSchema = Joi.object({
    todo: Joi.string().required(),
    status: Joi.any().valid('Completed', 'Not completed').required(),
})

module.exports = {
    postTodoSchema
}