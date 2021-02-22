const express = require('express');
const { Pool } = require('pg');
const { dbConfig } = require('./config/db.config');
const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 8080;
const pool = new Pool(dbConfig);

app.use(express.json());

app.use('/todo', routes.todoRouter);

app.locals.db = pool;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at port: ${port}`);
});
