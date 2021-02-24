const {
  getAllTodo, createTodo, getTodo, deleteAllTodo, updateTodo, deleteStatusTodo, deleteTodo,
} = require('../todo.service');
const { Todo } = require('../../models');

describe('getAllTodo Function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const spyOnFindAll = jest.spyOn(Todo, 'findAll');
  it('should return todos', async () => {
    const MOCK_EXPECTED_VALUE = [
      {
        id: '1',
        description: 'First Task',
        status: 'complete',
      },
      {
        id: '2',
        description: 'Second Task',
        status: 'incomplete',
      },
    ];
    spyOnFindAll.mockResolvedValue(MOCK_EXPECTED_VALUE);
    const receivedData = await getAllTodo();
    expect(receivedData).toEqual(MOCK_EXPECTED_VALUE);
  });
  it('should return empty array if no task present', async () => {
    const MOCK_RESOLVE = [];
    spyOnFindAll.mockResolvedValue(MOCK_RESOLVE);
    const receivedData = await getAllTodo();
    expect(receivedData).toEqual(MOCK_RESOLVE);
  });
});

describe('createTodo Function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const MOCK_TODO_1 = {
    description: 'Task 1',
    status: 'complete',
  };
  const MOCK_TODO_2 = {
    description: 'Task 2',
  };
  const spyOnCreate = jest.spyOn(Todo, 'create');
  it('should append data to file and return the todo if successful', async () => {
    const MOCK_RESOLVED_VALUE_1 = {
      dataValues: {
        id: '1',
        description: 'Task 1',
        status: 'complete',
      },
    };
    const MOCK_RESOLVED_VALUE_2 = {
      dataValues: {
        id: '2',
        description: 'Task 2',
        status: 'incomplete',
      },
    };
    spyOnCreate.mockResolvedValueOnce(MOCK_RESOLVED_VALUE_1);
    spyOnCreate.mockResolvedValueOnce(MOCK_RESOLVED_VALUE_2);
    const todo1 = await createTodo(MOCK_TODO_1);
    const todo2 = await createTodo(MOCK_TODO_2);
    expect(todo1).toEqual(MOCK_RESOLVED_VALUE_1.dataValues);
    expect(todo2).toEqual(MOCK_RESOLVED_VALUE_2.dataValues);
  });
});

describe('getTodo Function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const spyOnFindAll = jest.spyOn(Todo, 'findAll');
  const MOCK_TODO_ID = '1';
  it('should return required todo', async () => {
    const MOCK_EXPECTED_TODO = [{
      id: '1',
      description: 'Task 1',
      status: 'incomplete',
    }];
    spyOnFindAll.mockResolvedValue(MOCK_EXPECTED_TODO);
    const receivedTodo = await getTodo(MOCK_TODO_ID);
    expect(receivedTodo).toEqual(MOCK_EXPECTED_TODO);
  });
  it('should throw todo not found error message if no todo found', async () => {
    const MOCK_RESOLVE = [];
    spyOnFindAll.mockResolvedValue(MOCK_RESOLVE);
    try {
      await getTodo(MOCK_TODO_ID);
    } catch (error) {
      expect(error.message).toBe('Todo not found');
    }
  });
});

describe('deleteAllTodo Function', () => {
  it('should delete all todos and return message', async () => {
    const spyOnDestroy = jest.spyOn(Todo, 'destroy');
    spyOnDestroy.mockResolvedValue(0);
    const EXPECTED_VALUE = 'All todos deleted';
    const receivedData = await deleteAllTodo();
    expect(receivedData).toEqual(EXPECTED_VALUE);
  });
});

describe('updateTodo function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const spyOnUpdate = jest.spyOn(Todo, 'update');
  const MOCK_TODO_ID = '1';
  const MOCK_UPDATE_TODO = {
    description: 'Update task 1',
    status: 'complete',
  };
  it('should return updated todo on successful updation', async () => {
    const MOCK_RESOLVED_VALUE = [[1], [{
      dataValues: {
        id: '1',
        description: 'Update task 1',
        status: 'complete',
      },
    }]];
    spyOnUpdate.mockResolvedValue(MOCK_RESOLVED_VALUE);
    const todo = await updateTodo(MOCK_TODO_ID, MOCK_UPDATE_TODO);
    expect(todo).toEqual(MOCK_RESOLVED_VALUE[1][0].dataValues);
  });
  it('should throw todo not found error if todo does not exist', async () => {
    const MOCK_RESOLVED_VALUE = [0, [{
      dataValues: {},
    }]];
    spyOnUpdate.mockResolvedValue(MOCK_RESOLVED_VALUE);
    try {
      await updateTodo(MOCK_TODO_ID, MOCK_UPDATE_TODO);
    } catch (error) {
      expect(error.message).toEqual('Todo not found');
    }
  });
});

describe('deleteTodo function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const spyOnDestroy = jest.spyOn(Todo, 'destroy');
  const MOCK_TODO_ID = '1';
  it('should return success message on successful deletion', async () => {
    spyOnDestroy.mockResolvedValue(1);
    const returnedMessage = await deleteTodo(MOCK_TODO_ID);
    expect(returnedMessage).toEqual('1 todo(s) deleted');
  });
  it('should throw todo not found error if todo does not exist', async () => {
    spyOnDestroy.mockResolvedValue(0);
    try {
      await deleteTodo(MOCK_TODO_ID);
    } catch (error) {
      expect(error.message).toEqual('Todo not found');
    }
  });
});

describe('deleteStatusTodo function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const spyOnDestroy = jest.spyOn(Todo, 'destroy');
  const MOCK_TODO_STATUS = 'complete';
  it('should return success message on successful deletion', async () => {
    spyOnDestroy.mockResolvedValue(3);
    const returnedMessage = await deleteStatusTodo(MOCK_TODO_STATUS);
    expect(returnedMessage).toEqual('3 todo(s) deleted');
  });
  it('should throw todo not found error if todo does not exist', async () => {
    spyOnDestroy.mockResolvedValue(0);
    try {
      await deleteStatusTodo(MOCK_TODO_STATUS);
    } catch (error) {
      expect(error.message).toEqual('Todo not found');
    }
  });
});
