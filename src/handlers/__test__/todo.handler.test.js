const {
  getAllTodosHandler, getTodoByIDHandler, createTodoHandler, updateTodoHandler, deleteTodoHandler,
} = require('../todo.handler');
const service = require('../../services/todo.service');

// -------------------- GET ALL TODOS HANDLER------------

describe('getAllTodos Handler', () => {
  let mockSend;
  let mockResponse;
  beforeEach(() => {
    mockSend = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
  });
  it('should  eturn response with todo data', async () => {
    const mockReturnObject = [{
      id: 1,
      title: 'coding',
      staus: 'active',
    },
    {
      id: 2,
      title: 'sleep',
      staus: 'active',
    }];

    jest.spyOn(service, 'getAllTodos').mockResolvedValue(mockReturnObject);

    await getAllTodosHandler(null, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(mockReturnObject);
  });

  it('should go to catch block', async () => {
    const getAllTodosServiceSpy = jest.spyOn(service, 'getAllTodos');
    getAllTodosServiceSpy.mockImplementation(() => { throw new Error('error'); });

    await getAllTodosHandler(null, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});

// -------------------- GET TODO BY ID HANDLER------------

describe(' getTodoByID Handler', () => {
  let mockSend;
  let mockResponse;
  beforeEach(() => {
    mockSend = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
  });
  it('should give response with todo data', async () => {
    const mockRequestObject = {
      params: {
        id: 1,
      },
    };
    const mockReturnObject = [{
      id: 1,
      title: 'coding',
      staus: 'active',
      createdAt: '2021-02-24T06:59:54.027Z',
      updatedAt: '2021-02-24T06:59:54.027Z',
    }];

    jest.spyOn(service, 'getTodoByID').mockResolvedValue(mockReturnObject);

    await getTodoByIDHandler(mockRequestObject, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(mockReturnObject);
  });

  it('should go to catch block return status 500', async () => {
    const mockRequestObject = {
      params: {
        id: 1,
      },
    };
    jest.spyOn(service, 'getTodoByID').mockImplementation(() => { throw new Error('error'); });

    await getTodoByIDHandler(mockRequestObject, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
  it('should go to catch blockand return status 404 with error message ', async () => {
    const mockRequestObject = {
      params: {
        id: 1,
      },
    };
    jest.spyOn(service, 'getTodoByID').mockImplementation(() => { throw new RangeError('Todo not found'); });

    await getTodoByIDHandler(mockRequestObject, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockSend).toHaveBeenCalledWith('Todo not found');
  });
});

// -------------------- CREATE TODO HANDLER------------

describe('createTodoHandler ', () => {
  let mockSend;
  let mockResponse;
  beforeEach(() => {
    mockSend = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
  });
  it('should return response with status 200 and success message', async () => {
    const mockRequest = {
      body: {
      },
    };
    const mockReturnObject = {
      id: 1,
      title: 'coding',
      staus: 'active',
      createdAt: '2021-02-24T06:59:54.027Z',
      updatedAt: '2021-02-24T06:59:54.027Z',
    };
    jest.spyOn(service, 'createTodo').mockResolvedValue(mockReturnObject);

    await createTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockSend).toHaveBeenCalledWith(mockReturnObject);
  });

  it('should go to catch block and return  with status 500', async () => {
    const mockRequest = {
      body: {
      },
    };
    jest.spyOn(service, 'createTodo').mockImplementation(() => { throw new Error('error'); });

    await createTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
});

// -------------------- UPDATE TODO HANDLER------------

describe('updateTodoHandler ', () => {
  let mockSend;
  let mockResponse;
  beforeEach(() => {
    mockSend = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
  });
  it('should return response with status 200 and success message', async () => {
    const mockRequest = {
      body: {
        title: 'drink water',
        status: 'active',
      },
      params: {
        id: 1,
      },
    };
    const mockValue = [{
      id: 1,
      title: 'drink water',
      status: 'active',
      craeted_at: '2021-02-22T10:37:11.911Z',
      updated_at: '2021-02-22T10:37:11.911Z',
    }];
    jest.spyOn(service, 'updateTodo').mockResolvedValue(mockValue);

    await updateTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(mockValue);
  });

  it('should go to catch block and return with status 500', async () => {
    const mockRequest = {
      body: {},
      params: {},
    };
    jest.spyOn(service, 'updateTodo').mockImplementation(() => { throw new Error('error'); });

    await updateTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });

  it('should go to catch block and return with status 404 and error message', async () => {
    const mockRequest = {
      body: {},
      params: {},
    };
    jest.spyOn(service, 'updateTodo').mockImplementation(() => { throw new RangeError('Todo not found'); });
    await updateTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockSend).toHaveBeenCalledWith('Todo not found');
  });
});

// -------------------- DELETE TODO HANDLER------------

describe('deleteTodoHandler ', () => {
  let mockSend;
  let mockResponse;
  beforeEach(() => {
    mockSend = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
  });
  it('should return response with status 200 and success message', async () => {
    const mockValue = '1 todo deleted';
    const mockRequest = {
      params: {
        id: 2,
      },
    };
    jest.spyOn(service, 'deleteTodo').mockResolvedValue(mockValue);
    await deleteTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(mockValue);
  });

  it('should go to catch block and return status 500', async () => {
    const mockRequest = {
      params: {
        id: 1,
      },
    };
    jest.spyOn(service, 'deleteTodo').mockImplementation(() => { throw new Error('error'); });

    await deleteTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith();
  });
  it('should go to catch block and return status 404 and error message', async () => {
    const mockRequest = {
      params: {
        id: 1,
      },
    };
    jest.spyOn(service, 'deleteTodo').mockImplementation(() => { throw new RangeError('Todo not found'); });
    await deleteTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockSend).toHaveBeenCalledWith('Todo not found');
  });
});
