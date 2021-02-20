const express = require('express')
const { getTodos } = require('../handlers/todo.handler')


const todoRouter = express.Router()

todoRouter.get('/', getTodos);

// quoteRouter.get(`/?value=${num}`,getArrayOfQuotes);


module.exports = { 
    todoRouter 
};