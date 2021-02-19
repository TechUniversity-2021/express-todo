const todoServices = require('../services/todo.services');

const todoHandler = async(req, res) => { 
    const todoList = await todoServices.getTodos()
    res.status(200).send(todoList)
}

module.exports = {todoHandler}