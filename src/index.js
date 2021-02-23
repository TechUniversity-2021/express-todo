/* eslint-disable no-console */
const express = require('express');
const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/todo', routes.todoRouter);

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
