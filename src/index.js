/* eslint-disable no-console */
const express = require('express');
const { Pool } = require('pg');
const routes = require('./routes/index');
const { dbConfig } = require('./config/db.config.js');

const app = express();
const port = process.env.PORT || 8080;
const pool = new Pool(dbConfig);
app.use(express.json());

app.use('/todo', routes.todoRouter);
app.locals.db = pool;
app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
