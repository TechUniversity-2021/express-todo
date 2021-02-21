const {
  getAllTodoHandler, postTodoHandler, getTodoHandler, updateTodoHandler, deleteTodoHandler,
} = require('../todo.handler');
const todoServices = require('../../services');

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

describe('get(/todo/id) Handler', () => {
  const mockSend = jest.fn();
  const mockResponseObject = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockRequestObject = {
    params: {

    },
  };
  const spyOnGetTodo = jest.spyOn(todoServices, 'getTodo');
  it('should set response status code to 200 and return todo object on successfull fetch of todo', async () => {
    const MOCK_TODO_OBJECT = {
      id: '1',
      description: 'Task 1',
      status: 'incomplete',
    };
    spyOnGetTodo.mockResolvedValue(MOCK_TODO_OBJECT);
    await getTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(200);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(MOCK_TODO_OBJECT);
  });
  it('should return todo not found error and set status code to 404 if todo not found', async () => {
    const REJECTED_ERROR_OBJECT = {
      message: 'Todo not found',
      status: 404,
    };
    spyOnGetTodo.mockRejectedValue(REJECTED_ERROR_OBJECT);
    await getTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(404);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(REJECTED_ERROR_OBJECT.message);
  });
  it('should return error reading data and set response status code to 500 incase of error in reading file', async () => {
    const REJECTED_ERROR_OBJECT = {
      message: 'Error in reading file',
      status: 500,
    };
    spyOnGetTodo.mockRejectedValue(REJECTED_ERROR_OBJECT);
    await getTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(500);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(REJECTED_ERROR_OBJECT.message);
  });
});

describe('put(/todo/id) Handler', () => {
  const mockSend = jest.fn();
  const mockResponseObject = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockRequestObject = {
    params: {

    },
    body: {

    },
  };
  const spyOnUpdateTodo = jest.spyOn(todoServices, 'updateTodo');
  it('should set response status code to 200 and return success message on successful updation', async () => {
    const EXPECTED_VALUE = 'Success';
    spyOnUpdateTodo.mockResolvedValue('Success');
    await updateTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(200);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(EXPECTED_VALUE);
  });
  it('should return todo not found error and set status code to 404 if todo not found', async () => {
    const REJECTED_ERROR_OBJECT = {
      message: 'Todo not found',
      status: 404,
    };
    spyOnUpdateTodo.mockRejectedValue(REJECTED_ERROR_OBJECT);
    await updateTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(404);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(REJECTED_ERROR_OBJECT.message);
  });
  it('should return error aceessing file and set response status code to 500 incase of error in reading or appending file', async () => {
    const REJECTED_ERROR_OBJECT = {
      message: 'Error in accessing file',
      status: 500,
    };
    spyOnUpdateTodo.mockRejectedValue(REJECTED_ERROR_OBJECT);
    await updateTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(500);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(REJECTED_ERROR_OBJECT.message);
  });
});

describe('delete(/todo/id) Handler', () => {
  const mockSend = jest.fn();
  const mockResponseObject = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockRequestObject = {
    params: {

    },

  };
  const spyOnDeleteTodo = jest.spyOn(todoServices, 'deleteTodo');
  it('should set response status code to 200 and return success message on successful deletion', async () => {
    const EXPECTED_VALUE = 'Success';
    spyOnDeleteTodo.mockResolvedValue('Success');
    await deleteTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(200);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(EXPECTED_VALUE);
  });
  it('should return todo not found error and set status code to 404 if todo not found', async () => {
    const REJECTED_ERROR_OBJECT = {
      message: 'Todo not found',
      status: 404,
    };
    spyOnDeleteTodo.mockRejectedValue(REJECTED_ERROR_OBJECT);
    await deleteTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(404);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(REJECTED_ERROR_OBJECT.message);
  });
  it('should return error aceessing file and set response status code to 500 incase of error in reading or appending file', async () => {
    const REJECTED_ERROR_OBJECT = {
      message: 'Error in accessing file',
      status: 500,
    };
    spyOnDeleteTodo.mockRejectedValue(REJECTED_ERROR_OBJECT);
    await deleteTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(500);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(REJECTED_ERROR_OBJECT.message);
  });
});
