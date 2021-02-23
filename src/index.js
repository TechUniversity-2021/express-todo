const express = require('express');
const { Pool } = require('pg');
const { dbConfig } = require('./config/db.config');
const routes = require('./routes/index');

const app = express();

const port = process.env.PORT || 3000;
const pool = new Pool(dbConfig);
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.use(express.json());
app.locals.db = pool;
app.use('/todo', routes.todoRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
