/* eslint-disable max-len */
const fileUtils = require('../utils/fileUtil');
const todoService = require('./todo.service');
const todoRepo = require('../repository/todo.repository');

describe('Todo Service', () => {
  // it('getTodos should resolve with todo objects', async () => {
  //   const todos = todoService.getTodos('4|Follow tdd|active');
  //   expect(todos).toStrictEqual([{ id: '4', status: 'active', todo: 'Follow tdd' }]);
  // });
  it('create todo should resolve with 201 status', async () => {
    jest.spyOn(fileUtils, 'writeFile').mockResolvedValue(201);
    const createTodo = await todoService.createNewTodo({ id: 2 });
    expect(createTodo).toBe(201);
  });
  // it('update todo should resolve with success', async () => {
  //   jest.spyOn(fileUtils, 'readFile').mockResolvedValue('abc|walk the dog|active');
  //   jest.spyOn(fileUtils, 'updateFile').mockResolvedValue('success');
  //   const updateTodo = await todoService.updateTodo(JSON.stringify('abc'), { todo: 'wash the car', status: 'active' });
  //   expect(updateTodo).toBe('success');
  // });
  // it('delete todo should resolve with success', async () => {
  //   jest.spyOn(fileUtils, 'readFile').mockResolvedValue('abc|walk the dog|active');
  //   jest.spyOn(fileUtils, 'updateFile').mockResolvedValue('success');
  //   const deleteTodo = await todoService.deleteTodo('123');
  //   expect(deleteTodo).toBe('success');
  // });
});
describe('get todo by id', () => {
  it('should return todo by id', async () => {
    const spyTodoRepo = jest.spyOn(todoRepo, 'getTodosbyId')
      .mockResolvedValue({ id: 2, todo: 'data1', status: 'active' });
    await todoService.getTodoById('db', '2');
    expect(spyTodoRepo).toHaveBeenCalledWith('db', '2');
  });
});

// describe('todo database', () => {
//   // it('update todo', async () => {
//   //   jest.spyOn(todoRepo, 'updateTodos').mockResolvedValue({ id: '1', todo: 'data1', status: 'active' });
//   //   const todoUpdate = await todoService.updateTodo({ db: 1 }, '1', 'newTodo');

//   // });
// });
