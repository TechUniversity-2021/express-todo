/* eslint-disable no-await-in-loop */
const { Sequelize, DataTypes } = require('sequelize');
const prompt = require('prompt-sync')();

// const sequelize = new Sequelize('postgres://anjali_nair:null@localhost:5432/todos')

const sequelize = new Sequelize('todos', 'anjali_nair', '', {
  host: 'localhost',
  dialect: 'postgres',
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const Todo = sequelize.define('todos', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
  },
}, {
  freezeTableName: true,
});

// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

// const todo = Todo.build({ title: 'Sleep well', status: 'Active' });
// console.log(todo instanceof Todo);
// console.log(todo.title);

// const saveData = async () => {
//   await todo.save();
//   console.log('Todo was saved to the database!');
// };
// saveData();

const addTodo = async (title, status) => {
  const todo = await Todo.create({ title, status });
  console.log(todo.toJSON());
};

const readTodos = async () => {
  const todos = await Todo.findAll();
  console.log(JSON.stringify(todos, null, 2));
};

const menu = async () => {
  let option = 0;
  while (option !== '3') {
    option = prompt('Give your option \n1. To read db\n2. Insert Data\n3. Exit');
    if (option === '2') {
      const title = prompt('Enter title: ');
      const status = prompt('Enter status: ');
      await addTodo(title, status);
    } else if (option === '1') {
      await readTodos();
    } else if (option === '3') {
      console.log('Exiting');
    } else {
      console.log('Option not valid');
    }
  }
};
menu();
