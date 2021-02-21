const express = require("express");
const { getTodos, createTodo, updateTodo, getTodoById, deleteTodo } = require("../handlers/todo.handler");

const todoRouter = express.Router();

todoRouter.get("/", getTodos);
todoRouter.get("/:id", getTodoById);
todoRouter.post("/", createTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);


// quoteRouter.get(`/?value=${num}`,getArrayOfQuotes);

module.exports = {
  todoRouter,
};
