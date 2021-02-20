const { getAllTodosHandler } = require('../todo.handler');
const service = require('../../services/todo.service');

describe('getAllTodos Handler', () => {
  beforeEach(() => {
    const getAllTodosServiceSpy = jest.spyOn(service, 'getAllTodos');
    getAllTodosServiceSpy.mockImplementation(() => Promise.resolve(['appy', 'shub', 'priya']));
  });
  it('should set response status code 200', async () => {
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    await getAllTodosHandler(null, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('should send tasks data as response', async () => {
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    await getAllTodosHandler(null, mockResponse);
    expect(mockSend).toHaveBeenCalledWith(['appy', 'shub', 'priya']);
  });
});
