const express = require('express');
const env = require('dotenv');
const { DEFAULT_PORT } = require('./constants/config');
const { todoRouter } = require('./routes');

const app = express();
env.config();
const port = process.env.PORT || DEFAULT_PORT;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Todo App!');
});
app.use('/todo', todoRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
