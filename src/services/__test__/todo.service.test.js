const service = require('../todo.service');

const todoRepository = require('../../repository/todo.repository');

describe('getAllTodos Service', () => {
  it('should return tasks array', async () => {
    const mockResponse = [
      {
        id: 1,
        title: 'drink water',
        status: 'active',
        craeted_at: '2021-02-22T10:37:11.911Z',
        updated_at: null,
      },
      {
        id: 2,
        title: 'watch',
        status: 'active',
        craeted_at: '2021-02-22T10:37:11.911Z',
        updated_at: null,
      },
    ];
    jest.spyOn(todoRepository, 'getAllTodos').mockResolvedValue(mockResponse);
    const receivedTasks = await service.getAllTodos();
    expect(receivedTasks).toEqual(mockResponse);
  });

  it('should return error object message with incorrect file path ', async () => {
    jest.spyOn(todoRepository, 'getAllTodos').mockImplementation(() => { throw new Error('error'); });
    try {
      const received = await service.getAllTodos();
    } catch (error) {
      expect(error).toEqual(Error('error'));
    }
  });
});

describe('getTodoByID Service', () => {
  it('should return task object', async () => {
    const mockResponse = [
      {
        id: 1,
        title: 'drink water',
        status: 'active',
        craeted_at: '2021-02-22T10:37:11.911Z',
        updated_at: null,
      },
    ];
    jest.spyOn(todoRepository, 'getTodoByID').mockResolvedValue(mockResponse);
    const receivedTasks = await service.getTodoByID();
    expect(receivedTasks).toEqual(mockResponse);
  });

  it('should return error object ', async () => {
    jest.spyOn(todoRepository, 'getTodoByID').mockImplementation(() => { throw new Error('error'); });
    try {
      const received = await service.getTodoByID();
    } catch (error) {
      expect(error).toEqual(Error('error'));
    }
  });
});

describe('createTodo Service', () => {
  it('should successfully execute', async () => {
    jest.spyOn(todoRepository, 'insertTodo').mockResolvedValue();

    const response = await service.createTodo();
    expect(response).toEqual(undefined);
  });

  it('should go to catch block', async () => {
    jest.spyOn(todoRepository, 'insertTodo').mockImplementation(() => { throw new Error('error'); });
    try {
      const response = await service.createTodo();
    } catch (error) {
      expect(error).toEqual(Error('error'));
    }
  });
});

describe('updateTodo Service', () => {
  it('should successfully execute', async () => {
    jest.spyOn(todoRepository, 'updateTodo').mockResolvedValue();

    const response = await service.updateTodo();
    expect(response).toEqual(undefined);
  });

  it('should go to catch block', async () => {
    jest.spyOn(todoRepository, 'updateTodo').mockImplementation(() => { throw new Error('error'); });
    try {
      const response = await service.updateTodo();
    } catch (error) {
      expect(error).toEqual(Error('error'));
    }
  });
});

describe('deleteTodo Service', () => {
  it('should successfully execute', async () => {
    jest.spyOn(todoRepository, 'deleteTodoByID').mockResolvedValue();

    const response = await service.deleteTodo();
    expect(response).toEqual(undefined);
  });

  it('should go to catch block', async () => {
    jest.spyOn(todoRepository, 'deleteTodoByID').mockImplementation(() => { throw new Error('error'); });
    try {
      const response = await service.deleteTodo();
    } catch (error) {
      expect(error).toEqual(Error('error'));
    }
  });
});
