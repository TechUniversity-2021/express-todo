const { readData } = require('../services/task.service');

const taskHandler = async (req, res) => {
  const data = await readData('../resources/file.txt');
  res.status(200).send(data);
};

module.exports = {
  taskHandler,
};
