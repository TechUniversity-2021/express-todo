const { readData , convertTodo} = require('../services/task.service');

const taskHandler = async (req, res) => {
    const todo=await readData('./src/resources/file.txt')
    const objRet= convertTodo(todo);
    res.status(200).send(objRet);
};

module.exports = {
  taskHandler,
};
