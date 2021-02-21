const fileUtils = require('../utils/fileUtil');
const todoService = require('./todo.service');

describe('Todo Service', () => {
  it('getTodos should resolve with todo objects', async () => {
    const todos = todoService.getTodos('4|Follow tdd|active');
    expect(todos).toStrictEqual([{ id: '4', status: 'active', todo: 'Follow tdd' }]);
  });
  it('createNewTodos should resolve with 201 status', async () => {
    jest.spyOn(fileUtils, 'writeFile').mockResolvedValue(201);
    const createTodo = await todoService.createNewTodo({ id: 2 });
    expect(createTodo).toBe(201);
  });
  it('updateExistingTodo should resolve success', async () => {
    jest.spyOn(fileUtils, 'readFile').mockResolvedValue('abc|walk the dog|active');
    jest.spyOn(fileUtils, 'updateFile').mockResolvedValue('success');
    const createTodo = await todoService.updateExistingTodo(JSON.stringify('abc'), { todo: 'wash the car', status: 'active' });
    expect(createTodo).toBe('success');
  });
});
