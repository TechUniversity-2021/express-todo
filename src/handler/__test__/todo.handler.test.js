const todoService = require('../../services/todo.service');
const todoHandler = require('../todo.handler');

describe('TODO Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set status 200 along tasks', async () => {
    const mockResult = [
      {
        id: 4,
        title: 'Update task',
        status: 'Incomplete',
        createdAt: '2021-02-24T18:26:50.635Z',
        updatedAt: '2021-02-24T18:28:57.595Z',
      },
    ];
    const mockSend = jest.spyOn(todoService, 'getAllTodo').mockResolvedValue(mockResult);
    const mockRes = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    await todoHandler.getAllTodo(null, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(mockResult);
  });
});

describe('Create TODO', () => {
  it('should create a new todo', async () => {
    const mockSend = jest.fn();// jest.spyOn(todoService, 'addTodo').mockResolvedValue(updateMsg);
    const mockRes = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReq = { body: { title: 'New Task' } };
    jest.spyOn(todoService, 'addTodo').mockResolvedValue(1);
    await todoHandler.createTodo(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.status().send).toHaveBeenCalledWith(1);
  });
});

describe('get todo by id', () => {
  it('should set 200 status along with todo by id', async () => {
    const mockResult = [
      {
        id: 4,
        title: 'Update task',
        status: 'Incomplete',
        createdAt: '2021-02-24T18:26:50.635Z',
        updatedAt: '2021-02-24T18:28:57.595Z',
      },
    ];
    const mockSend = jest.spyOn(todoService, 'getTodoById').mockResolvedValue(mockResult);
    const mockRes = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReq = { params: { id: '1' } };
    await todoHandler.getTodoById(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(1);
    expect(mockRes.status().send).toHaveBeenCalledWith(mockResult);
  });
});
describe('update Todo', () => {
  it('should set 200 status along with todo by id', async () => {
    const mockSend = jest.spyOn(todoService, 'updateTodo').mockResolvedValue(1);
    // const mockSend = jest.fn();
    const mockRes = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReq = {
      params: { id: '1' },
      body: { title: 'Fake Task', status: 'Complete' },
    };
    await todoHandler.updateTodo(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(1, mockReq.body.title, mockReq.body.status);
  });
  it('should set 200 status along with todo by id', async () => {
    const mockSend = jest.spyOn(todoService, 'updateTodo').mockResolvedValue(0);
    // const mockSend = jest.fn();
    const mockRes = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReq = {
      params: { id: '1' },
      body: { title: 'Fake Task', status: 'Complete' },
    };
    await todoHandler.updateTodo(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockSend).toHaveBeenCalledWith(1, mockReq.body.title, mockReq.body.status);
  });
});

describe('delete Todo', () => {
  it('should set status code 200 and delete todo', async () => {
    const mockSend = jest.spyOn(todoService, 'deleteTodo').mockResolvedValue(1);
    // const mockSend = jest.fn();
    const mockRes = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReq = {
      params: { id: '1' },
    };
    await todoHandler.deleteTodo(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(1);
  });
  it('should set status code 404 and fail to delete todo', async () => {
    const mockSend = jest.spyOn(todoService, 'deleteTodo').mockResolvedValue(0);
    // const mockSend = jest.fn();
    const mockRes = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReq = {
      params: { id: '1' },
    };
    await todoHandler.deleteTodo(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    // expect(mockRes.status().send).toHaveBeenCalledWith(0);
  });
});
