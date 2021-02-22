const parsingData = (data) => {
  if (data.length === 0) {
    return [];
  }
  const tasks = data.toString().split('\n');
  if (tasks.length > 0) tasks.pop();
  return tasks;
};

module.exports = { parsingData };
