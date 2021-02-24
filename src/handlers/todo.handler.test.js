// const { jest, expect } = require('@jest/globals');
const todoHandler = require('./todo.handler');
const todoService = require('../services/todo.service');
// anything which has await before it mock

describe('Todo handler', () => {
  it('should set a status code 200 and get todo objects', async () => {
    const mockValue = [{ title: 'sleep' }];
    const spyGetTodo = jest.spyOn(todoService, 'getTodo').mockResolvedValue(mockValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.getTodos(null, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockValue);
  });

  it('should set a status code 200 and  get todo of given id', async () => {
    const mockValue = [{ title: 'sleep' }, 2];
    const spyGetTodo = jest.spyOn(todoService, 'getTodoWithId').mockResolvedValue(mockValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      params: { id: '3' },
    };
    await todoHandler.getTodoById(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockValue);
    expect(spyGetTodo).toHaveBeenCalledWith('3');
  });

  it('should set a status code 404 when todo is not found', async () => {
    const mockValue = [];
    const spyGetTodo = jest.spyOn(todoService, 'getTodoWithId').mockResolvedValue(mockValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      params: { id: '3' },
    };
    await todoHandler.getTodoById(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith(mockValue);
    expect(spyGetTodo).toHaveBeenCalledWith('3');
  });

  it('should set a status code 200 and send created todo', async () => {
    const mockValue = [{
      id: 7,
      title: 'Water plants',
      status: 'Active',
      created_at: '2021-02-23T04:52:35.819Z',
      updated_at: null,
    }];
    const spyGetTodo = jest.spyOn(todoService, 'postTodo').mockResolvedValue(mockValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      body: {
        todo: 'Water plants',
        status: 'Active',
      },
    };
    await todoHandler.createTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith(mockValue);
    expect(spyGetTodo).toHaveBeenCalledWith({
      todo: 'Water plants',
      status: 'Active',
    });
  });

  it('should set a status code 200 and send updated todo', async () => {
    const mockValue = [{
      id: 7,
      title: 'Water terrace plants',
      status: 'Completed',
      created_at: '2021-02-23T04:52:35.819Z',
      updated_at: null,
    }];
    const spyGetTodo = jest.spyOn(todoService, 'updateTodo').mockResolvedValue(mockValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      params: { id: '7' },
      body: {
        todo: 'Water terrace plants',
        status: 'Completed',
      },
    };
    await todoHandler.updateTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockValue);
    expect(spyGetTodo).toHaveBeenCalledWith('7', {
      todo: 'Water terrace plants',
      status: 'Completed',
    });
  });

  it('should set a status code 200 and send deleted todo', async () => {
    const mockValue = [{
      id: 7,
      title: 'Water terrace plants',
      status: 'Completed',
      created_at: '2021-02-23T04:52:35.819Z',
      updated_at: null,
    }];
    const spyGetTodo = jest.spyOn(todoService, 'deleteTodoWithId').mockResolvedValue(mockValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      params: { id: '7' },
    };
    await todoHandler.deleteTodoById(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(spyGetTodo).toHaveBeenCalledWith('7');
  });

  it('should set a status code 200 and delete all  todos', async () => {
    const mockValue = [{
      id: 7,
      title: 'Water terrace plants',
      status: 'Completed',
      created_at: '2021-02-23T04:52:35.819Z',
      updated_at: null,
    }];
    jest.spyOn(todoService, 'deleteAllTodos').mockResolvedValue(mockValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.deleteTodos(null, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith(mockValue);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    // expect(spyDeleteTodos).toHaveBeenCalledWith('7');
  });
});
