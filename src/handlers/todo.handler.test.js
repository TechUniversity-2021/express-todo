const todoService = require('../services/todo.service');
const todoHandler = require('./todo.handler');

describe('Get Todos handler', () => {
  it('should return a status code of 200 along with todo objects', async () => {
    const mockResponseValue = {
      id: 1,
      title: 'Work',
      status: 'Active',
      created_at: '3-5-8',
      updated_at: null,
    };
    jest.spyOn(todoService, 'getTodos').mockResolvedValue(mockResponseValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.getTodos({ app: { locals: 'db' } }, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockResponseValue);
  });
});

describe('Get Todo By Id handler', () => {
  it('should return a status code of 200 along with todo object', async () => {
    const mockResponseValue = {
      id: 1,
      title: 'Work',
      status: 'Active',
      created_at: '3-5-8',
      updated_at: null,
    };
    jest.spyOn(todoService, 'getTodo').mockResolvedValue(mockResponseValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.getTodo({ app: { locals: 'db' }, params: 1 }, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockResponseValue);
  });
});

describe('Post Todo handler', () => {
  it('should return a status code of 200 along with id object', async () => {
    const mockResponseValue = [
      {
        id: 1,
      },
    ];
    jest.spyOn(todoService, 'createTodo').mockResolvedValue(mockResponseValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.createTodo({ app: { locals: 'db' }, params: 1, body: { todo: 'lala', status: 'active' } }, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith(mockResponseValue);
  });
});

describe('Update Todo handler', () => {
  it('should return a status code of 200 along with id object', async () => {
    const mockResponseValue = [
      {
        id: 1,
      },
    ];
    jest.spyOn(todoService, 'updateTodo').mockResolvedValue(mockResponseValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.updateTodo({ app: { locals: 'db' }, params: 1, body: { todo: 'lala', status: 'active' } }, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockResponseValue);
  });
});

describe('Delete Todo handler', () => {
  it('should return a status code of 200 along with id object', async () => {
    const mockResponseValue = [
      {
        id: 1,
      },
    ];
    jest.spyOn(todoService, 'deleteTodo').mockResolvedValue(mockResponseValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.deleteTodo({ app: { locals: 'db' }, params: 1, body: { todo: 'lala', status: 'active' } }, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockResponseValue);
  });
});
