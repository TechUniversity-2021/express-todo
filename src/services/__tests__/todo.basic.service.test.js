const fileOps = require('../../utilities/fsFunctions.utilities');
const {
  getAllTodo, postTodo, getTodo, deleteAllTodo,
} = require('../todo.basic.service');

describe('getAllTodo Function', () => {
  it('should parse file contents to return a json object of todos', async () => {
    const spyOnReadFile = jest.spyOn(fileOps, 'readFile');
    const MOCK_FILE_DATA = '1|First Task|complete\n2|Second Task|incomplete';
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
  it('should throw error object if an error occurs during reading file', async () => {
    const spyOnReadFile = jest.spyOn(fileOps, 'readFile');
    const MOCK_REJECT = new Error('Error in file read');
    spyOnReadFile.mockRejectedValue(MOCK_REJECT);
    const MOCK_EXPECTED_VALUE = [];
    try {
      const receivedData = await getAllTodo();
      expect(receivedData).toEqual(MOCK_EXPECTED_VALUE);
    } catch (error) {
      expect(error.message).toBe('Error reading file data');
    }
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

describe('postTodo Function', () => {
  const MOCK_TODO = {
    id: '1',
    description: 'Task 1',
    status: 'complete',
  };
  const spyOnAppendFile = jest.spyOn(fileOps, 'appendFile');
  const EXPECTED_VALUE = 'Success';
  const EXPECTED_ERROR_MESSAGE = 'Error appending data';
  it('should append data to file and return success message', async () => {
    spyOnAppendFile.mockResolvedValue('Success');
    const receivedData = await postTodo(MOCK_TODO);
    expect(receivedData).toEqual(EXPECTED_VALUE);
  });
  it('should throw error if an error occurs during appending data to file', async () => {
    const MOCK_REJECT = new Error('Error in appending data');
    spyOnAppendFile.mockRejectedValue(MOCK_REJECT);
    try {
      await postTodo(MOCK_TODO);
    } catch (error) {
      expect(error.message).toBe(EXPECTED_ERROR_MESSAGE);
    }
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
  it('should throw todo not found error with status 404 if file is empty', async () => {
    const MOCK_FILE_DATA = '';
    const EXPECTED_ERROR_STATUS = 404;
    const EXPECTED_ERROR_MESSAGE = 'Todo not found';
    spyOnReadFile.mockResolvedValue(MOCK_FILE_DATA);
    try {
      await getTodo(MOCK_TODO_ID);
    } catch (error) {
      expect(error.message).toBe(EXPECTED_ERROR_MESSAGE);
      expect(error.status).toBe(EXPECTED_ERROR_STATUS);
    }
  });
  it('should throw todo not found error with status 404 if no matching todo is found', async () => {
    const MOCK_FILE_DATA = '2|Task 1|incomplete\n';
    const EXPECTED_ERROR_STATUS = 404;
    const EXPECTED_ERROR_MESSAGE = 'Todo not found';
    spyOnReadFile.mockResolvedValue(MOCK_FILE_DATA);
    try {
      await getTodo(MOCK_TODO_ID);
    } catch (error) {
      expect(error.message).toBe(EXPECTED_ERROR_MESSAGE);
      expect(error.status).toBe(EXPECTED_ERROR_STATUS);
    }
  });
  it('should throw error with status 500 if error occurs in reading file', async () => {
    const MOCK_REJECTED_VALUE = new Error('Error Reading data');
    const MOCK_EXPECTED_ERROR_MESSAGE = 'Error Reading data';
    const EXPECTED_ERROR_STATUS = 500;
    spyOnReadFile.mockRejectedValue(MOCK_REJECTED_VALUE);
    try {
      await getTodo(MOCK_TODO_ID);
    } catch (error) {
      expect(error.message).toBe(MOCK_EXPECTED_ERROR_MESSAGE);
      expect(error.status).toBe(EXPECTED_ERROR_STATUS);
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
  it('should throw error object if an error occurs during deletion of todos', async () => {
    const spyOnWriteFile = jest.spyOn(fileOps, 'writeFile');
    const MOCK_REJECT = new Error('Error in file write');
    spyOnWriteFile.mockRejectedValue(MOCK_REJECT);
    const MOCK_EXPECTED_VALUE = [];
    try {
      const receivedData = await deleteAllTodo();
      expect(receivedData).toEqual(MOCK_EXPECTED_VALUE);
    } catch (error) {
      expect(error.message).toBe('Error accessing file');
    }
  });
});
