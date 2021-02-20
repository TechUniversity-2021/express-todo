const { todoHandler } = require('../todo.handler');
const todoServices = require('../../services/todo.services');

describe('Todo Handler', () => {
  it('should set a status code of 200', async () => {
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const spyOnTodoServices = jest.spyOn(todoServices, 'getTodos');
    spyOnTodoServices.mockResolvedValue('{id: abc todo: xyz status: Completed}');
    await todoHandler(null, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
  it('should set response send data', async () => {
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const spyOnTodoServices = jest.spyOn(todoServices, 'getTodos');
    spyOnTodoServices.mockResolvedValue('{id: abc todo: xyz status: Completed}');
    await todoHandler(null, mockResponse);
    expect(mockSend).toHaveBeenCalledWith('{id: abc todo: xyz status: Completed}');
  });
});
