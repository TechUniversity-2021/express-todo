const { getAllTodosHandler, createTodoHandler } = require('../todo.handler');
const service = require('../../services/todo.service');

describe('getAllTodos Handler', () => {
  it('should return response with status code and all todo data', async () => {
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReturnObject = {
      id: 1,
      title: 'coding',
      staus: 'active',
    };

    const getAllTodosServiceSpy = jest.spyOn(service, 'getAllTodos');
    getAllTodosServiceSpy.mockImplementation(() => Promise.resolve(mockReturnObject));

    await getAllTodosHandler(null, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(mockReturnObject);
  });
});

describe('createTodoHandler Handler', () => {
  it('should return response with status code and message', async () => {
    const MockRequest = {
      body: {},
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const mockReturnObject = {
      status: 200,
      message: 'finish',
    };

    jest.spyOn(service, 'createTodo').mockResolvedValue(mockReturnObject);

    await createTodoHandler(MockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(mockReturnObject.status);
    expect(mockSend).toHaveBeenCalledWith(mockReturnObject.message);
  });
});
