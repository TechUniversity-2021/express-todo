const todoService = require('../todo.service');
const todoRepository = require('../../repository/todo.repository');

describe('should get todos from db', () => {
  it('should get all todos', async () => {
    const mockResult = [{
      id: 1,
      title: 'Fake Task',
      status: 'Incomplete',
      created_at: '2021-02-22T10:30:42.990Z',
      updated_at: null,
    }];
    jest.spyOn(todoRepository, 'getTodos').mockResolvedValue(mockResult);
    const result = await todoService.structureFileContent(null);
    expect(result).toEqual(mockResult);
  });
});

describe('get todo by ID', () => {
  it('should get todo', async () => {
    const mockResult = [{
      id: 1,
      title: 'Fake Task',
      status: 'Incomplete',
      created_at: '2021-02-22T10:30:42.990Z',
      updated_at: null,
    }, {
      id: 2,
      title: 'Another Fake Task',
      status: 'Complete',
      created_at: '2021-02-22T11:59:18.848Z',
      updated_at: null,
    }];
    jest.spyOn(todoRepository, 'getTodos').mockResolvedValue(mockResult);
    const result = await todoService.getTodoById(2, null);
    expect(result).toEqual(mockResult[1]);
  });
});
