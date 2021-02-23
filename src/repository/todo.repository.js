const queryGetToDos = async (db) => {
  const todos = await db.query('SELECT * FROM todos');
  return todos.rows;
};

const queryGetTodoById = async (db, id) => {
  const todo = await db.query(`SELECT * FROM todos WHERE id=${id}`);
  return todo.rows;
};

const queryCreateToDo = async (db, body) => {
  // console.log('hey');
  const { title } = body;
  const { status } = body;
  // console.log(body);
  const todo = await db.query(`INSERT INTO todos(title, status) VALUES('${title}', '${status}') RETURNING *`);
  // console.log(todo.rows);
  return todo.rows;
};

const queryUpdateToDo = async (db, body, id) => {
  // console.log('hey');
  const { title } = body;
  const { status } = body;
  // console.log(body);
  const todo = await db.query(`UPDATE todos SET title='${title}', status='${status}' WHERE id=${id} RETURNING *`);
  return todo.rows;
};

const queryDeleteToDoById = async (db, id) => {
  // console.log(body);
  const todo = await db.query(`DELETE FROM todos WHERE id=${id} RETURNING *`);
  return todo.rows;
};

module.exports = {
  queryGetToDos,
  queryGetTodoById,
  queryCreateToDo,
  queryUpdateToDo,
  queryDeleteToDoById,
};
