const todoService = require('../services/todo.service');
const todoHandler = require('./todo.handler');

describe('Get Todos handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set a status code of 200 along with todo objects', async () => {
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
    await todoHandler.getTodos({ app: { locals: { db: 'abc' } } }, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockResponseValue);
    expect(todoService.getTodos).toHaveBeenCalledWith();
  });
});

describe('Get Todo By Id handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set a status code of 200 along with todo object', async () => {
    const mockResponseValue = {
      id: 1,
      title: 'Work',
      status: 'Active',
      created_at: '3-5-8',
      updated_at: null,
    };
    const mockRequest = { app: { locals: { db: 'abc' } }, params: { id: 1 } };

    jest.spyOn(todoService, 'getTodo').mockResolvedValue(mockResponseValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.getTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockResponseValue);
    expect(todoService.getTodo).toHaveBeenCalledWith(1);
  });

  // service []
  // handler "ID not found" 404
  it('should set a status code of 404 when id doesnt exist', async () => {
    const mockResponseValue = null;
    const mockRequest = { app: { locals: { db: 'abc' } }, params: { id: 130 } };

    jest.spyOn(todoService, 'getTodo').mockResolvedValue(mockResponseValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.getTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith('ID not found');
    expect(todoService.getTodo).toHaveBeenCalledWith(130);
  });
});

describe('Post Todo handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set a status code of 200 along with id object', async () => {
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
    await todoHandler.createTodo({ app: { locals: { db: 'abc' } }, params: 1, body: { todo: 'lala', status: 'active' } }, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith(mockResponseValue);
    expect(todoService.createTodo).toHaveBeenCalledWith({ todo: 'lala', status: 'active' });
  });
});

describe('Update Todo handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set a status code of 200 along with id object', async () => {
    const mockResponseValue = [
      {
        id: 1,
      },
    ];
    const mockRequest = { app: { locals: { db: 'abc' } }, params: { id: 1 }, body: { todo: 'lala', status: 'active' } };
    jest.spyOn(todoService, 'updateTodo').mockResolvedValue(mockResponseValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.updateTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockResponseValue);
    expect(todoService.updateTodo).toHaveBeenCalledWith(1, { todo: 'lala', status: 'active' });
  });

  // serrvice []
  // handler ID not found
  it('should set a status code of 404 when id doesnt exist', async () => {
    jest.spyOn(todoService, 'updateTodo').mockResolvedValue([]);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = { app: { locals: { db: 'abc' } }, params: { id: 98 }, body: { todo: 'lala', status: 'active' } };
    await todoHandler.updateTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith('ID not found');
    expect(todoService.updateTodo).toHaveBeenCalledWith(98, { todo: 'lala', status: 'active' });
  });
});

describe('Delete Todo handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set a status code of 200 along with id object', async () => {
    const mockResponseValue = [
      {
        id: 1,
      },
    ];
    const mockRequest = { app: { locals: { db: 'abc' } }, params: { id: 1 }, body: { todo: 'lala', status: 'active' } };
    jest.spyOn(todoService, 'deleteTodo').mockResolvedValue(mockResponseValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.deleteTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockResponseValue);
    expect(todoService.deleteTodo).toHaveBeenCalledWith(1);
  });

  it('should set a status code of 404 when id doesnt exist', async () => {
    jest.spyOn(todoService, 'deleteTodo').mockResolvedValue([]);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = { app: { locals: { db: 'abc' } }, params: { id: 98 }, body: { todo: 'lala', status: 'active' } };
    await todoHandler.deleteTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith('ID not found');
    expect(todoService.deleteTodo).toHaveBeenCalledWith(98);
  });
});
