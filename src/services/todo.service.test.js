const getToDoRepository = require('../repository/todo.repository');
const toDoServices = require('./todo.service');

// describe('dbFetchToDo service', () => {
//   const mockResponse = null;
//   const mockRequest = { params: { id: 1 } };
//   const expectedValue = [
//     {
//       id: 1,
//       title: 'Go to the mall',
//       status: 'active',
//       created_at: '2021-02-22T11:25:01.457Z',
//       updated_at: null,
//     },
//   ];
//   it('should fetch todo by id', async () => {
//     jest.spyOn(getToDoRepository, 'getTodoById').mockResolvedValue(expectedValue);
//     const result = await toDoServices.dbFetchToDo('db', mockRequest, mockResponse);
//     expect(result).toStrictEqual(expectedValue);
//   });
// });

describe('getToDos service', () => {
  // const mockResponse = null;
  // const mockRequest = { params: { id: 1 } };
  const mockDb = 'abc';
  const expectedValue = [
    {
      id: 1,
      title: 'Go to the mall',
      status: 'active',
      created_at: '2021-02-22T11:25:01.457Z',
      updated_at: null,
    },
    {
      id: 2,
      title: 'Go to the Dubai',
      status: 'inactive',
      created_at: '2021-02-22T11:25:01.457Z',
      updated_at: null,
    },
  ];
  const spyOnToDoRepo = jest.spyOn(getToDoRepository, 'queryGetToDos').mockResolvedValue(expectedValue);
  // const result = await toDoServices.getToDos(mockDb);
  it('should fetch all todos', async () => {
    const result = await toDoServices.getToDos(mockDb);
    expect(result).toEqual(expectedValue);
  });
  it('should pass the db object to the todo repository', async () => {
    // const result = await toDoServices.getToDos(mockDb);
    expect(spyOnToDoRepo).toHaveBeenCalledWith(mockDb);
  });
});

describe('fetchToDo service', () => {
  // const mockResponse = null;
  // const mockRequest = { params: { id: 1 } };
  const mockDb = 'abc';
  const mockId = 4;
  const expectedValue = [
    {
      id: 4,
      title: 'Go to the mall',
      status: 'active',
      created_at: '2021-02-22T11:25:01.457Z',
      updated_at: null,
    },
  ];
  const spyOnToDoRepo = jest.spyOn(getToDoRepository, 'queryGetTodoById').mockResolvedValue(expectedValue);
  // const result = await toDoServices.getToDos(mockDb);
  it('should fetch the todo by id', async () => {
    const result = await toDoServices.fetchToDo(mockDb, mockId);
    expect(result).toEqual(expectedValue);
  });
  it('should pass the db object and id to the todo repository', async () => {
    // const result = await toDoServices.getToDos(mockDb);
    expect(spyOnToDoRepo).toHaveBeenCalledWith(mockDb, mockId);
  });
});

describe('createToDo service', () => {
  // const mockResponse = null;
  // const mockRequest = { params: { id: 1 } };
  const mockDb = 'abc';
  const mockBody = {
    title: 'Go to the mall',
    status: 'active',
  };
  const expectedValue = [
    {
      id: 4,
      title: 'Go to the mall',
      status: 'active',
      created_at: '2021-02-22T11:25:01.457Z',
      updated_at: null,
    },
  ];
  const spyOnToDoRepo = jest.spyOn(getToDoRepository, 'queryCreateToDo').mockResolvedValue(expectedValue);
  // const result = await toDoServices.getToDos(mockDb);
  it('should return the created todo', async () => {
    const result = await toDoServices.createToDo(mockDb, mockBody);
    expect(result).toEqual(expectedValue);
  });
  // check
  it('should pass the db object and body of request to todo repository', async () => {
    // const result = await toDoServices.getToDos(mockDb);
    expect(spyOnToDoRepo).toHaveBeenCalledWith(mockDb, mockBody);
  });
});

describe('updateToDo service', () => {
  // const mockResponse = null;
  // const mockRequest = { params: { id: 1 } };
  const mockDb = 'abc';
  const mockBody = {
    title: 'Go to the mall',
    status: 'active',
  };
  const mockId = 4;
  const expectedValue = [
    {
      id: 4,
      title: 'Go to the mall',
      status: 'active',
      created_at: '2021-02-22T11:25:01.457Z',
      updated_at: null,
    },
  ];
  const spyOnToDoRepo = jest.spyOn(getToDoRepository, 'queryUpdateToDo').mockResolvedValue(expectedValue);
  // const result = await toDoServices.getToDos(mockDb);
  it('should update a todo', async () => {
    const result = await toDoServices.updateToDo(mockDb, mockBody, mockId);
    expect(result).toEqual(expectedValue);
  });
  // check
  it('should pass the db object, body of request, and id to update to todo repository', async () => {
    // const result = await toDoServices.getToDos(mockDb);
    expect(spyOnToDoRepo).toHaveBeenCalledWith(mockDb, mockBody, mockId);
  });
});

describe('deleteById service', () => {
  // const mockResponse = null;
  // const mockRequest = { params: { id: 1 } };
  const mockDb = 'abc';
  const mockBody = {
    title: 'Go to the mall',
    status: 'active',
  };
  const mockId = 4;
  const expectedValue = [
    {
      id: 4,
      title: 'Go to the mall',
      status: 'active',
      created_at: '2021-02-22T11:25:01.457Z',
      updated_at: null,
    },
  ];
  const spyOnToDoRepo = jest.spyOn(getToDoRepository, 'queryDeleteToDoById').mockResolvedValue(expectedValue);
  // const result = await toDoServices.getToDos(mockDb);
  it('should delete a todo by id', async () => {
    const result = await toDoServices.deleteById(mockDb, mockId);
    expect(result).toEqual(expectedValue);
  });
  // check
  it('should pass the db object, and id to delete to todo repository', async () => {
    // const result = await toDoServices.getToDos(mockDb);
    expect(spyOnToDoRepo).toHaveBeenCalledWith(mockDb, mockId);
  });
});
