const express = require('express');
const routes = require('./routes/index');

const app = express();

const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.use(express.json());
app.use('/todo', routes.todoRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
