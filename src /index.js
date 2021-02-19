const express = require('express');
// const env = require('dotenv');
// const { DEFAULT_PORT } = require('./constants/config');
const { taskRouter } = require('./routes/task.route');

const app = express();
// env.config();
const port = 8080;


app.use(express.json());

app.use('/task', taskRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
