const express = require('express')
const { getTodos,createTodo } = require('../handlers/todo.handler')


const todoRouter = express.Router()

todoRouter.get('/', getTodos);
todoRouter.post('/', createTodo)

// quoteRouter.get(`/?value=${num}`,getArrayOfQuotes);


module.exports = { 
    todoRouter 
};