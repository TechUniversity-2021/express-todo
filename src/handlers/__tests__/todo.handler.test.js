const allToDoHandlers = require('../todo.handler');
const toDoServices = require('/Users/Asmita_Hajra/express-todo/src/services/todo.service');

// const { allServices } = require('../services/todo.service');
// const { quoteHandler } = require('../quote.handler');
// const { quoteHandler } = require('../quote.handler');

// describe('Get to do handler', async () => {
//   const mockSend = jest.fn();
//   const mockRequest = null;
//   const mockResponse = {
//     status: jest.fn(() => ({ send: mockSend })), // in arrow func if returning object wrap in paranthesis
//   };
//   jest.spyOn(allServices, 'getFileData').mockResolvedValue([{id: 1, title:"abc", status:"complete"}, {id: 2, title:"xyz", status:"incomplete"}])
//   it('should set response status code to 200', () => {
//     allToDoHandlers.getToDoHandler(mockRequest, mockResponse);
//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//   });

//   it('should send list of ToDo objects', () => {
//     allToDoHandlers.getToDoHandler(mockRequest, mockResponse);
//     expect(mockResponse.status().send).toHaveBeenCalledWith(');
//   });
// });

// describe('Get to do handler', async () => {
//   const mockSend = jest.fn();
//   const mockRequest = null;
//   const mockResponse = {
//     status: jest.fn(() => ({ send: mockSend })), // in arrow func if returning object wrap in paranthesis
//   };
//   jest.spyOn(allServices, 'getFileData').mockResolvedValue([{id: 1, title:"abc", status:"complete"}, {id: 2, title:"xyz", status:"incomplete"}])
//   it('should set response status code to 200', () => {
//     allToDoHandlers.getToDoHandler(mockRequest, mockResponse);
//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//   });

//   it('should send list of ToDo objects', () => {
//     allToDoHandlers.getToDoHandler(mockRequest, mockResponse);
//     expect(mockResponse.status().send).toHaveBeenCalledWith(');
//   });
// });

describe('Get to do handler', () => {
  const mockSend = jest.fn();
  const mockRequest = { app: { locals: { db: 'abc' } } };
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockValue = [{
    id: 4,
    title: 'Go to market',
    status: 'inactive',
    created_at: '2021-02-23T02:12:32.882Z',
    updated_at: null,
  }, {
    id: 5,
    title: 'Go to college',
    status: 'active',
    created_at: '2021-02-23T02:12:32.882Z',
    updated_at: null,
  }];

  const failedMockValue = [];
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set response status code to 200 and fetch all todos', async () => {
    const spyOnToDoService = jest.spyOn(toDoServices, 'getToDos');
    spyOnToDoService.mockResolvedValue(mockValue);
    await allToDoHandlers.getToDoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
  });

  it("should set response status code to 400 , and return 'No todos to be found' if no todos are returned", async () => {
    const spyOnToDoService = jest.spyOn(toDoServices, 'getToDos');
    spyOnToDoService.mockResolvedValue(failedMockValue);
    await allToDoHandlers.getToDoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.status().send).toHaveBeenCalledWith('No todos to be found');
  });

  it('should pass the db object to getToDo service', async () => {
    const spyOnToDoService = jest.spyOn(toDoServices, 'getToDos');
    spyOnToDoService.mockResolvedValue(mockValue);
    await allToDoHandlers.getToDoHandler(mockRequest, mockResponse);
    expect(spyOnToDoService).toHaveBeenCalledWith(mockRequest.app.locals.db);
  });
});

describe('Get by Id to do handler', () => {
  const mockSend = jest.fn();
  const mockRequest = { params: { id: '4' }, app: { locals: { db: 'abc' } } };
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockValue = [{
    id: 4,
    title: 'Go to market',
    status: 'inactive',
    created_at: '2021-02-23T02:12:32.882Z',
    updated_at: null,
  }];
  const failedMockValue = [];
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set response status code to 200 and return fetched value', async () => {
    const spyOnToDoService = jest.spyOn(toDoServices, 'fetchToDo');
    spyOnToDoService.mockResolvedValue(mockValue);
    await allToDoHandlers.getByIdToDoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
  });
  it("should set response status code to 400 , and return 'No todo to be found' if no todo is returned", async () => {
    const spyOnToDoService = jest.spyOn(toDoServices, 'fetchToDo');
    spyOnToDoService.mockResolvedValue(failedMockValue);
    await allToDoHandlers.getByIdToDoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.status().send).toHaveBeenCalledWith('No todo to be found');
  });

  it('should pass the db object and id to fetchToDo service', async () => {
    const spyOnToDoService = jest.spyOn(toDoServices, 'fetchToDo');
    spyOnToDoService.mockResolvedValue(mockValue);
    await allToDoHandlers.getByIdToDoHandler(mockRequest, mockResponse);
    expect(spyOnToDoService).toHaveBeenCalledWith(mockRequest.app.locals.db, mockRequest.params.id);
  });
});

describe('post to do handler', () => {
  const mockSend = jest.fn();
  const mockRequest = { app: { locals: { db: 'abc' } }, body: { title: 'Go to Spain', status: 'active' } };
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockValue = [{
    id: 4,
    title: 'Go to Spain',
    status: 'active',
    created_at: '2021-02-23T02:12:32.882Z',
    updated_at: null,
  }];
  const failedMockValue = [];
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set response status code to 201, and return created todo', async () => {
    const spyOnToDoService = jest.spyOn(toDoServices, 'createToDo');
    spyOnToDoService.mockResolvedValue(mockValue);
    await allToDoHandlers.postToDoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
  });
  it("should set response status code to 400 , and return 'Failed to create todo' if no todo is returned", async () => {
    const spyOnToDoService = jest.spyOn(toDoServices, 'createToDo');
    spyOnToDoService.mockResolvedValue(failedMockValue);
    await allToDoHandlers.postToDoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.status().send).toHaveBeenCalledWith('Failed to create todo');
  });
  it('should pass the db object and body of request to createToDo service', async () => {
    const spyOnToDoService = jest.spyOn(toDoServices, 'createToDo');
    spyOnToDoService.mockResolvedValue(mockValue);
    await allToDoHandlers.postToDoHandler(mockRequest, mockResponse);
    expect(spyOnToDoService).toHaveBeenCalledWith(mockRequest.app.locals.db, mockRequest.body);
  });
});

describe('put to do handler', () => {
  const mockSend = jest.fn();
  const mockRequest = { app: { locals: { db: 'abc' } }, body: { title: 'Go to Spain', status: 'active' }, params: { id: '4' } };
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockValue = [{
    id: 4,
    title: 'Go to Spain',
    status: 'active',
    created_at: '2021-02-23T02:12:32.882Z',
    updated_at: null,
  }];
  const failedMockValue = [];
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set response status code to 200 and return updated todo', async () => {
    const spyOnToDoService = jest.spyOn(toDoServices, 'updateToDo');
    spyOnToDoService.mockResolvedValue(mockValue);
    await allToDoHandlers.putToDoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
  });

  it("should set response status code to 400 , and return 'Failed to update todo' if no todo is returned", async () => {
    const spyOnToDoService = jest.spyOn(toDoServices, 'updateToDo');
    spyOnToDoService.mockResolvedValue(failedMockValue);
    await allToDoHandlers.putToDoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.status().send).toHaveBeenCalledWith('Failed to update todo');
  });

  it('should pass the db object, body of request, and id of todo to update to updateToDo service', async () => {
    const spyOnToDoService = jest.spyOn(toDoServices, 'updateToDo');
    spyOnToDoService.mockResolvedValue(mockValue);
    await allToDoHandlers.putToDoHandler(mockRequest, mockResponse);
    // eslint-disable-next-line max-len
    expect(spyOnToDoService).toHaveBeenCalledWith(mockRequest.app.locals.db, mockRequest.body, mockRequest.params.id);
  });
});

describe('delete by id todo handler', () => {
  const mockSend = jest.fn();
  const mockRequest = { app: { locals: { db: 'abc' } }, params: { id: '4' } };
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockValue = [{
    id: 4,
    title: 'Go to market',
    status: 'inactive',
    created_at: '2021-02-23T02:12:32.882Z',
    updated_at: null,
  }];
  const failedMockValue = [];
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set response status code to 200 and return deleted todo', async () => {
    const spyOnToDoService = jest.spyOn(toDoServices, 'deleteById');
    spyOnToDoService.mockResolvedValue(mockValue);
    await allToDoHandlers.deleteByIdToDoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
  });

  it("should set response status code to 400 , and return 'Failed to delete todo' if no todo is returned", async () => {
    const spyOnToDoService = jest.spyOn(toDoServices, 'deleteById');
    spyOnToDoService.mockResolvedValue(failedMockValue);
    await allToDoHandlers.deleteByIdToDoHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.status().send).toHaveBeenCalledWith('Failed to delete todo');
  });

  it('should pass the db object, body of request, and id of todo to update to updateToDo service', async () => {
    const spyOnToDoService = jest.spyOn(toDoServices, 'deleteById');
    spyOnToDoService.mockResolvedValue(mockValue);
    await allToDoHandlers.deleteByIdToDoHandler(mockRequest, mockResponse);
    // eslint-disable-next-line max-len
    expect(spyOnToDoService).toHaveBeenCalledWith(mockRequest.app.locals.db, mockRequest.params.id);
  });
});
