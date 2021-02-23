// const fileUtil = require('../utils/fileUtil');
const todosService = require('../services/todo.service');
const todoHandler = require('./todo.handler');

describe('Todo handler: get todo', () => {
  it('should set status code 200 with todo object', async () => {
    const mockRequest = {
      app: {
        locals: {
        },
      },
    };
    jest.spyOn(todosService, 'getTodos').mockResolvedValue({
      id: 1,
      title: 'todo 1',
      status: 'active',
      created_at: '2021-02-22T10:33:00.987Z',
      updated_at: null,
    });
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.getTodos(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith({
      id: 1,
      title: 'todo 1',
      status: 'active',
      created_at: '2021-02-22T10:33:00.987Z',
      updated_at: null,
    });
  });
  it('should set status code 404, todos not found', async () => {
    const mockRequest = {
      app: {
        locals: {
        },
      },
    };
    jest.spyOn(todosService, 'getTodos').mockResolvedValue([]);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.getTodos(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith('todo data does not exist');
  });
});
describe('Todo handler: get todo by id', () => {
  it('should set status code 200 with todo object with given id', async () => {
    const mockRequest = {
      params: {
        id: 1,
      },
      app: {
        locals: {
        },
      },
    };
    jest.spyOn(todosService, 'getTodoById').mockResolvedValue({
      id: 1,
      title: 'todo 1',
      status: 'active',
      created_at: '2021-02-22T10:33:00.987Z',
      updated_at: null,
    });
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.getTodoById(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith({
      id: 1,
      title: 'todo 1',
      status: 'active',
      created_at: '2021-02-22T10:33:00.987Z',
      updated_at: null,
    });
  });

  it('should set status code 404 with todo id not found', async () => {
    const mockRequest = {
      params: {
        id: 1,
      },
      app: {
        locals: {
        },
      },
    };
    jest.spyOn(todosService, 'getTodoById').mockResolvedValue([]);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.getTodoById(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith('id does not exist');
  });
});

describe('Todo handler: post todo', () => {
  it('should set status code 201 with send success', async () => {
    const mockRequest = {
      body: {
      },
      app: {
        locals: {
        },
      },
    };
    jest.spyOn(todosService, 'createNewTodo').mockResolvedValue({
      id: 1,
      title: 'todo 1',
      status: 'active',
      created_at: '2021-02-22T10:33:00.987Z',
      updated_at: null,
    });
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.createTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith({
      id: 1,
      title: 'todo 1',
      status: 'active',
      created_at: '2021-02-22T10:33:00.987Z',
      updated_at: null,
    });
  });
});

describe('Todo handler: put todo', () => {
  it('should set  status code 201', async () => {
    const mockRequest = {
      params: {
        id: '1',
      },
      body: {
        title: 'title',
      },
      app: {
        locals: {
        },
      },
    };
    jest.spyOn(todosService, 'updateTodo').mockResolvedValue({
      id: 1,
      title: 'todo 1',
      status: 'active',
      created_at: '2021-02-22T10:33:00.987Z',
      updated_at: null,
    });
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.updateTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith({
      id: 1,
      title: 'todo 1',
      status: 'active',
      created_at: '2021-02-22T10:33:00.987Z',
      updated_at: null,
    });
  });
  it('should return error with status code 404', async () => {
    const mockRequest = {
      params: {
        id: '1',
      },
      body: {
        title: 'title',
      },
      app: {
        locals: {
        },
      },
    };
    jest.spyOn(todosService, 'updateTodo').mockResolvedValue([]);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.updateTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith('id not found');
  });
});

describe('Todo handler: delete todo', () => {
  it('should return with status code 200', async () => {
    const mockRequest = {
      params: {
        id: '1',
      },
      app: {
        locals: {
        },
      },
    };
    jest.spyOn(todosService, 'deleteTodo').mockResolvedValue(1);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.deleteTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(1);
  });
  it('should set status code 404', async () => {
    const mockRequest = {
      params: {
        id: '1',
      },
      app: {
        locals: {
        },
      },
    };
    jest.spyOn(todosService, 'deleteTodo').mockResolvedValue(0);
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.deleteTodo(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith('id not found');
  });
});
// describe('Todo handler', () => {
//   it('should return a status code of 200 along with todo objects', async () => {
//     jest.spyOn(fileUtil, 'readFile').mockResolvedValue('1|break|active');
//     const mockResponse = {
//       status: jest.fn(() => mockResponse),
//       send: jest.fn(),
//     };
//     await todoHandler.getTodos(null, mockResponse);
//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//     expect(mockResponse.send).
// toHaveBeenCalledWith([{ id: '1', todo: 'break', status: 'active' }]);
//   });
//   it('should return a status code of 201 along with success message', async () => {
//     jest.spyOn(todosService, 'createNewTodo').mockResolvedValue(201);
//     const mockResponse = {
//       status: jest.fn(() => mockResponse),
//       send: jest.fn(),
//     };
//     await todoHandler.createTodo(mockResponse, mockResponse);
//     expect(mockResponse.status).toHaveBeenCalledWith(201);
//     expect(mockResponse.send).toHaveBeenCalledWith('success');
//   });
//   it('should reject with server error', async () => {
//     jest.spyOn(todosService, 'createNewTodo').mockRejectedValue(new Error('error'));
//     const mockResponse = {
//       status: jest.fn(() => mockResponse),
//       send: jest.fn(),
//     };
//     await todoHandler.createTodo(mockResponse, mockResponse);
//     expect(mockResponse.send).toHaveBeenCalledWith('server error');
//   });
//   it('should return a status code of 200 along with update success message', async () => {
//     jest.spyOn(todosService, 'updateTodo').mockResolvedValue('update success');
//     const mockResponse = {
//       status: jest.fn(() => mockResponse),
//       send: jest.fn(() => mockResponse),
//       params: { id: '123' },
//     };
//     await todoHandler.updateTodo(mockResponse, mockResponse);
//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//     expect(mockResponse.send).toHaveBeenCalledWith('update success');
//   });
//   it('should return a status code of 200 along with delete success message', async () => {
//     jest.spyOn(todosService, 'deleteTodo').mockResolvedValue('delete success');
//     const mockResponse = {
//       status: jest.fn(() => mockResponse),
//       send: jest.fn(() => mockResponse),
//       params: { id: '123' },
//     };
//     await todoHandler.deleteTodo(mockResponse, mockResponse);
//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//     expect(mockResponse.send).toHaveBeenCalledWith('delete success');
//   });
// });
