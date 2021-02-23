const getAllTodo = async (db) => {
  const selectAllQuery = 'SELECT * FROM todos';
  const todos = await db.query(selectAllQuery);
  return todos.rows;
};

const getTodo = async (reqId, db) => {
  const selectByIdQuery = `SELECT * FROM todos WHERE id = ${reqId}`;
  const todo = await db.query(selectByIdQuery);
  return todo.rows;
};

const createTodo = async (body, db) => {
  const insertionQuery = `INSERT INTO todos(description,status) VALUES('${body.description}','${body.status}') RETURNING *`;
  const insertedTodo = await db.query(insertionQuery);
  return insertedTodo.rows;
};

const updateTodo = async (reqId, body, db) => {
  const updationQuery = `UPDATE todos SET description = '${body.description}', status = '${body.status}' WHERE id = ${reqId} RETURNING *`;
  const updatedTodo = await db.query(updationQuery);
  if (updatedTodo.rowCount === 0) {
    return 'Todo not found';
  }
  return updatedTodo.rows;
};

const deleteTodo = async (reqId, db) => {
  const deleteByIdQuery = `DELETE FROM todos WHERE id = ${reqId}`;
  const deletedTodo = await db.query(deleteByIdQuery);
  if (deletedTodo.rowCount === 0) {
    return 'Todo not found';
  }
  return 'Success';
};
const deleteStatusTodo = async (status, db) => {
  const deleteByStatusQuery = `DELETE FROM todos WHERE status = '${status}'`;
  const deletedTodos = await db.query(deleteByStatusQuery);
  if (deletedTodos.rowCount === 0) {
    return 'Todo not found';
  }
  return 'Success';
};
const deleteAllTodo = async (db) => {
  const deleteAllQuery = 'DELETE FROM todos';
  await db.query(deleteAllQuery);
  return 'Success';
};
module.exports = {
  getAllTodo,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteStatusTodo,
  deleteAllTodo,
};
