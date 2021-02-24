const express = require('express');
const env = require('dotenv');
const { Pool } = require('pg');
const { dbConfig } = require('./config/db.config');
const { DEFAULT_PORT } = require('./constants/config');
const { todoRouter } = require('./routes'); // no need to specify index.js

const app = express();
env.config();
const pool = new Pool(dbConfig); // to know which db to connect to
const port = process.env.PORT || DEFAULT_PORT;

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Welcome to ToDo App');
// });

app.locals.db = pool; // app contains pool object inside locals
// create custom key db

app.use('/todo', todoRouter);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});
