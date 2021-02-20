const fileUtils = require('../utils/file-utils');
const todoService = require('./todo.service');

// mockImplementation callbacks
// mockresolved promises

describe('Todo service', () => {
  it('should return a list of todos when file read is successful', async () => {
    jest.spyOn(fileUtils, 'getFileData').mockResolvedValue('1|break|active\n2|break|active');
    const response = await todoService.getTodos();
    expect(response).toStrictEqual([{ id: '1', todo: 'break', status: 'active' }, { id: '2', todo: 'break', status: 'active' }]);
  });
});
