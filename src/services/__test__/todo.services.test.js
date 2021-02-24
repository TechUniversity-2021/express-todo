const todosService = require('../todo.services');

const { Todo } = require('../../models');

describe('get all todos ', () => {
  it('should get all todos from database', async () => {
    const ResolvedValue = {
      id: 17,
      title: 'assignments',
      status: 'Completed',
      created_at: '2021-02-23T07:16:32.824Z',
      updated_at: null,
    };
    jest.spyOn(Todo, 'findAll').mockResolvedValue(ResolvedValue);
    const todo = await todosService.getTodos();
    expect(todo).toBe(ResolvedValue);
  });
});

describe('get a todo from database of given id', () => {
  it('should get 1 todo ', async () => {
    const ResolvedValue = {
      id: 17,
      title: 'assignments',
      status: 'Completed',
      created_at: '2021-02-23T07:16:32.824Z',
      updated_at: null,
    };
    jest.spyOn(Todo, 'findAll').mockResolvedValue(ResolvedValue);
    const todo = await todosService.getTodosById('db');
    expect(todo).toBe(ResolvedValue);
  });
});

describe('create todo', () => {
  const mockResolved = { id: 1 };
  it('should create a new todo in database', async () => {
    jest.spyOn(Todo, 'create').mockResolvedValue(mockResolved);
    const response = await todosService.createTodo('db', 'sleep', 'active');
    expect(response).toBe(mockResolved);
  });
});

describe('update todo', () => {
  const mockResolved = { id: 1 };
  it('should update todo in database', async () => {
    jest.spyOn(Todo, 'update').mockResolvedValue(mockResolved);
    const response = await todosService.updateTodo('db', 'sleep', 'active', 1);
    expect(response).toBe(mockResolved);
  });
});

describe('delete todo', () => {
  const mockResolved = { id: 1 };
  it('should delete todo in database', async () => {
    jest.spyOn(Todo, 'destroy').mockResolvedValue(mockResolved);
    const response = await todosService.deleteById('db', 1);
    expect(response).toBe(mockResolved);
  });
});

describe('delete ALL', () => {
  const mockResolved = { id: 1 };
  it('should all delete todo in database', async () => {
    jest.spyOn(Todo, 'destroy').mockResolvedValue(mockResolved);
    const response = await todosService.deleteAll('db');
    expect(response).toBe(mockResolved);
  });
});
