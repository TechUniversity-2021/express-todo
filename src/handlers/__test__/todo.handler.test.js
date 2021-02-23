const {
  getAllTodosHandler, createTodoHandler, updateTodoHandler,
} = require('../todo.handler');
const service = require('../../services/todo.service');

describe('getAllTodos Handler', () => {
  it('should go to getAllTodos service return response with todo data', async () => {
    const mockRequestObject = {
      app: {
        locals: {
          db: {},
        },
      },
      query: {

      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReturnObject = [{
      id: 1,
      title: 'coding',
      staus: 'active',
    }];

    jest.spyOn(service, 'getAllTodos').mockResolvedValue(mockReturnObject);

    await getAllTodosHandler(mockRequestObject, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(mockReturnObject);
  });

  it('should go to getAllTodos service and enter catch block', async () => {
    const mockRequestObject = {
      app: {
        locals: {
          db: {},
        },
      },
      query: {

      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };

    const getAllTodosServiceSpy = jest.spyOn(service, 'getAllTodos');
    getAllTodosServiceSpy.mockImplementation(() => { throw new Error('error'); });

    await getAllTodosHandler(mockRequestObject, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
  it('should go to getTodoByID service return response with todo data', async () => {
    const mockRequestObject = {
      app: {
        locals: {
          db: {},
        },
      },
      query: {
        id: 1,
      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReturnObject = [{
      id: 1,
      title: 'coding',
      staus: 'active',
    }];

    jest.spyOn(service, 'getTodoByID').mockResolvedValue(mockReturnObject);

    await getAllTodosHandler(mockRequestObject, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(mockReturnObject);
  });

  it('should go to getTodoByID service and enter catch block', async () => {
    const mockRequestObject = {
      app: {
        locals: {
          db: {},
        },
      },
      query: {
        id: 1,
      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };

    jest.spyOn(service, 'getTodoByID').mockImplementation(() => { throw new Error('error'); });

    await getAllTodosHandler(mockRequestObject, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});

describe('createTodoHandler Handler', () => {
  it('should return response with status 200 and success message', async () => {
    const MockRequest = {
      app: {
        locals: {
          db: {},
        },
      },
      body: {
      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    jest.spyOn(service, 'createTodo').mockResolvedValue();

    await createTodoHandler(MockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith('Todo created Succcessfully');
  });

  it('should go to catch block', async () => {
    const MockRequest = {
      app: {
        locals: {
          db: {},
        },
      },
      body: {
      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };

    jest.spyOn(service, 'createTodo').mockImplementation(() => { throw new Error('error'); });

    await createTodoHandler(MockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});

describe('updateTodoHandler ', () => {
  it('should return response with status 200 and success message', async () => {
    const MockRequest = {
      app: {
        locals: {
          db: {},
        },
      },
      body: {
      },
      query: {

      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    jest.spyOn(service, 'updateTodo').mockResolvedValue();

    await updateTodoHandler(MockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith('Todo updated Successfully');
  });

  it('should go to catch block', async () => {
    const MockRequest = {
      app: {
        locals: {
          db: {},
        },
      },
      body: {
      },
      query: {

      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };

    jest.spyOn(service, 'updateTodo').mockImplementation(() => { throw new Error('error'); });

    await updateTodoHandler(MockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});
