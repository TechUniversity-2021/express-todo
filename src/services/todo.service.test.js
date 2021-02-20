const fileOps = require('../utilities/fsFunctions.utilities');
const { getAllTodo } = require('./todo.service');

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
  it('should return empty array if an error occurs during reading file', async () => {
    const spyOnReadFile = jest.spyOn(fileOps, 'readFile');
    const MOCK_REJECT = new Error('Error in file reading');
    spyOnReadFile.mockRejectedValue(MOCK_REJECT);
    const MOCK_EXPECTED_VALUE = [];
    const receivedData = await getAllTodo();
    expect(receivedData).toEqual(MOCK_EXPECTED_VALUE);
  });
});
