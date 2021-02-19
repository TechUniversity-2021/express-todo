const parseFileData = (fileData) => {
  const todoRawList = fileData.split('\n');
  const todoList = todoRawList.map((todo) => {
    const elements = todo.split('|');
    const todoObject = {
      id: elements[0],
      description: elements[1],
      status: elements[2],
    };
    return todoObject;
  });
  return todoList;
};

module.exports = {
  parseFileData,
};
