const express = require('express');
// const env = require('dotenv');
// const { DEFAULT_PORT } = require('./constants/config');
const { Pool } = require('pg');
const { taskRouter } = require('./routes/index.js');
const { dbConfig } = require('./config/db.config');

const app = express();
const pool = new Pool(dbConfig);
// env.config();
const port = 8080;

app.use(express.json());
app.locals.db = pool;
app.use('/task', taskRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
