const getTodos = async (db) => {
  const todos = await db.query('SELECT * FROM todos;');
  return todos.rows;
};

const getTodosById = async (db, id) => {
  const todos = await db.query('SELECT * FROM todos WHERE id=$1;', [id]);
  return todos.rows;
};

const postTodo = async (db, todoObj) => {
  await db.query(`INSERT INTO todos(title, status) VALUES('${todoObj.todo}','${todoObj.status};'); RETURNING *`);
  return 'New todo got added!';
};

const putTodo = async (db, todoId, todoObj) => {
  await db.query(`UPDATE todos SET title = '${todoObj.todo}', status = '${todoObj.status}' WHERE id = ${todoId}; RETURNING *`);
  return `Todo content with ${todoId} todo got updated!`;
};

const deleteTodo = async (db, todoId) => {
  await db.query(`DELETE FROM todos WHERE id = ${todoId}; RETURNING *`);
  return `Todo content with ${todoId} todo got deleted!`;
};
module.exports = {
  getTodos, getTodosById, postTodo, putTodo, deleteTodo,
};
