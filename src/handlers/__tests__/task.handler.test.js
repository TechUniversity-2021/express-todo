const fileOps = require('../task.handler');
const fileService = require('../../services/task.service');

describe('Get todos handler', () => {
  let mockSend;
  let mockResponse;
  let mockRequest;
  let mockValue;
  beforeEach(() => {
    mockSend = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),

    };
    mockRequest = {
      app: { locals: { db: 'abc' } },

    };

    mockValue = [{ title: 'abc' }];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set status code to 200', async () => {
    const spyGetTodoService = jest.spyOn(fileService, 'getTodosService').mockResolvedValue(mockValue);
    await fileOps.getTodosHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
    expect(spyGetTodoService).toHaveBeenCalledWith('abc');
  });
});

describe('get Todo by id handler', () => {
  const mockSend = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };

  const mockRequest = {
    app: { locals: { db: 'abc' } },
    params: { id: 1 },
  };

  const mockValue = [{ title: 'abc' }];

  it('should set status code to 200', async () => {
    const spyGetTodoByIdService = jest.spyOn(fileService, 'getTodoByIdService').mockResolvedValue(mockValue);
    await fileOps.getTodoByIdHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
    expect(spyGetTodoByIdService).toHaveBeenCalledWith('abc', 1);
  });
});

describe('post todo handler', () => {
  const mockSend = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };

  const mockRequest = {
    app: { locals: { db: 'abc' } },
    body: { title: 'abc', status: 'Completed' },
  };

  it('should set status code to 200', async () => {
    const spyPost = jest.spyOn(fileService, 'postTodoService').mockResolvedValue('[def]');

    await fileOps.postTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.status().send).toHaveBeenCalledWith('[def]');
    expect(spyPost).toHaveBeenCalledWith({ title: 'abc', status: 'Completed' }, 'abc');
  });
});

describe('post todo handler', () => {
  const mockSend = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };

  const mockRequest = {
    app: { locals: { db: 'abc' } },
    body: { title: 'abc', status: 'completed' },
  };

  it('should set status code to 200', async () => {
    const spyPost = jest.spyOn(fileService, 'postTodoService').mockResolvedValue('[def]');

    await fileOps.postTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.status().send).toHaveBeenCalledWith('Bad Requests');
  });
});

describe('put todo handler', () => {
  const mockSend = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };

  const mockRequest = {
    app: { locals: { db: 'abc' } },
    body: { title: 'abc', status: 'Completed' },
    params: { id: 1 },
  };

  it('should set status code to 200', async () => {
    const spyPut = jest.spyOn(fileService, 'putTodoService').mockResolvedValue('abc');

    await fileOps.putTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith('todo updated');
    expect(spyPut).toHaveBeenCalledWith({ title: 'abc', status: 'Completed' }, 1, 'abc');
  });
});

describe('put todo handler', () => {
  const mockSend = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };

  const mockRequest = {
    app: { locals: { db: 'abc' } },
    body: { title: 'abc', status: 'completed' },
    params: { id: 1 },
  };

  it('should set status code to 200', async () => {
    const spyPut = jest.spyOn(fileService, 'putTodoService').mockResolvedValue('abc');

    await fileOps.putTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.status().send).toHaveBeenCalledWith('Bad Requests');
  });
});

describe('delete todo handler', () => {
  const mockSend = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };

  const mockRequest = {
    app: { locals: { db: 'abc' } },

    params: { id: 1 },
  };

  it('should set status code to 200', async () => {
    const spyDelete = jest.spyOn(fileService, 'deleteTodoService').mockResolvedValue('abc');

    await fileOps.deleteTodoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith('todo deleted');
    expect(spyDelete).toHaveBeenCalledWith(1, 'abc');
  });
});
