const express = require('express');
const env = require('dotenv');
const { DEFAULT_PORT } = require('./constants/config');
const { router: todoRouter } = require('./routes/todo.router');

const app = express();
env.config();
const port = process.env.PORT || DEFAULT_PORT;

app.get('/', (req, res) => {
  res.send('Todo List');
});

app.use(express.json());
app.use('/todo', todoRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
