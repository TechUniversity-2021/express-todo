const todoBasiceServices = require('./todo.basic.service');

const updateTodo = async (id, updateData) => {
  try {
    await todoBasiceServices.getTodo(id);
    const allTodo = await todoBasiceServices.getAllTodo();
    const updatedTodoList = allTodo.map((todo) => {
      const todoCopy = todo;
      if (todoCopy.id === id) {
        todoCopy.description = updateData.description;
        todoCopy.status = updateData.status;
      }
      return todo;
    });
    const writeAllTodoPromiseArr = updatedTodoList.map((todo) => todoBasiceServices.postTodo(todo));
    return Promise.all(writeAllTodoPromiseArr);
  } catch (error) {
    let errorObject = error;
    if (!errorObject.status) {
      errorObject = {
        status: 500,
        message: 'Error in accessing file',
      };
    }
    throw errorObject;
  }
};

module.exports = {
  updateTodo,
};
