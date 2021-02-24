const express = require('express');
const env = require('dotenv');
const { Pool } = require('pg');
const { todoRouter, healthRouter } = require('./routes');

const app = express();
env.config();
app.use(express.json());
app.use('', healthRouter);
app.use('/todo', todoRouter);
app.listen(8080, () => {
  console.log('Server listening at http://localhost:8080');
});
