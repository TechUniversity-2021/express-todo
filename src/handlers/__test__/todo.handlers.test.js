const todosService = require('../../services/todo.services');
const todoHandler = require('../todo.handlers');

describe('Todo Handler', () => {
  it('should return with a status code 200 along with all todo objects', async () => {
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    jest.spyOn(todosService, 'getTodos').mockResolvedValue([
      { id: '1', todo: 'project work', status: 'active' },
      { id: '2', todo: 'sleep', status: 'active' },
    ]);
    await todoHandler.getTodosHandler('xyz', mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith([
      { id: '1', todo: 'project work', status: 'active' },
      { id: '2', todo: 'sleep', status: 'active' },
    ]);
  });

  it('should return with a status code 200 along with 1 todo object of given id', async () => {
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      params: {
        id: 1,
      },
    };
    jest.spyOn(todosService, 'getTodosById').mockResolvedValue([
      { id: '1', todo: 'project work', status: 'active' },

    ]);
    await todoHandler.getTodosHandlerById(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith([
      { id: '1', todo: 'project work', status: 'active' },

    ]);
  });

  it('should return with a status code 201 along with creationn of 1 todo', async () => {
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      params: {
        id: 1,
      },
    };
    jest.spyOn(todosService, 'createTodo').mockResolvedValue([
      { id: '1', todo: 'project work', status: 'active' },

    ]);
    await todoHandler.createTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith([
      { id: '1', todo: 'project work', status: 'active' },

    ]);
  });

  it('should return with a status code 200 and update todo with specific id', async () => {
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      params: {
        id: 1,
      },
    };
    jest.spyOn(todosService, 'updateTodo').mockResolvedValue([
      { id: '1', todo: 'project work', status: 'active' },

    ]);
    await todoHandler.updateTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith([
      { id: '1', todo: 'project work', status: 'active' },

    ]);
  });

  it('should return with a status code 200 and delete todo with specific id', async () => {
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      params: {
        id: 1,
      },
    };
    jest.spyOn(todosService, 'deleteById').mockResolvedValue([
      { id: '1', todo: 'project work', status: 'active' },

    ]);
    await todoHandler.deleteByIdToDoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith([
      { id: '1', todo: 'project work', status: 'active' },

    ]);
  });
});
