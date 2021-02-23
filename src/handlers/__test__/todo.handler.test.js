const {
  getAllTodosHandler, getTodoByIDHandler, createTodoHandler, updateTodoHandler, deleteTodoHandler,
} = require('../todo.handler');
const service = require('../../services/todo.service');

// -------------------- GET TODO HANDLER------------

describe('getAllTodos Handler', () => {
  it('should go to getAllTodos service return response with todo data', async () => {
    const mockRequestObject = {
      app: {
        locals: {
          db: {},
        },
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
  it('should go to catch block due to db undefined', async () => {
    const mockRequestObject = {
      app: {
        locals: {
        },
      },
      params: {
        id: 1,
      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };

    await getAllTodosHandler(mockRequestObject, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});

// -------------------- GET TODO BY ID HANDLER------------

describe(' getTodoByID Handler', () => {
  it('should go to getTodoByID service return response with todo data', async () => {
    const mockRequestObject = {
      app: {
        locals: {
          db: {},
        },
      },
      params: {
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

    await getTodoByIDHandler(mockRequestObject, mockResponse);

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
      params: {
        id: 1,
      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };

    jest.spyOn(service, 'getTodoByID').mockImplementation(() => { throw new Error('error'); });

    await getTodoByIDHandler(mockRequestObject, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });

  it('should go to catch block due to db undefined', async () => {
    const mockRequestObject = {
      app: {
        locals: {
        },
      },
      params: {
        id: 1,
      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };

    await getTodoByIDHandler(mockRequestObject, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});

// -------------------- CREATE TODO HANDLER------------

describe('createTodoHandler ', () => {
  it('should return response with status 200 and success message', async () => {
    const mockRequest = {
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

    await createTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith('Todo created Succcessfully');
  });

  it('should go to catch block', async () => {
    const mockRequest = {
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

    await createTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
  it('should go to catch block when db is undefined', async () => {
    const mockRequest = {
      app: {
        locals: {
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

    await createTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});

// -------------------- UPDATE TODO HANDLER------------

describe('updateTodoHandler ', () => {
  it('should return response with status 200 and success message', async () => {
    const mockRequest = {
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

    await updateTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith('Todo updated Successfully');
  });

  it('should go to catch block', async () => {
    const mockRequest = {
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

    await updateTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
  it('should go to catch block when db is undefined', async () => {
    const mockRequest = {
      app: {
        locals: {
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

    await updateTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});

// -------------------- DELETE TODO HANDLER------------

describe('deleteTodoHandler ', () => {
  it('should return response with status 200 and success message', async () => {
    const mockRequest = {
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
    jest.spyOn(service, 'deleteTodo').mockResolvedValue();

    await deleteTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith('Todo deleted Successfully');
  });

  it('should go to catch block', async () => {
    const mockRequest = {
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

    jest.spyOn(service, 'deleteTodo').mockImplementation(() => { throw new Error('error'); });

    await updateTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
  it('should go to catch block due to db undefined', async () => {
    const mockRequest = {
      app: {
        locals: {
        },
      },
      query: {

      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };

    jest.spyOn(service, 'deleteTodo').mockImplementation(() => { throw new Error('error'); });

    await updateTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});
