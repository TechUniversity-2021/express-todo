const express = require("express");
const { getTodos, createTodo, updateTodo, getTodoById } = require("../handlers/todo.handler");

const todoRouter = express.Router();

todoRouter.get("/", getTodos);
todoRouter.get("/:id", getTodoById);
todoRouter.post("/", createTodo);
todoRouter.put("/:id", updateTodo);



// quoteRouter.get(`/?value=${num}`,getArrayOfQuotes);

module.exports = {
  todoRouter,
};
