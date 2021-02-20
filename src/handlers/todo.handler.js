const todoService = require('../services/todo.service')

const getTodos = async(req, res) => {
    const content =  await todoService.getTodo()
    res.status(200).send(content)
};

module.exports = { getTodos };
