const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

const routes = require("./routes");

const logPostRequest = (req, res, next) => {
  if (req.method === 'POST'){
    console.log(req.body)
  }
  next();
};

app.use(express.json());
app.use(logPostRequest)
app.use("/todo", routes.todoRouter);

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
