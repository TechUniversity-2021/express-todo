const express = require('express');
const env = require('dotenv');
const { DEFAULT_PORT } = require('./constants/configure');

const app = express();
env.config();
const port = process.env.PORT || DEFAULT_PORT;

app.get('/', (req, res) => {
  res.send('Welcome to Todo App');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
