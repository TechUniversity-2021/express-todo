const {
  getAllTodosHandler, createTodoHandler, deleteTodoHandler, updateTodoHandler,
} = require('../todo.handler');
const service = require('../../services/todo.service');

describe('getAllTodos Handler', () => {
  it('should return response with todo data', async () => {
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReturnObject = {
      id: 1,
      title: 'coding',
      staus: 'active',
    };

    const getAllTodosServiceSpy = jest.spyOn(service, 'getAllTodos');
    getAllTodosServiceSpy.mockImplementation(() => Promise.resolve(mockReturnObject));

    await getAllTodosHandler(null, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(mockReturnObject);
  });

  it('should go to catch block', async () => {
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };

    const getAllTodosServiceSpy = jest.spyOn(service, 'getAllTodos');
    getAllTodosServiceSpy.mockImplementation(() => { throw new Error('error'); });

    await getAllTodosHandler(null, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});

describe('createTodoHandler Handler', () => {
  it('should return response with status code and message', async () => {
    const MockRequest = {
      body: {},
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReturnObject = {
      status: 200,
      message: 'finish',
    };

    jest.spyOn(service, 'createTodo').mockResolvedValue(mockReturnObject);

    await createTodoHandler(MockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(mockReturnObject.status);
    expect(mockSend).toHaveBeenCalledWith(mockReturnObject.message);
  });
});

describe('updateTodoHandler Handler', () => {
  it('should return response with status code and message', async () => {
    const MockRequest = {
      body: {},
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReturnObject = {
      status: 200,
      message: 'finish',
    };

    jest.spyOn(service, 'createTodo').mockResolvedValue(mockReturnObject);

    await createTodoHandler(MockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(mockReturnObject.status);
    expect(mockSend).toHaveBeenCalledWith(mockReturnObject.message);
  });
});

describe('deleteTodos Handler', () => {
  it('should return response with todo data', async () => {
    const mockRequest = {
      query: {
        id: '1',
      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };

    jest.spyOn(service, 'deleteTodoByID').mockResolvedValue();

    await deleteTodoHandler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith('todo deleted Successfully');
  });

  it('should go to catch block', async () => {
    const mockRequest = {
      query: {
        id: '1',
      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };

    jest.spyOn(service, 'deleteTodoByID').mockImplementation(() => { throw new Error('error'); });

    await deleteTodoHandler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});

describe('updateTodos Handler', () => {
  it('should return response with todo data', async () => {
    const mockRequest = {
      query: {
        id: '1',
      },
      body: {
        title: 'watch',
        status: 'active',
      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };

    jest.spyOn(service, 'updateTodo').mockResolvedValue();

    await updateTodoHandler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith('todo updated Successfully');
  });

  it('should go to catch block', async () => {
    const mockRequest = {
      query: {
        id: '1',
      },
      body: {
        title: 'watch',
        status: 'active',
      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };

    jest.spyOn(service, 'updateTodo').mockImplementation(() => { throw new Error('error'); });

    await updateTodoHandler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});
