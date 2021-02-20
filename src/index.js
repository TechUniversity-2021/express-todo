const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

const routes = require('./routes')

//app.use(express.json());
app.use('/todo', routes.todoRouter)

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});


