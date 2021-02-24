const {
  todoGetHandler, todoGetByIdHandler, todoDeleteByIdHandler, todoPostHandler, todoPutHandler,
} = require('../todo.handler');
const todoServices = require('../../services/todo.services');

describe('Todo GetHandler', () => {
  it('should set a status code of 200 and the response as well', async () => {
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockValue = [{ id: 'abc', todo: 'xyz', status: 'Completed' }];
    const spyOnTodoServices = jest.spyOn(todoServices, 'getTodos');
    spyOnTodoServices.mockResolvedValue(mockValue);
    await todoGetHandler(null, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
  });
});

describe('Todo GetByIdHandler', () => {
  it('should get particular todo', async () => {
    const mockSend = {
      params: {
        id: '1',
      },
    };
    const mock = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mock })),
    };
    const mockValue = { id: '1', todo: 'xyz', status: 'Completed' };
    const spyOnTodoServices = jest.spyOn(todoServices, 'getTodoById');
    spyOnTodoServices.mockResolvedValue(mockValue);
    await todoGetByIdHandler(mockSend, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
    expect(spyOnTodoServices).toHaveBeenCalledWith('1');
  });
});

describe('Todo DeleteByIdHandler', () => {
  it('should delete todo based on ID', async () => {
    const mockReq = {
      params: {
        id: '1',
      },
    };
    const mock = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mock })),
    };
    const mockValue = 'Todo content with 1 todo got deleted!';
    const spyOnTodoServices = jest.spyOn(todoServices, 'deleteTodo');
    spyOnTodoServices.mockResolvedValue(mockValue);
    await todoDeleteByIdHandler(mockReq, mockResponse);
    expect(spyOnTodoServices).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
  });
  it('should set the status code 404', async () => {
    const mockReq = {
      params: {
        id: '200',
      },
    };
    const mock = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mock })),
    };
    const spyOnTodoServices = jest.spyOn(todoServices, 'deleteTodo');
    spyOnTodoServices.mockResolvedValue([]);
    await todoDeleteByIdHandler(mockReq, mockResponse);
    expect(spyOnTodoServices).toHaveBeenCalledWith('200');
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });
});

describe('Todo PostHandler', () => {
  it('should post todo, assign ID and save to disk', async () => {
    const mockReq = {
      body: {
        todo: 'test todo activity',
        status: 'incomplete',
      },
    };
    const mock = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mock })),
    };

    const mockValue = [{ id: '1', todo: 'xyz', status: 'Completed' }, { id: '2', todo: 'xyz', status: 'Completed' }, { id: '3', todo: 'xyz', status: 'Completed' }];
    const spyOnTodoServices = jest.spyOn(todoServices, 'postTodos');
    spyOnTodoServices.mockResolvedValue(mockValue);
    await todoPostHandler(mockReq, mockResponse);
    expect(spyOnTodoServices).toHaveBeenCalledWith(mockReq.body);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
  });
});

describe('Todo PutHandler', () => {
  it('should update existing todo based on the ID', async () => {
    const mockReq = {
      body: {
        todo: 'test todo activity',
        status: 'incomplete',
      },
      params: {
        id: '1',
      },
    };
    const mock = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mock })),
    };
    const mockValue = [{ id: '1', todo: 'xyz', status: 'Completed' }];
    const spyOnTodoServices = jest.spyOn(todoServices, 'putTodos');
    spyOnTodoServices.mockResolvedValue(mockValue);
    await todoPutHandler(mockReq, mockResponse);
    expect(spyOnTodoServices).toHaveBeenCalledWith('1', mockReq.body);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
  });
});
