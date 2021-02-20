const parsingData = (data) => {
  if (data.length === 0) {
    return [];
  }
  const tasks = data.toString().split('\n');
  return tasks;
};

module.exports = { parsingData };
