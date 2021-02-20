const fileUtil = require('../utils/fileUtil');
const todoHandler = require('./todo.handler');

describe('Todo handler', () => {
  it('should return a status code of 200 along with todo objects', async () => {
    jest.spyOn(fileUtil, 'readFile').mockResolvedValue('1|break|active');
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };
    await todoHandler.getTodos(null, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith([{ id: '1', todo: 'break', status: 'active' }]);
  });
});
