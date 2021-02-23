const fileOps = require('../../utilities/fsFunctions.utilities');
const repoOperations = require('../../repository/todo.repository');
const {
  getAllTodo, createTodo, getTodo, deleteAllTodo, updateTodo, deleteStatusTodo, deleteTodo,
} = require('../todo.service');
const { TODO_FILE_PATH } = require('../../constants/configure');

describe('getAllTodo Function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const spyOnGetAllTodo = jest.spyOn(repoOperations, 'getAllTodo');
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
    spyOnGetAllTodo.mockResolvedValue(MOCK_EXPECTED_VALUE);
    const receivedData = await getAllTodo();
    expect(receivedData).toEqual(MOCK_EXPECTED_VALUE);
  });
  it('should return empty array if no task present', async () => {
    const MOCK_RESOLVE = [];
    spyOnGetAllTodo.mockResolvedValue(MOCK_RESOLVE);
    const receivedData = await getAllTodo();
    expect(receivedData).toEqual(MOCK_RESOLVE);
  });
});

describe('createTodo Function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const MOCK_TODO = [{
    description: 'Task 1',
    status: 'complete',
  }];
  const spyOnCreateTodo = jest.spyOn(repoOperations, 'createTodo');
  it('should append data to file and return the todo if successful', async () => {
    spyOnCreateTodo.mockResolvedValue(MOCK_TODO);
    const todo = await createTodo(MOCK_TODO);
    expect(todo).toEqual(MOCK_TODO);
  });
});

describe('getTodo Function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const spyOnGetTodo = jest.spyOn(repoOperations, 'getTodo');
  const MOCK_TODO_ID = '1';
  it('should return required todo', async () => {
    const MOCK_EXPECTED_TODO = [{
      id: '1',
      description: 'Task 1',
      status: 'incomplete',
    }];
    spyOnGetTodo.mockResolvedValue(MOCK_EXPECTED_TODO);
    const receivedTodo = await getTodo(MOCK_TODO_ID);
    expect(receivedTodo).toEqual(MOCK_EXPECTED_TODO);
  });
  it('should return empty array if no todo found', async () => {
    const MOCK_RESOLVE = [];
    spyOnGetTodo.mockResolvedValue(MOCK_RESOLVE);
    const todo = await getTodo(MOCK_TODO_ID);
    expect(todo).toBe(MOCK_RESOLVE);
  });
});

xdescribe('deleteAllTodo Function', () => {
  it('should replace all todos with an empty string and return success message', async () => {
    const spyOnWriteFile = jest.spyOn(fileOps, 'writeFile');
    spyOnWriteFile.mockResolvedValue('Success');
    const EXPECTED_VALUE = 'Success';
    const receivedData = await deleteAllTodo();
    expect(receivedData).toEqual(EXPECTED_VALUE);
  });
});

describe('updateTodo function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const spyOnUpdateTodo = jest.spyOn(repoOperations, 'updateTodo');
  const MOCK_TODO_ID = '1';
  const MOCK_UPDATE_TODO = {
    description: 'Update task 1',
    status: 'complete',
  };
  const MOCK_EXPECT_TODO = [{
    id: '1',
    description: 'Update task 1',
    status: 'complete',
  }];
  it('should return updated todo on successful updation', async () => {
    spyOnUpdateTodo.mockResolvedValue(MOCK_EXPECT_TODO);
    const todo = await updateTodo(MOCK_TODO_ID, MOCK_UPDATE_TODO);
    expect(todo).toEqual(MOCK_EXPECT_TODO);
  });
  it('should throw todo not found error if todo does not exist', async () => {
    spyOnUpdateTodo.mockResolvedValue('Todo not found');
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
  const spyOnDeleteTodo = jest.spyOn(repoOperations, 'deleteTodo');
  const MOCK_TODO_ID = '1';
  it('should return success message on successful updation', async () => {
    spyOnDeleteTodo.mockResolvedValue('Success');
    const returnedMessage = await deleteTodo(MOCK_TODO_ID);
    expect(returnedMessage).toEqual('Success');
  });
  it('should throw todo not found error if todo does not exist', async () => {
    spyOnDeleteTodo.mockResolvedValue('Todo not found');
    try {
      await deleteTodo(MOCK_TODO_ID);
    } catch (error) {
      expect(error.message).toEqual('Todo not found');
    }
  });
});

xdescribe('deleteStatusTodo function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const spyOnReadFile = jest.spyOn(fileOps, 'readFile');
  const spyOnAppendFile = jest.spyOn(fileOps, 'appendFile');
  const spyOnWriteFile = jest.spyOn(fileOps, 'writeFile');
  const MOCK_TODO_STATUS = 'complete';
  it('should return success message on deletion of todos with status complete', async () => {
    const MOCK_TODO_DATA = '1|First Task|complete\n2|Second Task|incomplete\n';
    const EXPECTED_VALUE = 'Success'; // only one task is written back
    const MOCK_EXPECTED_ARGUMENT = '2|Second Task|incomplete\n';
    spyOnWriteFile.mockResolvedValue('Success');
    spyOnAppendFile.mockResolvedValue('Success');
    spyOnReadFile.mockResolvedValue(MOCK_TODO_DATA);
    const receivedMessage = await deleteStatusTodo(MOCK_TODO_STATUS);
    expect(spyOnWriteFile).toHaveBeenCalledWith(TODO_FILE_PATH, '');
    expect(spyOnAppendFile).toHaveBeenCalledWith(TODO_FILE_PATH, MOCK_EXPECTED_ARGUMENT);
    expect(receivedMessage).toEqual(EXPECTED_VALUE);
  });
  it('should throw an error with todo not found message if required todo is not found', async () => {
    const MOCK_TODO_DATA = '2|Second Task|incomplete\n';
    spyOnReadFile.mockResolvedValue(MOCK_TODO_DATA);
    try {
      await deleteStatusTodo(MOCK_TODO_STATUS);
    } catch (error) {
      expect(error.message).toBe('Todo not found');
    }
  });
});
