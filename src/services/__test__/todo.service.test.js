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
    const mockTitle = 'drink water';
    const mockStatus = 'active';
    const mockResponse = {
      dataValues:
        {
          id: 1,
          title: mockTitle,
          status: mockStatus,
          craeted_at: '2021-02-22T10:37:11.911Z',
          updated_at: '2021-02-22T10:37:11.911Z',
        },
    };

    const createSpy = jest.spyOn(Todo, 'create');
    createSpy.mockResolvedValue(mockResponse);
    const response = await service.createTodo(mockTitle, mockStatus);
    expect(response).toEqual(mockResponse.dataValues);
    expect(createSpy).toHaveBeenCalledWith({ title: mockTitle, status: mockStatus });
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
    const mockID = 1;
    const mockTitle = 'drink water';
    const mockStatus = 'active';
    const mockResponse = [
      1,
      [{
        id: mockID,
        title: mockTitle,
        status: mockStatus,
        craeted_at: '2021-02-22T10:37:11.911Z',
        updated_at: '2021-02-22T10:37:11.911Z',
      }],
    ];

    const updateSpy = jest.spyOn(Todo, 'update');
    updateSpy.mockResolvedValue(mockResponse);
    const response = await service.updateTodo(mockID, mockTitle, mockStatus);
    expect(response).toEqual(mockResponse[1]);
    expect(updateSpy).toHaveBeenCalledWith({ title: mockTitle, status: mockStatus }, {
      where: {
        id: mockID,
      },
      returning: true,
    });
  });

  it('should go to catch block with RangeError', async () => {
    const mockID = 1;
    const mockTitle = 'drink water';
    const mockStatus = 'active';
    jest.spyOn(Todo, 'update').mockResolvedValue([0]);
    try {
      const response = await service.updateTodo(mockID, mockTitle, mockStatus);
    } catch (error) {
      expect(error).toEqual(RangeError('Todo not found'));
    }
  });
});

describe('deleteTodo Service', () => {
  it('should successfully execute', async () => {
    const mockID = 2;
    const destroySpy = jest.spyOn(Todo, 'destroy');
    destroySpy.mockResolvedValue([1]);

    const response = await service.deleteTodo(mockID);

    expect(response).toEqual('1 todo deleted');
    expect(destroySpy).toHaveBeenCalledWith({
      where: {
        id: mockID,
      },
    });
  });

  it('should go to catch block with error', async () => {
    jest.spyOn(todoRepository, 'deleteTodoByID').mockImplementation(() => { throw new Error('error'); });
    try {
      const response = await service.deleteTodo();
    } catch (error) {
      expect(error).toEqual(Error('error'));
    }
  });

  it('should go to catch block with Range error ', async () => {
    const mockID = 15;
    const destroySpy = jest.spyOn(Todo, 'destroy');
    destroySpy.mockResolvedValue([0]);
    try {
      const response = await service.deleteTodo(mockID);
    } catch (error) {
      expect(error).toEqual(RangeError('Todo not found'));
    }
  });
});
