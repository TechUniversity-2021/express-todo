const todoService = require('../../services/todo.service');
const todoHandler = require('../todo.handler');

describe('TODO Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set status 200 along tasks', async () => {
    const result = [{ id: '1', status: 'Complete', todo: 'Task1' }, { id: '2', status: 'Incomplete', todo: 'Task2' }];
    const mockSend = jest.spyOn(todoService, 'getAllTodo').mockResolvedValue(result);
    const mockRes = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReq = {
      app: {
        locals: {
          db: 'abc',
        },
      },
    };
    await todoHandler.getAllTodo(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(result);
  });
});

describe('Create TODO', () => {
  it('should create a new todo', async () => {
    const updateMsg = 'Todo list Updated';
    const mockSend = jest.spyOn(todoService, 'addTodo').mockResolvedValue(updateMsg);
    const mockRes = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReq = {
      body: {
        todo: 'New Task',
      },
      app: {
        locals: {
          db: 'abc',
        },
      },
    };
    jest.spyOn(todoService, 'addTodo').mockResolvedValue(1);
    const result = await todoHandler.createTodo(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(updateMsg);
  });
});

describe('get todo by id', () => {
  it('should set 200 status along with todo by id', async () => {
    const mockResult = {
      id: 1,
      title: 'Fake Task',
      status: 'Incomplete',
      created_at: '2021-02-22T10:30:42.990Z',
      updated_at: null,
    };
    const mockSend = jest.fn();
    const mock = jest.spyOn(todoService, 'getTodoById').mockResolvedValue(mockResult);
    const mockRes = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReq = {
      params: { id: '1' },
      app: { locals: { db: 'abc' } },
    };
    await todoHandler.getTodoById(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mock).toHaveBeenCalledWith('abc', 1);
    expect(mockRes.status().send).toHaveBeenCalledWith(mockResult);
  });
});
describe('update Todo', () => {
  it('should set 200 status along with todo by id', async () => {
    const mock = jest.spyOn(todoService, 'updateTodo').mockResolvedValue(1);
    const mockSend = jest.fn();
    const mockRes = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReq = {
      params: { id: '1' },
      body: { todo: 'Fake Task', status: 'Complete' },
      app: { locals: { db: 'abc' } },
    };
    await todoHandler.updateTodo(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mock).toHaveBeenCalledWith('abc', 1, mockReq.body);
  });
});
describe('delete Todo', () => {
  it('should set 200 status along with todo by id', async () => {
    const mock = jest.spyOn(todoService, 'deleteTodo').mockResolvedValue(1);
    const mockSend = jest.fn();
    const mockRes = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReq = {
      params: { id: '1' },
      app: { locals: { db: 'abc' } },
    };
    await todoHandler.deleteTodo(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mock).toHaveBeenCalledWith('abc', 1);
  });
});
