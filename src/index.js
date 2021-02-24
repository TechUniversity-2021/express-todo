const express = require('express');
const { Pool } = require('pg');
// const { dbConfig } = require('./config/db.config');
const routes = require('./routes');

const app = express();
// const pool = new Pool(dbConfig);
const port = process.env.PORT || 8080;

app.use(express.json());
// app.use(logPostRequest);
// app.locals.db = pool;
app.use('/todo', routes.todoRouter);

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
