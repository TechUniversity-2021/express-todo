// const getToDoRepository = require('../repository/todo.repository');
const toDoServices = require('./todo.service');
const { Todo } = require('../models');

describe('getToDos service', () => {
  // const mockResponse = null;
  // const mockRequest = { params: { id: 1 } };
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
  afterEach(() => {
    jest.clearAllMocks();
  });
  // const result = await toDoServices.getToDos(mockDb);
  it('should fetch all todos', async () => {
    jest.spyOn(Todo, 'findAll').mockResolvedValue(expectedValue);
    const result = await toDoServices.getToDos();
    expect(result).toStrictEqual(expectedValue);
  });
});

describe('fetchToDo service', () => {
  // const mockResponse = null;
  // const mockRequest = { params: { id: 1 } };
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
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should fetch the todo by id', async () => {
    jest.spyOn(Todo, 'findOne').mockResolvedValue(expectedValue); // const result = await toDoServices.getToDos(mockDb);
    const result = await toDoServices.fetchToDo(mockId);
    expect(result).toStrictEqual(expectedValue);
  });
});

describe('createToDo service', () => {
  const mockBody = {
    title: 'do science',
  };
  const expectedValue = [
    {
      id: 7,
      title: 'do science',
      status: 'Active',
      updatedAt: '2021-02-24T18:36:16.960Z',
      createdAt: '2021-02-24T18:36:16.960Z',
    },
  ];
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return the created todo', async () => {
    jest.spyOn(Todo, 'create').mockResolvedValue(expectedValue); // const result = await toDoServices.getToDos(mockDb);
    const result = await toDoServices.createToDo(mockBody);
    expect(result).toEqual(expectedValue);
  });
});

describe('updateToDo service', () => {
  const mockBody = {
    title: 'Go to the mall',
    status: 'active',
  };
  const mockId = 4;
  const mockValue = [
    1,
  ];
  const failedMockValue = [
    0,
  ];
  // const result = await toDoServices.getToDos(mockDb);
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return number of rows updated as 1 if success', async () => {
    jest.spyOn(Todo, 'update').mockResolvedValue(mockValue);
    const result = await toDoServices.updateToDo(mockBody, mockId);
    expect(result).toEqual(mockValue);
  });

  it('should return number of rows updated as 0 if failure', async () => {
    jest.spyOn(Todo, 'update').mockResolvedValue(failedMockValue);
    const result = await toDoServices.updateToDo(mockBody, mockId);
    expect(result).toEqual(failedMockValue);
  });
  // check
});

describe('deleteById service', () => {
  const mockId = 4;
  const mockValue = 'OK';
  // const result = await toDoServices.getToDos(mockDb);
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return OK on succesful delete', async () => {
    jest.spyOn(Todo, 'destroy').mockResolvedValue(mockValue);
    const result = await toDoServices.deleteById(mockId);
    expect(result).toEqual(mockValue);
  });
});
