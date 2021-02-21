const todoBasiceServices = require('../todo.basic.service');
const { updateTodo, deleteTodo } = require('../todo.service');

describe('updateTodo function', () => {
  const spyOnGetAllTodo = jest.spyOn(todoBasiceServices, 'getAllTodo');
  const spyOnPostTodo = jest.spyOn(todoBasiceServices, 'postTodo');
  const spyOnGetTodo = jest.spyOn(todoBasiceServices, 'getTodo');
  const MOCK_TODO_ID = '1';
  const MOCK_UPDATE_TODO = {
    description: 'Update task 1',
    status: 'complete',
  };
  it('should return array of promises with values resolved to success', async () => {
    const MOCK_TODO_LIST = [
      {
        id: '1',
        description: 'Task 1',
        status: 'incomplete',
      },
      {
        id: '2',
        description: 'Task 2',
        status: 'complete',
      },
    ];
    const MOCK_TODO = MOCK_TODO_LIST[0];

    const EXPECTED_VALUE = ['Success', 'Success'];
    spyOnGetTodo.mockResolvedValue(MOCK_TODO);
    spyOnGetAllTodo.mockResolvedValue(MOCK_TODO_LIST);
    spyOnPostTodo.mockResolvedValue('Success');
    const returnedArray = await updateTodo(MOCK_TODO_ID, MOCK_UPDATE_TODO);
    expect(returnedArray).toEqual(EXPECTED_VALUE);
  });
  it('should throw an error object with status code 404 and todo not found message if todo is not found', async () => {
    const ERROR_OBJECT = {
      status: 404,
      message: 'todo not found',
    };
    spyOnGetTodo.mockRejectedValue(ERROR_OBJECT);
    try {
      await updateTodo(MOCK_TODO_ID, MOCK_UPDATE_TODO);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe('todo not found');
    }
  });
  it('should throw an error object with status code 500 and Error in accessing file message if getAlltodo or postTodo throws an error', async () => {
    const ERROR_OBJECT = {
      status: 500,
      message: 'Error in accessing file',
    };
    spyOnGetTodo.mockRejectedValue(ERROR_OBJECT);
    try {
      await updateTodo(MOCK_TODO_ID, MOCK_UPDATE_TODO);
    } catch (error) {
      expect(error.status).toBe(500);
      expect(error.message).toBe('Error in accessing file');
    }
  });
});

describe('deleteTodo function', () => {
  const spyOnGetAllTodo = jest.spyOn(todoBasiceServices, 'getAllTodo');
  const spyOnPostTodo = jest.spyOn(todoBasiceServices, 'postTodo');
  const spyOnGetTodo = jest.spyOn(todoBasiceServices, 'getTodo');
  const MOCK_TODO_ID = '1';
  it('should return array of promises with values resolved to success', async () => {
    const MOCK_TODO_LIST = [
      {
        id: '1',
        description: 'Task 1',
        status: 'incomplete',
      },
      {
        id: '2',
        description: 'Task 2',
        status: 'complete',
      },
    ];
    const MOCK_TODO = MOCK_TODO_LIST[0];

    const EXPECTED_VALUE = ['Success']; // only one task is written back
    spyOnGetTodo.mockResolvedValue(MOCK_TODO);
    spyOnGetAllTodo.mockResolvedValue(MOCK_TODO_LIST);
    spyOnPostTodo.mockResolvedValue('Success');
    const returnedArray = await deleteTodo(MOCK_TODO_ID);
    expect(returnedArray).toEqual(EXPECTED_VALUE);
  });
  it('should throw an error object with status code 404 and todo not found message if todo is not found', async () => {
    const ERROR_OBJECT = {
      status: 404,
      message: 'todo not found',
    };
    spyOnGetTodo.mockRejectedValue(ERROR_OBJECT);
    try {
      await deleteTodo(MOCK_TODO_ID);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe('todo not found');
    }
  });
  it('should throw an error object with status code 500 and Error in accessing file message if getAlltodo or postTodo throws an error', async () => {
    const ERROR_OBJECT = {
      status: 500,
      message: 'Error in accessing file',
    };
    spyOnGetTodo.mockRejectedValue(ERROR_OBJECT);
    try {
      await deleteTodo(MOCK_TODO_ID);
    } catch (error) {
      expect(error.status).toBe(500);
      expect(error.message).toBe('Error in accessing file');
    }
  });
});
