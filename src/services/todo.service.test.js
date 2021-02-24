const todoService = require('./todo.service');
const { Todo } = require('../models');
// mockImplementation callbacks
// mockresolved promises

describe('Get todos service', () => {
  it('should return a list of todos when db execution is successful', async () => {
    const mockResponse = {
      id: 1,
      title: 'Work',
      status: 'Active',
      created_at: '3-5-8',
      updated_at: null,
    };
    jest.spyOn(Todo, 'findAll').mockResolvedValue(mockResponse);
    const response = await todoService.getTodos();
    expect(response).toStrictEqual(mockResponse);
  });
});

describe('Get todo by id service', () => {
  it('should return a todo of given id when db execution is successful', async () => {
    const mockResponse = {
      id: 1,
      title: 'Work',
      status: 'Active',
      created_at: '3-5-8',
      updated_at: null,
    };
    jest.spyOn(Todo, 'findAll').mockResolvedValue(mockResponse);
    const response = await todoService.getTodo(1);
    expect(response).toStrictEqual(mockResponse);
  });

  it('should return Not Found error when id not found for get todo', async () => {
    jest.spyOn(Todo, 'findAll').mockResolvedValue([]);
    const response = await todoService.getTodo(169);
    expect(response).toStrictEqual([]);
  });
});

describe('Post todo service', () => {
  it('should return id when new todo is added', async () => {
    const mockResponse = [
      {
        id: 1,
      },
    ];
    jest.spyOn(Todo, 'create').mockResolvedValue(mockResponse);
    const response = await todoService.createTodo({ title: 'lala', status: 'active' });
    expect(response).toStrictEqual(mockResponse);
  });
});

describe('Update todo service', () => {
  const mockResponse = [
    {
      id: 1,
    }, {
      data: 'data',
    },
  ];
  it('should return Updated id when update todo is successful', async () => {
    jest.spyOn(Todo, 'update').mockResolvedValue(mockResponse);
    const response = await todoService.updateTodo('1', { title: 'lala', status: 'active' });
    expect(response).toStrictEqual(mockResponse[1]);
  });
});

describe('Delete todo service', () => {
  const mockResponse = [
    {
      id: 1,
    },
  ];
  it('should return Deleted id when delete todo is successful', async () => {
    jest.spyOn(Todo, 'destroy').mockResolvedValue(mockResponse);
    const response = await todoService.deleteTodo('1');
    expect(response).toStrictEqual('Todo with ID 1 deleted');
  });
});
