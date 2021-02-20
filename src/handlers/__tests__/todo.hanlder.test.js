const { getAllTodoHandler, postTodoHandler } = require('../todo.handler');
const todoServices = require('../../services/todo.service');

describe('get(/todo) Handler', () => {
  const mockSend = jest.fn();
  const mockResponseObject = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockRequestObject = null;
  const spyOnGetAllTodo = jest.spyOn(todoServices, 'getAllTodo');
  const MOCK_TODO_OBJECT = [
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
  const MOCK_ERROR = new Error('Error in fetching todos');
  it('should set response status code to 200 on successfull read of todos', async () => {
    spyOnGetAllTodo.mockResolvedValue(MOCK_TODO_OBJECT);
    await getAllTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(200);
  });
  it('should return object of todos', async () => {
    spyOnGetAllTodo.mockResolvedValue(MOCK_TODO_OBJECT);
    await getAllTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(MOCK_TODO_OBJECT);
  });
  it('should set response status code to 500 incase of error in file read', async () => {
    spyOnGetAllTodo.mockRejectedValue(MOCK_ERROR);
    await getAllTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(500);
  });
  it('should return error message in case of failure to read todos', async () => {
    spyOnGetAllTodo.mockRejectedValue(MOCK_ERROR);
    await getAllTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(MOCK_ERROR.message);
  });
});

describe('post(/todo) Handler', () => {
  const mockSend = jest.fn();
  const mockResponseObject = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockRequestObject = {
    body: {

    },
  };
  const MOCK_ERROR = new Error('Error in adding todo');
  const spyOnPostTodo = jest.spyOn(todoServices, 'postTodo');
  it('should set response status code to 200 on successfull append of todo', async () => {
    spyOnPostTodo.mockResolvedValue('MOCK_MESSAGE');
    await postTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(200);
  });
  it('should return message on successfull append of todo', async () => {
    spyOnPostTodo.mockResolvedValue('MOCK_MESSAGE');
    await postTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith('MOCK_MESSAGE');
  });
  it('should set response status code to 500 incase of error in appending todo', async () => {
    spyOnPostTodo.mockRejectedValue(MOCK_ERROR);
    await postTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(500);
  });
  it('should return error message in case of failure to append todo', async () => {
    spyOnPostTodo.mockRejectedValue(MOCK_ERROR);
    await postTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(MOCK_ERROR.message);
  });
});
