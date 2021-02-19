const express = require('express');
const env = require('dotenv');
const { DEFAULT_PORT } = require('./constants/configure');
const { todoRouter } = require('./routers');

const app = express();
env.config();
const port = process.env.PORT || DEFAULT_PORT;

const TODO_ROUTE = '/todo';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Todo App');
});

app.use(TODO_ROUTE, todoRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
