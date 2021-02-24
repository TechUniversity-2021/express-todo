const service = require('../todo.service');
const { Todo } = require('../../models');
const todoRepository = require('../../repository/todo.repository');

describe('getAllTodos Service', () => {
  it('should return todos object array', async () => {
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
    jest.spyOn(Todo, 'findAll').mockResolvedValue(mockResponse);
    const receivedTasks = await service.getAllTodos();
    expect(receivedTasks).toEqual(mockResponse);
  });

  it('should go to catch block ', async () => {
    jest.spyOn(Todo, 'findAll').mockImplementation(() => { throw new Error('error'); });
    try {
      const receivedTasks = await service.getAllTodos();
    } catch (error) {
      expect(error).toEqual(Error('error'));
    }
  });
});

describe('getTodoByID Service', () => {
  it('should return one task object', async () => {
    const mockID = 1;
    const mockResponse = [
      {
        id: 1,
        title: 'drink water',
        status: 'active',
        craeted_at: '2021-02-22T10:37:11.911Z',
        updated_at: null,
      },
    ];
    const findOneSpy = jest.spyOn(Todo, 'findOne');
    findOneSpy.mockResolvedValue(mockResponse);
    const receivedTasks = await service.getTodoByID(mockID);
    expect(receivedTasks).toEqual(mockResponse);
    expect(findOneSpy).toHaveBeenCalledWith({ where: { id: mockID } });
  });

  it('should return error object ', async () => {
    jest.spyOn(Todo, 'findAll').mockImplementation(() => { throw new Error('error'); });
    try {
      const receivedTasks = await service.getTodoByID();
    } catch (error) {
      expect(error).toEqual(Error('error'));
    }
  });
});

describe('createTodo Service', () => {
  it('should successfully execute', async () => {
    const mockResponse = {
      dataValues:
        {
          id: 1,
          title: 'drink water',
          status: 'active',
          craeted_at: '2021-02-22T10:37:11.911Z',
          updated_at: '2021-02-22T10:37:11.911Z',
        },
    };

    jest.spyOn(Todo, 'create').mockResolvedValue(mockResponse);

    const response = await service.createTodo();
    expect(response).toEqual(mockResponse.dataValues);
  });

  it('should go to catch block', async () => {
    jest.spyOn(Todo, 'create').mockImplementation(() => { throw new Error('error'); });
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
