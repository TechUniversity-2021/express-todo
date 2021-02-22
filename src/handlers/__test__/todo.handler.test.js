const { todoGetHandler, todoGetByIdHandler, todoDeleteByIdHandler, todoPostHandler, todoPutHandler } = require('../todo.handler');
const todoServices = require('../../services/todo.services');

describe('Todo GetHandler', () => {
  it('should set a status code of 200', async () => {
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const spyOnTodoServices = jest.spyOn(todoServices, 'getTodos');
    spyOnTodoServices.mockResolvedValue('{id: abc todo: xyz status: Completed}');
    await todoGetHandler(null, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
  it('should set response send data', async () => {
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const spyOnTodoServices = jest.spyOn(todoServices, 'getTodos');
    spyOnTodoServices.mockResolvedValue('{id: abc todo: xyz status: Completed}');
    await todoGetHandler(null, mockResponse);
    expect(mockSend).toHaveBeenCalledWith('{id: abc todo: xyz status: Completed}');
  });
});

describe('Todo GetByIdHandler', () => {
  it('should get particular todo', async () => {
    const mockSend = {
      body: {
        id: '1',
      },
    };
    const mock = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mock })),
    };
    const spyOnTodoServices = jest.spyOn(todoServices, 'getTodos');
    spyOnTodoServices.mockResolvedValue([{ id: '1', todo: 'xyz', status: 'Completed' }]);
    await todoGetByIdHandler(mockSend, mockResponse);
    expect(mock).toHaveBeenCalledWith({ id: '1', todo: 'xyz', status: 'Completed' });
  });
});

describe('Todo DeleteByIdHandler', () => {
  it('should delete todo based on ID', async () => {
    const mockSend = {
      body: {
        id: '1',
      },
    };
    const mock = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mock })),
    };
    const spyOnTodoServices = jest.spyOn(todoServices, 'getTodos');
    spyOnTodoServices.mockResolvedValue([{ id: '1', todo: 'xyz', status: 'Completed' }, { id: '2', todo: 'xyz', status: 'Completed' }, { id: '3', todo: 'xyz', status: 'Completed' }]);
    await todoDeleteByIdHandler(mockSend, mockResponse);
    expect(mock).toHaveBeenCalledWith('Deleted todo successfully');
  });
});

describe('Todo PostHandler', () => {
  it('should post todo, assign ID and save to disk', async () => {
    const mockSend = {
      body: {
        id: '1',
        todo: 'test todo activity',
        status: 'incomplete',
      },
    };
    const mock = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mock })),
    };
    const spyOnTodoServices = jest.spyOn(todoServices, 'getTodos');
    spyOnTodoServices.mockResolvedValue([{ id: '1', todo: 'xyz', status: 'Completed' }, { id: '2', todo: 'xyz', status: 'Completed' }, { id: '3', todo: 'xyz', status: 'Completed' }]);
    await todoPostHandler(mockSend, mockResponse);
    expect(mock).toHaveBeenCalledWith('Successfully posted!');
  });
});

describe('Todo PutHandler', () => {
  it('should update existing todo based on the ID', async () => {
    const mockSend = {
      body: {
        id: '1',
        todo: 'test todo activity',
        status: 'incomplete',
      },
    };
    const mock = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mock })),
    };
    const spyOnTodoServices = jest.spyOn(todoServices, 'getTodos');
    spyOnTodoServices.mockResolvedValue([{ id: '1', todo: 'xyz', status: 'Completed' }, { id: '2', todo: 'xyz', status: 'Completed' }, { id: '3', todo: 'xyz', status: 'Completed' }]);
    await todoPutHandler(mockSend, mockResponse);
    expect(mock).toHaveBeenCalledWith('Successfully updated!');
  });
});
