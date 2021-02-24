const { Todo } = require('../../models');
const {
  getTodos, postTodos, putTodos, getTodoById, deleteTodo,
} = require('../todo.services');

describe('Get Todo', () => {
  it('should return the list of todos', async () => {
    const mockResponse = [
      {
        id: 1,
        title: 'Hii',
        status: 'Active',
        created_at: '2021-02-22T10:14:34.888Z',
        updated_at: null,
      },
    ];
    jest.spyOn(Todo, 'findAll').mockResolvedValue(mockResponse);
    const todoObjects = await getTodos();
    expect(todoObjects).toEqual(mockResponse);
  });
});

describe('Post Todo', () => {
  it('should add to the list of todos', async () => {
    const mockValue = {
      todo: 'll',
      status: 'Inactive',
    };
    const spyOnPostTodoModdel = jest.spyOn(Todo, 'create').mockResolvedValue(mockValue);
    const responseMessage = await postTodos(mockValue);
    expect(spyOnPostTodoModdel).toHaveBeenCalledWith(mockValue);
    expect(responseMessage).toStrictEqual(`New todo has been created: ${mockValue}`);
  });
});

describe('Put Todo', () => {
  it('should update to the list of todos', async () => {
    const mockValue = {
      todo: 'll',
      status: 'Inactive',
    };
    const query = {
      where: {
        id: '1',
      },
    };
    const spyOnPutTodoModel = jest.spyOn(Todo, 'update').mockResolvedValue(mockValue);
    const responseValue = await putTodos('1', mockValue);
    expect(spyOnPutTodoModel).toHaveBeenCalledWith(mockValue, query);
    expect(responseValue).toStrictEqual(`Updated id ${mockValue}`);
  });
});

describe('Get Todo By Id', () => {
  it('should return the particular todo from the database', async () => {
    const mockResponse = [
      {
        id: 1,
        title: 'Hii',
        status: 'Active',
        created_at: '2021-02-22T10:14:34.888Z',
        updated_at: null,
      },
    ];
    const query = {
      where: {
        id: 1,
      },
    };
    const spyOnTodoModel = jest.spyOn(Todo, 'findOne').mockResolvedValue(mockResponse);
    const todoByIdResult = await getTodoById(1);
    expect(todoByIdResult).toStrictEqual(mockResponse);
    expect(spyOnTodoModel).toHaveBeenCalledWith(query);
  });
});

describe('Delete By todo id', () => {
  it('should return the deleted id', async () => {
    const query = {
      where: {
        id: 1,
      },
    };
    const spyOnPutTodoModel = jest.spyOn(Todo, 'destroy').mockResolvedValue(1);
    const responseValue = await deleteTodo(1);
    expect(spyOnPutTodoModel).toHaveBeenCalledWith(query);
    expect(responseValue).toStrictEqual('Deleted id 1');
  });
  it('should return an empty array if id not found', async () => {
    const query = {
      where: {
        id: 'abc',
      },
    };
    const spyOnPutTodoModel = jest.spyOn(Todo, 'destroy').mockResolvedValue(0);
    const responseValue = await deleteTodo('abc');
    expect(spyOnPutTodoModel).toHaveBeenCalledWith(query);
    expect(responseValue).toStrictEqual([]);
  });
});
