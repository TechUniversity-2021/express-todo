const todoHandler = require('./todo.handler');
const todoService = require('../services/todo.service');
// anything which has await before it mock

describe('Todo handler', () => {
  it('should return with a status code 200 along with todo objects', async () => {
    jest
      .spyOn(todoService, 'getTodo')
      .mockResolvedValue([
        { id: '1', todo: 'break', status: 'active' },
        { id: '2', todo: 'break', status: 'active' },
      ]);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      query: { search: 'Buy 1kg rice' },
    };
    await todoHandler.getTodos(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith([
      { id: '1', todo: 'break', status: 'active' },
      { id: '2', todo: 'break', status: 'active' },
    ]);
  });

  it('should return with a status code 200 along with todo of respective id', async () => {
    const getTodoWithIdSpy = jest.spyOn(todoService, 'getTodoWithId').mockResolvedValue([
      { id: '3', todo: 'Buy 1kg rice', status: 'Active' },
    ]);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      params: { id: '3' },
    };
    await todoHandler.getTodoById(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(getTodoWithIdSpy).toHaveBeenCalledWith({ params: { id: '3' } });
    expect(mockResponse.send).toHaveBeenCalledWith([
      { id: '3', todo: 'Buy 1kg rice', status: 'Active' },
    ]);
  });

  // it('should return with a status code 200 along with todo of respective query', async () => {
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

  // Check
  it('should return with a status code 201 and todo should be added', async () => {
    const createTodoSpy = jest.spyOn(todoService, 'postTodo').mockResolvedValue([
      { id: '3', todo: 'Buy 1kg rice', status: 'Active' },
    ]);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      body: { todo: 'Buy 1kg rice' },
    };
    await todoHandler.createTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(createTodoSpy).toHaveBeenCalledWith({ todo: 'Buy 1kg rice' });
    // expect(mockResponse.send).toHaveBeenCalledWith([
    //   { id: '3', todo: 'Buy 1kg rice', status: 'Active' },
    // ]);
  });

  it('should return with a status code 200 and todo should be updated', async () => {
    const updateTodoSpy = jest.spyOn(todoService, 'updateTodo').mockResolvedValue([
      { id: '3', todo: 'Buy 1kg rice', status: 'Completed' },
    ]);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    const mockRequest = {
      params: { id: '3' },
      body: { status: 'Completed' },
    };
    await todoHandler.updateTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(updateTodoSpy).toHaveBeenCalledWith('3', { status: 'Completed' });
    // expect(mockResponse.send).toHaveBeenCalledWith([
    //   { id: '3', todo: 'Buy 1kg rice', status: 'Active' },
    // ]);
  });

  // it('should return with a status code 204 and todo should be deleted by id', async () => {
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
