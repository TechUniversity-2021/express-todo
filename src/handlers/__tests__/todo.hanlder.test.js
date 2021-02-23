const {
  getAllTodoHandler, postTodoHandler, getTodoHandler,
  updateTodoHandler, deleteTodoHandler, deleteAllTodoHandler, deleteStatusTodoHandler,
} = require('../todo.handler');
const todoServices = require('../../services');
const FileOperationError = require('../../errors/fileOperation.errors');
const NonExistentError = require('../../errors/nonExistent.errors');

describe('get(/todo) Handler', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const mockSend = jest.fn();
  const mockResponseObject = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockRequestObject = {
    app: {
      locals: 'db',
    },
  };
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
  it('should set status code to 500 if error in accessing db', async () => {
    spyOnGetAllTodo.mockRejectedValue(new Error('Error in accessing data'));
    await getAllTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(500);
  });
});

describe('post(/todo) Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockSend = jest.fn();
  const mockResponseObject = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockRequestObject = {
    body: {
      description: 'Task 1',
      status: 'complete',
    },
    app: {
      locals: 'db',
    },
  };
  const MOCK_EXPECT_TODO = [
    {
      id: '1',
      description: 'Task 1',
      status: 'complete',
    },
  ];
  const spyOnCreateTodo = jest.spyOn(todoServices, 'createTodo');
  it('should set response status code to 201 on successfull append of todo', async () => {
    spyOnCreateTodo.mockResolvedValue(MOCK_EXPECT_TODO);
    await postTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(201);
  });
  it('should return the created todo on successfull append', async () => {
    spyOnCreateTodo.mockResolvedValue(MOCK_EXPECT_TODO);
    await postTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(MOCK_EXPECT_TODO[0]);
  });
});

describe('get(/todo/id) Handler', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const mockSend = jest.fn();
  const mockResponseObject = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockRequestObject = {
    params: {

    },
    app: {
      locals: 'db',
    },
  };
  const spyOnGetTodo = jest.spyOn(todoServices, 'getTodo');
  it('should set response status code to 200 and return todo object on successfull fetch of todo', async () => {
    const MOCK_TODO_OBJECT = [{
      id: '1',
      description: 'Task 1',
      status: 'incomplete',
    }];
    spyOnGetTodo.mockResolvedValue(MOCK_TODO_OBJECT);
    await getTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(200);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(MOCK_TODO_OBJECT[0]);
  });
  it('should return todo not found message and set status code to 404 if todo not found', async () => {
    spyOnGetTodo.mockResolvedValue([]);
    await getTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(404);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith('Todo not found');
  });
});

describe('put(/todo/id) Handler', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const mockSend = jest.fn();
  const mockResponseObject = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const MOCK_TODO_ID = '1';
  const mockRequestObject = {
    params: {
      id: MOCK_TODO_ID,
    },
    body: {
      description: 'Update Task 1',
      status: 'complete',
    },
    app: {
      locals: 'db',
    },
  };
  const MOCK_EXPECT_TODO = {
    id: '1',
    description: 'Update Task 1',
    status: 'complete',
  };
  const MOCK_ERROR_NON_EXISTENT = new NonExistentError('Todo not found');
  const spyOnUpdateTodo = jest.spyOn(todoServices, 'updateTodo');
  it('should set response status code to 200 and return updated todo on successful updation', async () => {
    const MOCK_RESOLVED_VALUE = [{
      id: '1',
      description: 'Update Task 1',
      status: 'complete',
    }];
    spyOnUpdateTodo.mockResolvedValue(MOCK_RESOLVED_VALUE);
    await updateTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(200);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(MOCK_EXPECT_TODO);
  });
  it('should return todo not found error and set status code to 404 if todo not found', async () => {
    spyOnUpdateTodo.mockRejectedValue(MOCK_ERROR_NON_EXISTENT);
    await updateTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(404);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(MOCK_ERROR_NON_EXISTENT.message);
  });
});

describe('delete(/todo/:id) Handler', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const mockSend = jest.fn();
  const mockResponseObject = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const MOCK_TODO_ID = '1';
  const mockRequestObject = {
    params: {
      id: MOCK_TODO_ID,
    },
    app: {
      locals: 'db',
    },
  };
  const MOCK_ERROR_NON_EXISTENT = new NonExistentError('Todo not found');
  const spyOnDeleteTodo = jest.spyOn(todoServices, 'deleteTodo');
  it('should set response status code to 200 and return success message on successful updation', async () => {
    spyOnDeleteTodo.mockResolvedValue('Success');
    await deleteTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(200);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith('Success');
  });
  it('should return todo not found error and set status code to 404 if todo not found', async () => {
    spyOnDeleteTodo.mockRejectedValue(MOCK_ERROR_NON_EXISTENT);
    await deleteTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(404);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(MOCK_ERROR_NON_EXISTENT.message);
  });
});

xdescribe('delete(/todo/all) Handler', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  const mockSend = jest.fn();
  const mockResponseObject = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockRequestObject = null;
  const spyOnDeleteAllTodo = jest.spyOn(todoServices, 'deleteAllTodo');
  it('should set response status code to 200 and return success message on successful deletion', async () => {
    const EXPECTED_VALUE = 'Success';
    spyOnDeleteAllTodo.mockResolvedValue('Success');
    await deleteAllTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(200);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(EXPECTED_VALUE);
  });
  it('should throw error object if error in file operations and set status code to 500', async () => {
    const MOCK_ERROR_FILE_OPS = new FileOperationError('Error accessing file');
    spyOnDeleteAllTodo.mockRejectedValue(MOCK_ERROR_FILE_OPS);
    await deleteAllTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(500);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(MOCK_ERROR_FILE_OPS.message);
  });
});

xdescribe('delete(/todo) Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockSend = jest.fn();
  const mockResponseObject = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockRequestObject = {
    query: {

    },

  };
  const MOCK_ERROR_FILE_OPS = new FileOperationError('Error accessing file');
  const MOCK_ERROR_NON_EXISTENT = new NonExistentError('Todo not found');
  const spyOnDeleteStatusTodo = jest.spyOn(todoServices, 'deleteStatusTodo');
  it('should set response status code to 200 and return success message on successful deletion', async () => {
    const EXPECTED_VALUE = 'Success';
    spyOnDeleteStatusTodo.mockResolvedValue('Success');
    await deleteStatusTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(200);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(EXPECTED_VALUE);
  });
  it('should return todo not found error and set status code to 404 if todo not found', async () => {
    spyOnDeleteStatusTodo.mockRejectedValue(MOCK_ERROR_NON_EXISTENT);
    await deleteStatusTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(404);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(MOCK_ERROR_NON_EXISTENT.message);
  });
  it('should return error aceessing file and set response status code to 500 incase of error in file operations', async () => {
    spyOnDeleteStatusTodo.mockRejectedValue(MOCK_ERROR_FILE_OPS);
    await deleteStatusTodoHandler(mockRequestObject, mockResponseObject);
    expect(mockResponseObject.status).toHaveBeenCalledWith(500);
    expect(mockResponseObject.status().send).toHaveBeenCalledWith(MOCK_ERROR_FILE_OPS.message);
  });
});
