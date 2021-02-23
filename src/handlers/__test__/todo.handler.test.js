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
    const mockReq = {
      app: { locals: { db: 'db' } },
    };
    const mockValue = [{ id: 'abc', todo: 'xyz', status: 'Completed' }];
    const spyOnTodoServices = jest.spyOn(todoServices, 'getTodos');
    spyOnTodoServices.mockResolvedValue(mockValue);
    await todoGetHandler(mockReq, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
    expect(spyOnTodoServices).toHaveBeenCalledWith('db');
  });
  // it('should set response send data', async () => {
  //   const mockSend = jest.fn();
  //   const mockResponse = {
  //     status: jest.fn(() => ({ send: mockSend })),
  //   };
  //   const spyOnTodoServices = jest.spyOn(todoServices, 'getTodos');
  //   spyOnTodoServices.mockResolvedValue('{id: abc todo: xyz status: Completed}');
  //   await todoGetHandler(mockReq, mockResponse);
  //   expect(mockSend).toHaveBeenCalledWith('{id: abc todo: xyz status: Completed}');
  // });
});

describe('Todo GetByIdHandler', () => {
  it('should get particular todo', async () => {
    const mockSend = {
      params: {
        id: '1',
      },
      app: {
        locals: { db: 'db' },
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
    expect(spyOnTodoServices).toHaveBeenCalledWith('db', '1');
  });
});

describe('Todo DeleteByIdHandler', () => {
  it('should delete todo based on ID', async () => {
    const mockReq = {
      params: {
        id: '1',
      },
      app: {
        locals: { db: 'db' },
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
    expect(spyOnTodoServices).toHaveBeenCalledWith('db', '1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
  });
});

describe('Todo PostHandler', () => {
  it('should post todo, assign ID and save to disk', async () => {
    const mockReq = {
      body: {
        todo: 'test todo activity',
        status: 'incomplete',
      },
      app: {
        locals: { db: 'db' },
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
    expect(spyOnTodoServices).toHaveBeenCalledWith('db', mockReq.body);
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
      app: {
        locals: { db: 'db' },
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
    expect(spyOnTodoServices).toHaveBeenCalledWith('db', '1', mockReq.body);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
  });
});
