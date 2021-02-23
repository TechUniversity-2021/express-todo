const express = require('express');
const env = require('dotenv');
const { Pool } = require('pg');
const { todoRouter, healthRouter } = require('./routes');
const { dbConfig } = require('./confiq/db.config');

const app = express();
const pool = new Pool(dbConfig);
env.config();
app.use(express.json());
app.locals.db = pool;
app.use('', healthRouter);
app.use('/todo', todoRouter);
app.listen(8080, () => {
  console.log('Server listening at http://localhost:8080');
});
