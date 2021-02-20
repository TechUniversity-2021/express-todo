const getTodos = async (db) => {
    const todos = await db.query('SELECT * FROM todos');
    return todos.rows;
}
const getTodoById= async (db, id)=>{
    const todos =  await db.query(`SELECT title FROM todos where id=${id}`)
    return todos.rows;
}

const postTodo= async (body, db) => {
    const title=body.title;
    const status=body.status;

    await db.query(`INSERT INTO todos(title, status) VALUES('${title}' , '${status}')`);
    // const todo= await db.query(`SELECT title FROM todos where title=${title}`);
    // return todo;
}

const updateTodo = async (body, id, db) => {
    const title=body.title;
    const status=body.status;

    await db.query(`UPDATE todos SET title='${title}', status='${status}' WHERE id='${id}'`);
}

const deleteTodo=async (id, db) => {
    await db.query(`DELETE from todos WHERE id='${id}'`);
}
module.exports = {
    getTodos, getTodoById, postTodo, updateTodo, deleteTodo
}