const todoRepository = require('../repository/todo.repository');
const fileUtils = require('../utils/file.utils');
const todoService = require('./todo.service');
// mockImplementation callbacks
// mockresolved promises

describe('Todo service', () => {
  it('should return a list of todos when db execution is successful', async () => {
    const mockResponse = {
      id: 1,
      title: 'Work',
      status: 'Active',
      created_at: '3-5-8',
      updated_at: null,
    };
    jest.spyOn(todoRepository, 'getTodos').mockResolvedValue(mockResponse);
    const response = await todoService.getTodos('db');
    expect(response).toStrictEqual(mockResponse);
  });

  it('should return a todo with id when file read is successful', async () => {
    jest.spyOn(fileUtils, 'getFileData').mockResolvedValue('1|break|active\n2|break|active');
    const response = await todoService.getTodo('1');
    expect(response).toStrictEqual({ id: '1', todo: 'break', status: 'active' });
  });

  it('should return Not Found error when id not found for get todo', async () => {
    jest.spyOn(fileUtils, 'getFileData').mockResolvedValue('1|break|active\n2|break|active');
    const response = await todoService.getTodo('16');
    expect(response).toStrictEqual('Todo with given id not found');
  });

  it('should return Updated ack when create todo is successful', async () => {
    jest.spyOn(fileUtils, 'appendFile').mockResolvedValue('Updated');
    const response = await todoService.createTodo('1');
    expect(response).toStrictEqual('Updated');
  });

  it('should return Updated ack when update todo is successful', async () => {
    jest.spyOn(fileUtils, 'getFileData').mockResolvedValue('1|break|active\n2|break|active');
    jest.spyOn(fileUtils, 'updateFile').mockResolvedValue('Updated');
    const response = await todoService.updateTodo(1, '1|break|completed');
    expect(response).toStrictEqual('Updated');
  });

  it('should return Deleted ack when delete todo is successful', async () => {
    jest.spyOn(fileUtils, 'getFileData').mockResolvedValue('1|break|active\n2|break|active');
    jest.spyOn(fileUtils, 'updateFile').mockResolvedValue('Updated');
    const response = await todoService.deleteTodo(1, '1|break|completed');
    expect(response).toStrictEqual('Deleted');
  });

  it('should return Not Found error when id not found for delete todo', async () => {
    jest.spyOn(fileUtils, 'getFileData').mockResolvedValue('1|break|active\n2|break|active');
    jest.spyOn(fileUtils, 'updateFile').mockResolvedValue('Updated');
    const response = await todoService.deleteTodo(54, '1|break|completed');
    expect(response).toStrictEqual('Todo with given id not found');
  });
});
