const getAllTodo = async (db) => {
  const todos = await db.query('SELECT * FROM todos');
  return todos.rows;
};
const getTodo = async (reqId, db) => {
  const todo = await db.query(`SELECT * FROM todos WHERE id = ${reqId}`);
  return todo.rows;
};

const createTodo = async (body, db) => {
  const description = `'${body.description}'`;
  const status = `'${body.status}'`;
  const todo = await db.query(`INSERT INTO todos(description,status) VALUES(${description},${status}) RETURNING *`);
  return todo.rows;
};

const updateTodo = async (reqId, body, db) => {
  const description = `'${body.description}'`;
  const status = `'${body.status}'`;
  const todo = await db.query(`UPDATE todos SET description = ${description}, status = ${status} WHERE id = ${reqId} RETURNING *`);
  if (todo.rowCount === 0) {
    return 'Todo not found';
  }
  return todo.rows;
};

const deleteTodo = async (reqId, db) => {
  const message = await db.query(`DELETE FROM todos WHERE id = ${reqId}`);
  if (message.rowCount === 0) {
    return 'Todo not found';
  }
  return 'Success';
};
module.exports = {
  getAllTodo,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
