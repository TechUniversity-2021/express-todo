const express = require('express');
const env = require('dotenv');

const { todoRouter } = require('./routes');

const app = express();
env.config();

app.use('/todo', todoRouter);
app.listen(8080, () => {
  console.log('Server listening at http://localhost:8080');
});
