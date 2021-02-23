const fileOps = require('../../utilities/fsFunctions.utilities');
const {
  getAllTodo, createTodo, getTodo, deleteAllTodo, updateTodo,
} = require('../todo.basic.service');
const { TODO_FILE_PATH } = require('../../constants/configure');

describe('getAllTodo Function', () => {
  it('should parse file contents to return a json object of todos', async () => {
    const spyOnReadFile = jest.spyOn(fileOps, 'readFile');
    const MOCK_FILE_DATA = '1|First Task|complete\n2|Second Task|incomplete\n';
    spyOnReadFile.mockResolvedValue(MOCK_FILE_DATA);
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
    const receivedData = await getAllTodo();
    expect(receivedData).toEqual(MOCK_EXPECTED_VALUE);
  });
  it('should return empty array if no task present', async () => {
    const spyOnReadFile = jest.spyOn(fileOps, 'readFile');
    const MOCK_RESOLVE = '';
    spyOnReadFile.mockResolvedValue(MOCK_RESOLVE);
    const MOCK_EXPECTED_VALUE = [];
    try {
      const receivedData = await getAllTodo();
      expect(receivedData).toEqual(MOCK_EXPECTED_VALUE);
    } catch (error) {
      expect(error.message).toBe('Error reading file data');
    }
  });
});

describe('createTodo Function', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const MOCK_TODO_1 = {
    id: '1',
    description: 'Task 1',
    status: 'complete',
  };
  const MOCK_TODO_2 = {
    id: '2',
    description: 'Task 2',
  };
  const spyOnAppendFile = jest.spyOn(fileOps, 'appendFile');
  const EXPECTED_VALUE_1 = MOCK_TODO_1;
  const EXPECTED_VALUE_2 = {
    ...MOCK_TODO_2,
    status: 'incomplete',
  };
  const MOCK_EXPECTED_ARGUMENT_1 = '1|Task 1|complete\n';
  const MOCK_EXPECTED_ARGUMENT_2 = '2|Task 2|incomplete\n'; // since we initialised default id to 1
  it('should append data to file and return the todo if successful', async () => {
    spyOnAppendFile.mockResolvedValue('Success');
    const receivedTodo1 = await createTodo(MOCK_TODO_1);
    const receivedTodo2 = await createTodo(MOCK_TODO_2);
    expect(spyOnAppendFile).toHaveBeenNthCalledWith(1, TODO_FILE_PATH, MOCK_EXPECTED_ARGUMENT_1);
    expect(spyOnAppendFile).toHaveBeenNthCalledWith(2, TODO_FILE_PATH, MOCK_EXPECTED_ARGUMENT_2);
    expect(receivedTodo1).toEqual(EXPECTED_VALUE_1);
    expect(receivedTodo2).toEqual(EXPECTED_VALUE_2);
  });
});

describe('getTodo Function', () => {
  const spyOnReadFile = jest.spyOn(fileOps, 'readFile');
  const MOCK_TODO_ID = '1';
  it('should return required todo', async () => {
    const MOCK_FILE_DATA = '1|Task 1|incomplete\n';
    const MOCK_EXPECTED_TODO = {
      id: '1',
      description: 'Task 1',
      status: 'incomplete',
    };
    spyOnReadFile.mockResolvedValue(MOCK_FILE_DATA);
    const receivedTodo = await getTodo(MOCK_TODO_ID);
    expect(receivedTodo).toEqual(MOCK_EXPECTED_TODO);
  });
  it('should throw todo not found error if file is empty', async () => {
    const MOCK_FILE_DATA = '';
    const EXPECTED_ERROR_MESSAGE = 'Todo not found';
    spyOnReadFile.mockResolvedValue(MOCK_FILE_DATA);
    try {
      await getTodo(MOCK_TODO_ID);
    } catch (error) {
      expect(error.message).toBe(EXPECTED_ERROR_MESSAGE);
    }
  });
  it('should throw todo not found error if no matching todo is found', async () => {
    const MOCK_FILE_DATA = '2|Task 1|incomplete\n';
    const EXPECTED_ERROR_MESSAGE = 'Todo not found';
    spyOnReadFile.mockResolvedValue(MOCK_FILE_DATA);
    try {
      await getTodo(MOCK_TODO_ID);
    } catch (error) {
      expect(error.message).toBe(EXPECTED_ERROR_MESSAGE);
    }
  });
});

describe('deleteAllTodo Function', () => {
  it('should replace all todos with an empty string and return success message', async () => {
    const spyOnWriteFile = jest.spyOn(fileOps, 'writeFile');
    spyOnWriteFile.mockResolvedValue('Success');
    const EXPECTED_VALUE = 'Success';
    const receivedData = await deleteAllTodo();
    expect(receivedData).toEqual(EXPECTED_VALUE);
  });
});

describe('updateTodo function', () => {
  const spyOnReadFile = jest.spyOn(fileOps, 'readFile');
  const spyOnAppendFile = jest.spyOn(fileOps, 'appendFile');
  const spyOnWriteFile = jest.spyOn(fileOps, 'writeFile');
  const MOCK_FILE_DATA = '1|First Task|complete\n2|Second Task|incomplete\n';
  const MOCK_TODO_ID = '1';
  const MOCK_UPDATE_TODO = {
    description: 'Update task 1',
    status: 'complete',
  };
  const MOCK_UPDATED_TODO = {
    id: MOCK_TODO_ID,
    ...MOCK_UPDATE_TODO,
  };
  const MOCK_CHANGED_TODO_DATA = '1|Update task 1|complete\n';
  spyOnWriteFile.mockResolvedValue('Success');
  spyOnAppendFile.mockResolvedValue('Success');
  it('should return updated todo on successful updation', async () => {
    spyOnReadFile.mockResolvedValue(MOCK_FILE_DATA);
    const returnedTodo = await updateTodo(MOCK_TODO_ID, MOCK_UPDATE_TODO);
    expect(spyOnWriteFile).toHaveBeenCalledWith(TODO_FILE_PATH, '');
    expect(spyOnAppendFile).toHaveBeenNthCalledWith(1, TODO_FILE_PATH, MOCK_CHANGED_TODO_DATA);
    expect(spyOnAppendFile).toHaveBeenNthCalledWith(2, TODO_FILE_PATH, '2|Second Task|incomplete\n');
    expect(returnedTodo).toEqual(MOCK_UPDATED_TODO);
  });
  it('should throw an error object with todo not found message if there are no todos', async () => {
    spyOnReadFile.mockResolvedValue('');
    try {
      await updateTodo(MOCK_TODO_ID, MOCK_UPDATE_TODO);
    } catch (error) {
      expect(error.message).toBe('Todo not found');
    }
  });
});
