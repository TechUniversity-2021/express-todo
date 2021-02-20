const getParsedTodos = (fileData) => {
  let todosArray = fileData.toString().split('\n');
  todosArray = todosArray.filter((todo) => todo !== '');
  //   const todosObjectArray = [];
  return todosArray.map((todo) => {
    const todoData = todo.split('|');
    return {
      id: todoData[0],
      todo: todoData[1],
      status: todoData[2],

    };
  });
//   todosArray.forEach((todo) => {
//     const todoData = todo.split('|');
//     const todoObject = {};
//     // eslint-disable-next-line prefer-destructuring
//     todoObject.id = todoData[0];
//     // eslint-disable-next-line prefer-destructuring
//     todoObject.todo = todoData[1];
//     // eslint-disable-next-line prefer-destructuring
//     todoObject.status = todoData[2];
//     todosObjectArray.push(todoObject);
//   });
//   return todosObjectArray;
};

module.exports = {
  getParsedTodos,
};
