const fileOps = require('../../utilities/fsFunctions.utilities');
const { getAllTodo, postTodo } = require('../todo.service');

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
  it('should return error object if an error occurs during reading file', async () => {
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
  it('should append data to file and return success message ', async () => {
    spyOnAppendFile.mockResolvedValue('Success');
    const receivedData = await postTodo(MOCK_TODO);
    expect(receivedData).toEqual(EXPECTED_VALUE);
  });
  it('should return error if an error occurs during appending data to file', async () => {
    const MOCK_REJECT = new Error('Error in appending data');
    spyOnAppendFile.mockRejectedValue(MOCK_REJECT);
    try {
      const receivedData = await postTodo(MOCK_TODO);
      expect(receivedData).toEqual(EXPECTED_VALUE);
    } catch (error) {
      expect(error.message).toBe(EXPECTED_ERROR_MESSAGE);
    }
  });
});
