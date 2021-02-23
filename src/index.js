const express = require('express');
const env = require('dotenv');
const { Pool } = require('pg');
const { dbConfig } = require('./constants/db.config');
const { DEFAULT_PORT } = require('./constants/config');
const { todoRouter } = require('./routes');

const app = express();
const pool = new Pool(dbConfig);

env.config();
const port = process.env.PORT || DEFAULT_PORT;

app.use(express.json());
app.locals.db = pool;
app.get('/', (req, res) => {
  res.send('Todo App!');
});
app.use('/todo', todoRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
