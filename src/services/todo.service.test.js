/* eslint-disable max-len */
// const fileUtils = require('../utils/fileUtil');
const todoService = require('./todo.service');
const todoRepo = require('../repository/todo.repository');

describe('get todo', () => {
  it('getTodo should return with todo objects', async () => {
    const mockResponse = [{
      id: 2,
      title: 'data1',
      status: 'active',
    }];
    const spyTodoRepo = jest.spyOn(todoRepo, 'getTodos')
      .mockResolvedValue([{ id: 2, title: 'data1', status: 'active' }]);
    const getTodo = await todoService.getTodos('db');
    expect(getTodo).toStrictEqual(mockResponse);
    expect(spyTodoRepo).toHaveBeenCalledWith('db');
  });
});
describe('create todo', () => {
  it('create todo should return with todo objects', async () => {
    const mockRequest = [{
      title: 'data1',
      status: 'active',
    }];
    const spyTodoRepo = jest.spyOn(todoRepo, 'createTodos')
      .mockResolvedValue('todo created');
    const createTodo = await todoService.createNewTodo('db', mockRequest);
    expect(createTodo).toStrictEqual('todo created');
    expect(spyTodoRepo).toHaveBeenCalledWith('db', mockRequest.title, mockRequest.status);
  });
  it('create todo should return with error', async () => {
    const mockRequest = [{
      title: 'data1',
      status: 'active',
    }];
    const spyTodoRepo = jest.spyOn(todoRepo, 'createTodos')
      .mockResolvedValue('error');
    const createTodo = await todoService.createNewTodo('db', mockRequest);
    expect(createTodo).toStrictEqual('error');
    expect(spyTodoRepo).toHaveBeenCalledWith('db', mockRequest.title, mockRequest.status);
  });
});
// it('create todo should resolve with 201 status', async () => {
//   jest.spyOn(fileUtils, 'writeFile').mockResolvedValue(201);
//   const createTodo = await todoService.createNewTodo({ id: 2 });
//   expect(createTodo).toBe(201);
// });

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
// });
describe('get todo by id', () => {
  it('should return todo by id', async () => {
    const spyTodoRepo = jest.spyOn(todoRepo, 'getTodosbyId')
      .mockResolvedValue({ id: 2, todo: 'data1', status: 'active' });
    await todoService.getTodoById('db', '2');
    expect(spyTodoRepo).toHaveBeenCalledWith('db', '2');
  });
});

describe('update todo by id', () => {
  it('update todo', async () => {
    const spyTodoRepo = jest.spyOn(todoRepo, 'updateTodos')
      .mockResolvedValue({ id: '1', todo: 'data1', status: 'active' });
    await todoService.updateTodo('db', '1', 'newTodo');
    expect(spyTodoRepo).toHaveBeenCalledWith('db', '1', 'newTodo');
  });
});

describe('delete todo by id', () => {
  it('update todo', async () => {
    const spyTodoRepo = jest.spyOn(todoRepo, 'deleteTodo')
      .mockResolvedValue({ id: '1', todo: 'data1', status: 'active' });
    await todoService.deleteTodo('db', '1');
    expect(spyTodoRepo).toHaveBeenCalledWith('db', '1');
  });
});
