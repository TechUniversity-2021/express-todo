const todosService = require('../../services/todo.services');
const todoHandler = require('../todo.handlers');

describe('Handler should', () => {
  it('get todos from database', async () => {
    const responseValue = {
      id: 14,
      title: 'exercise',
      status: 'Active',
      created_at: '2021-02-23T02:21:22.872Z',
      updated_at: null,

    };
    const mockRequest = {
      app: {
        locals: {
          db: 'abc',
        },
      },
    };
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),

    };
    jest.spyOn(todosService, 'getTodos').mockResolvedValue(responseValue);
    await todoHandler.getTodosHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(responseValue);
    expect(todosService.getTodos).toHaveBeenCalledWith('abc');
  });
});

describe('Get todo by id handler', () => {
  it('should return status code 200 with todo object', async () => {
    const mockRequest = {
      app: {
        locals: {
          db: 'abc',
        },
      },
      params: {
        id: 1,
      },
    };
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };

    jest.spyOn(todosService, 'getTodosById').mockResolvedValue('xyz');
    await todoHandler.getTodosHandlerById(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith('xyz');
    expect(todosService.getTodosById).toHaveBeenCalledWith('abc', 1);
  });
});

describe('delete todo by id', () => {
  it('should return status 200 and delete todo', async () => {
    const mockRequest = {
      params: {
        id: 1,
      },
      app: {
        locals:
                {
                  db: 'abc',
                },
      },
    };

    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };

    jest.spyOn(todosService, 'deleteById').mockResolvedValue('xyz');
    await todoHandler.deleteByIdToDoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith('xyz');
    expect(todosService.deleteById).toHaveBeenCalledWith('abc', 1);
  });
});

describe('delete all todos', () => {
  it('should return status 200 and delete all the todos in database', async () => {
    const mockRequest = {
      params: {
        id: 1,
      },
      app: {
        locals:
                {
                  db: 'abc',
                },
      },
    };

    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    jest.spyOn(todosService, 'deleteAll').mockResolvedValue('xyz');
    await todoHandler.deleteAllToDoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith('xyz');
    expect(todosService.deleteAll).toHaveBeenCalledWith('abc');
  });
});

describe('create a todo', () => {
  it('should return status code 200 and create a todo', async () => {
    const mockRequest = {
      body: {
        title: 'sleep',
        status: 'Active',
      },
      app: {
        locals:
                {
                  db: 'abc',
                },
      },
    };
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const responseValue = {
      id: 14,
      title: 'exercise',
      status: 'Active',
      created_at: '2021-02-23T02:21:22.872Z',
      updated_at: null,

    };
    jest.spyOn(todosService, 'createTodo').mockResolvedValue(responseValue);
    await todoHandler.createTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(responseValue);
    expect(todosService.createTodo).toHaveBeenCalledWith('abc', 'sleep', 'Active');
  });
});
describe('update a todo', () => {
  it('should return status code 200 and update a todo with object passed', async () => {
    const mockRequest = {
      body: {
        title: 'sleep',
        status: 'Active',

      },
      params: {
        id: 1,
      },
      app: {
        locals:
                {
                  db: 'abc',
                },
      },
    };
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    jest.spyOn(todosService, 'updateTodo').mockResolvedValue('xyz');
    await todoHandler.updateTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith('xyz');
    expect(todosService.updateTodo).toHaveBeenCalledWith('abc', 'sleep', 'Active', 1);
  });
});
