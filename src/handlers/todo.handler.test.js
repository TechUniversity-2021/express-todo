// const { jest, expect } = require('@jest/globals');
const todoHandler = require('./todo.handler');
const todoService = require('../services/todo.service');
// anything which has await before it mock

describe('Todo handler', () => {
  it('should set a status code 200 and get todo objects', async () => {
    const mockValue = [{ title: 'sleep' }];
    const spyGetTodo = jest.spyOn(todoService, 'getTodo').mockResolvedValue(mockValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      app: { locals: { db: 'abc' } },
    };
    await todoHandler.getTodos(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockValue);
    expect(spyGetTodo).toHaveBeenCalledWith('abc');
  });
  // it('should set a status code 200 along with todo objects', async () => {
  //   jest
  //     .spyOn(todoService, 'getTodo')
  //     .mockResolvedValue([
  //       { id: '1', todo: 'break', status: 'active' },
  //       { id: '2', todo: 'break', status: 'active' },
  //     ]);
  //   const mockResponse = {
  //     status: jest.fn(() => mockResponse),
  //     send: jest.fn(),
  //   };
  //   await todoHandler.getTodos(null, mockResponse);
  //   expect(mockResponse.status).toHaveBeenCalledWith(200);
  //   expect(mockResponse.send).toHaveBeenCalledWith([
  //     { id: '1', todo: 'break', status: 'active' },
  //     { id: '2', todo: 'break', status: 'active' },
  //   ]);
  // });
  it('should set a status code 200 and  get todo of given id', async () => {
    const mockValue = [{ title: 'sleep' }, 2];
    const spyGetTodo = jest.spyOn(todoService, 'getTodoWithId').mockResolvedValue(mockValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      app: { locals: { db: 'abc' } },
      params: { id: '3' },
    };
    await todoHandler.getTodoById(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockValue);
    expect(spyGetTodo).toHaveBeenCalledWith('abc', '3');
  });
  // it('should set a status code 200 along with todo of respective id', async () => {
  //   const getTodoWithIdSpy = jest.spyOn(todoService, 'getTodoWithId').mockResolvedValue([
  //     { id: '3', todo: 'Buy 1kg rice', status: 'Active' },
  //   ]);
  //   const mockResponse = {
  //     status: jest.fn(() => mockResponse),
  //     send: jest.fn(),
  //   };
  //   const mockRequest = {
  //     params: { id: '3' },
  //   };
  //   await todoHandler.getTodoById(mockRequest, mockResponse);
  //   expect(mockResponse.status).toHaveBeenCalledWith(200);
  //   expect(getTodoWithIdSpy).toHaveBeenCalledWith('3');
  //   expect(mockResponse.send).toHaveBeenCalledWith([
  //     { id: '3', todo: 'Buy 1kg rice', status: 'Active' },
  //   ]);
  // });

  // it('should set a status code 200 along with todo of respective query', async () => {
  //   const getTodoWithQuerySpy = jest.spyOn(todoService, 'getTodoWithQuery').mockResolvedValue([
  //     { id: '3', todo: 'Buy 1kg rice', status: 'Active' },
  //   ]);
  //   const mockResponse = {
  //     status: jest.fn(() => mockResponse),
  //     send: jest.fn(),
  //   };
  //   const mockRequest = {
  //     query: { search: 'Buy 1kg rice' },
  //   };
  //   await todoHandler.getTodoByQuery(mockRequest, mockResponse);
  //   expect(mockResponse.status).toHaveBeenCalledWith(200);
  //   expect(getTodoWithQuerySpy).toHaveBeenCalledWith('Buy 1kg rice');
  //   expect(mockResponse.send).toHaveBeenCalledWith([
  //     { id: '3', todo: 'Buy 1kg rice', status: 'Active' },
  //   ]);
  // });
  it('should set a status code 200 and send created todo', async () => {
    const mockValue = [{
      id: 7,
      title: 'Water plants',
      status: 'Active',
      created_at: '2021-02-23T04:52:35.819Z',
      updated_at: null,
    }];
    const spyGetTodo = jest.spyOn(todoService, 'postTodo').mockResolvedValue(mockValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      app: { locals: { db: 'abc' } },
      body: {
        todo: 'Water plants',
        status: 'Active',
      },
    };
    await todoHandler.createTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith(mockValue);
    expect(spyGetTodo).toHaveBeenCalledWith('abc', {
      todo: 'Water plants',
      status: 'Active',
    });
  });
  // Check
  // it('should set a status code 201 and todo should be added', async () => {
  //   const createTodoSpy = jest.spyOn(todoService, 'postTodo').mockResolvedValue([
  //     { id: '3', todo: 'Buy 1kg rice', status: 'Active' },
  //   ]);
  //   const mockResponse = {
  //     status: jest.fn(() => mockResponse),
  //     send: jest.fn(),
  //   };
  //   const mockRequest = {
  //     body: { todo: 'Buy 1kg rice' },
  //   };
  //   await todoHandler.createTodo(mockRequest, mockResponse);
  //   expect(mockResponse.status).toHaveBeenCalledWith(201);
  //   expect(createTodoSpy).toHaveBeenCalledWith({ todo: 'Buy 1kg rice' });
  //   // expect(mockResponse.send).toHaveBeenCalledWith([
  //   //   { id: '3', todo: 'Buy 1kg rice', status: 'Active' },
  //   // ]);
  // });

  it('should set a status code 200 and send updated todo', async () => {
    const mockValue = [{
      id: 7,
      title: 'Water terrace plants',
      status: 'Completed',
      created_at: '2021-02-23T04:52:35.819Z',
      updated_at: null,
    }];
    const spyGetTodo = jest.spyOn(todoService, 'updateTodo').mockResolvedValue(mockValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      app: { locals: { db: 'abc' } },
      params: { id: '7' },
      body: {
        todo: 'Water terrace plants',
        status: 'Completed',
      },
    };
    await todoHandler.updateTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockValue);
    expect(spyGetTodo).toHaveBeenCalledWith('abc', '7', {
      todo: 'Water terrace plants',
      status: 'Completed',
    });
  });

  // it('should set a status code 200 and todo should be updated', async () => {
  //   const updateTodoSpy = jest.spyOn(todoService, 'updateTodo').mockResolvedValue([
  //     { id: '3', todo: 'Buy 1kg rice', status: 'Completed' },
  //   ]);
  //   const mockResponse = {
  //     status: jest.fn(() => mockResponse),
  //     send: jest.fn(),
  //   };
  //   const mockRequest = {
  //     params: { id: '3' },
  //     body: { status: 'Completed' },
  //   };
  //   await todoHandler.updateTodo(mockRequest, mockResponse);
  //   expect(mockResponse.status).toHaveBeenCalledWith(200);
  //   expect(updateTodoSpy).toHaveBeenCalledWith('3', { status: 'Completed' });

  // expect(mockResponse.send).toHaveBeenCalledWith([
  //   { id: '3', todo: 'Buy 1kg rice', status: 'Active' },
  // ]);
  // });

  it('should set a status code 200 and send deleted todo', async () => {
    const mockValue = [{
      id: 7,
      title: 'Water terrace plants',
      status: 'Completed',
      created_at: '2021-02-23T04:52:35.819Z',
      updated_at: null,
    }];
    const spyGetTodo = jest.spyOn(todoService, 'deleteTodoWithId').mockResolvedValue(mockValue);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      app: { locals: { db: 'abc' } },
      params: { id: '7' },
    };
    await todoHandler.deleteTodoById(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockValue);
    expect(spyGetTodo).toHaveBeenCalledWith('abc', '7');
  });

  // it('should set a status code 204 and todo should be deleted by id', async () => {
  //   const deleteTodoSpy = jest.spyOn(todoService, 'deleteTodoWithId').mockResolvedValue([
  //     { id: '3', todo: 'Buy 1kg rice', status: 'Completed' },
  //   ]);
  //   const mockResponse = {
  //     status: jest.fn(() => mockResponse),
  //     send: jest.fn(),
  //   };
  //   const mockRequest = {
  //     params: { id: '3' },
  //   };
  //   await todoHandler.deleteTodoById(mockRequest, mockResponse);
  //   expect(mockResponse.status).toHaveBeenCalledWith(204);
  //   expect(deleteTodoSpy).toHaveBeenCalledWith('3');
  //   // expect(mockResponse.send).toHaveBeenCalledWith([
  //   //   { id: '3', todo: 'Buy 1kg rice', status: 'Active' },
  //   // ]);
  // });
});
