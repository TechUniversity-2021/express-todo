const todoRepository = require('../repository/todo.repository');
const fileUtils = require('../utils/file.utils');
const todoService = require('./todo.service');
// mockImplementation callbacks
// mockresolved promises

describe('Get todos service', () => {
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
});

describe('Get todo by id service', () => {
  it('should return a todo of given id when db execution is successful', async () => {
    const mockResponse = {
      id: 1,
      title: 'Work',
      status: 'Active',
      created_at: '3-5-8',
      updated_at: null,
    };
    jest.spyOn(todoRepository, 'getTodo').mockResolvedValue(mockResponse);
    const response = await todoService.getTodo('db', 1);
    expect(response).toStrictEqual(mockResponse);
  });

  it('should return Not Found error when id not found for get todo', async () => {
    jest.spyOn(todoRepository, 'getTodo').mockResolvedValue([]);
    const response = await todoService.getTodo('db', 169);
    expect(response).toStrictEqual([]);
  });
});

describe('Post todo service', () => {
  it('should return id when new todo is added', async () => {
    const mockResponse = [
      {
        id: 1,
      },
    ];
    jest.spyOn(todoRepository, 'createTodo').mockResolvedValue(mockResponse);
    const response = await todoService.createTodo('db', { title: 'lala', status: 'active' });
    expect(response).toStrictEqual(mockResponse);
  });
});

describe('Update todo service', () => {
  const mockResponse = [
    {
      id: 1,
    },
  ];
  it('should return Updated id when update todo is successful', async () => {
    jest.spyOn(todoRepository, 'updateTodo').mockResolvedValue(mockResponse);
    const response = await todoService.updateTodo('db', '1', { title: 'lala', status: 'active' });
    expect(response).toStrictEqual(mockResponse);
  });
});

describe('Update todo service', () => {
  const mockResponse = [
    {
      id: 1,
    },
  ];
  it('should return Updated id when update todo is successful', async () => {
    jest.spyOn(todoRepository, 'updateTodo').mockResolvedValue(mockResponse);
    const response = await todoService.updateTodo('db', '1', { title: 'lala', status: 'active' });
    expect(response).toStrictEqual(mockResponse);
  });
});

describe('Delete todo service', () => {
  const mockResponse = [
    {
      id: 1,
    },
  ];
  it('should return Deleted id when delete todo is successful', async () => {
    jest.spyOn(todoRepository, 'deleteTodo').mockResolvedValue(mockResponse);
    const response = await todoService.deleteTodo('db', '1');
    expect(response).toStrictEqual(mockResponse);
  });
});
