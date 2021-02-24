/* eslint-disable max-len */
const fileUtils = require('../../utils/fileUtils');
const todoService = require('../todo.services');

describe('Todo Services', () => {
  it('should return object with all todos', async () => {
    jest.spyOn(fileUtils, 'getFileData').mockResolvedValue('1|exercise|active\n2|exercise|active');

    const todo = await todoService.getTodos();
    expect(todo).toStrictEqual([
      { id: '1', todo: 'exercise', status: 'active' },
      { id: '2', todo: 'exercise', status: 'active' },
    ]);
  });

  it('should return object with specified todo id', async () => {
    jest.spyOn(todoService, 'getTodos').mockResolvedValue([
      { id: '1', todo: 'exercise', status: 'active' },
      { id: '2', todo: 'exercise', status: 'active' },
    ]);

    const todo = await todoService.getTodosById('1');
    expect(todo).toStrictEqual([
      { id: '1', todo: 'exercise', status: 'active' },
    ]);
  });

  it('should update todo with specified todo id', async () => {
    jest.spyOn(fileUtils, 'getFileData').mockResolvedValue('1|exercise|active\n2|exercise|active');
    jest
      .spyOn(fileUtils, 'writeFile')
      .mockResolvedValue('1|have breakfast|Completed\n2|break|active');
    const content = {
      todo: 'have breakfast',
      status: 'Completed',
    };
    const todo = await todoService.updateTodo('1', content);
    expect(todo).toStrictEqual('1|have breakfast|Completed\n2|break|active');
  });

  it('should create todo with specified todo id', async () => {
    const content = {
      todo: 'exercise',
      status: 'active',
    };
    jest.spyOn(fileUtils, 'appendFile').mockResolvedValue('1|exercise|active\n2|exercise|active');

    const todo = await todoService.createTodo(content);

    expect(todo).toStrictEqual('1|exercise|active\n2|exercise|active');
  });

  it('should delete a todo with specified id', async () => {
    jest.spyOn(fileUtils, 'getFileData').mockResolvedValue('1|exercise|active\n2|exercise|active');
    const mockRequest = {
      params: {
        id: 1,
      },
    };
    jest.spyOn(fileUtils, 'writeFile').mockResolvedValue('2|exercise|active');

    const todo = await todoService.deleteById(mockRequest, null);
    expect(todo).toStrictEqual('2|exercise|active');
  });
});
