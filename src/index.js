const express = require('express');
const env = require('dotenv');
const { Pool } = require('pg');
const { DEFAULT_PORT } = require('./constants/config');
const { dbConfig } = require('./config/db.config');
const { router: todoRouter } = require('./routes/todo.router');

const app = express();
env.config();
const port = process.env.PORT || DEFAULT_PORT;

const pool = new Pool(dbConfig);

app.get('/', (req, res) => {
  res.send('Todo List');
});

app.use(express.json());
app.locals.db = pool;
app.use('/todo', todoRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
