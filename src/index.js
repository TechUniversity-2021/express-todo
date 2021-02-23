const express = require('express');
const env = require('dotenv');
const { Pool } = require('pg');
const { dbConfig } = require('./config/db.config');
const { DEFAULT_PORT } = require('./config/constants.config');
const { todoRouter, healthRouter } = require('./routers');

const app = express();
env.config();
const pool = new Pool(dbConfig);
const port = process.env.PORT || DEFAULT_PORT;

const TODO_ROUTE = '/todo';
const HEALTH_ROUTE = '/health';

app.use(express.json());

app.locals.db = pool;
app.use(TODO_ROUTE, todoRouter);
app.use(HEALTH_ROUTE, healthRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
