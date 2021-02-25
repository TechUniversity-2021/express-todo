const todoService = require('../todo.service');
const todoRepository = require('../../repository/todo.repository');
const { Todo } = require('../../models');

describe('should get todos from db', () => {
  it('should get all todos', async () => {
    const mockResult = [{
      id: 3,
      title: 'Adding Task',
      status: 'Incomplete',
      createdAt: '2021-02-24T18:26:18.104Z',
      updatedAt: '2021-02-24T18:26:18.104Z',
    }];
    jest.spyOn(Todo, 'findAll').mockResolvedValue(mockResult);
    const result = await todoService.getAllTodo();
    expect(result).toEqual(mockResult);
  });
});

describe('get todo by ID', () => {
  it('should get todo', async () => {
    const mockResult = [{
      id: 3,
      title: 'Adding Task',
      status: 'Incomplete',
      createdAt: '2021-02-24T18:26:18.104Z',
      updatedAt: '2021-02-24T18:26:18.104Z',
    }];
    jest.spyOn(Todo, 'findAll').mockResolvedValue(mockResult);
    const result = await todoService.getTodoById(3);
    expect(result).toEqual(mockResult);
  });
});

describe('Add new TODO', () => {
  it('should add a new todo to list, 1 for updated and 0 for failure', async () => {
    jest.spyOn(Todo, 'create').mockResolvedValue(1);
    const result = await todoService.addTodo('New Todo', 'Incomplete');
    expect(result).toBe(1);
  });
});

describe('Update todo title and status', () => {
  it('should update todo', async () => {
    jest.spyOn(Todo, 'update').mockResolvedValue(1);
    const result = await todoService.updateTodo(1, 'Update a Todo', 'Incomplete');
    expect(result).toBe(1);
  });
});

describe('Delete todo', () => {
  it('should delete todo', async () => {
    jest.spyOn(Todo, 'destroy').mockResolvedValue(1);
    const result = await todoService.deleteTodo(1);
    expect(result).toBe(1);
  });
});
