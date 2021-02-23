const todoService = require('../todo.service');
const todoRepository = require('../../repository/todo.repository');

describe('should get todos from db', () => {
  it('should get all todos', async () => {
    const mockResult = [{
      id: 1,
      title: 'Fake Task',
      status: 'Incomplete',
      created_at: '2021-02-22T10:30:42.990Z',
      updated_at: null,
    }];
    jest.spyOn(todoRepository, 'getTodos').mockResolvedValue(mockResult);
    const result = await todoService.getAllTodo(null);
    expect(result).toEqual(mockResult);
  });
});

describe('get todo by ID', () => {
  it('should get todo', async () => {
    const mockResult = [{
      id: 1,
      title: 'Fake Task',
      status: 'Incomplete',
      created_at: '2021-02-22T10:30:42.990Z',
      updated_at: null,
    }, {
      id: 2,
      title: 'Another Fake Task',
      status: 'Complete',
      created_at: '2021-02-22T11:59:18.848Z',
      updated_at: null,
    }];
    jest.spyOn(todoRepository, 'getTodos').mockResolvedValue(mockResult);
    const result = await todoService.getTodoById(null, 1);
    const fail = await todoService.getTodoById(null, 3);
    expect(fail).toEqual('No Such ID');
    expect(result).toEqual(mockResult[0]);
  });
});

describe('Add new TODO', () => {
  it('should add a new todo to list, 1 for updated and 0 for failure', async () => {
    jest.spyOn(todoRepository, 'createTodo').mockResolvedValue(1);
    const result = await todoService.addTodo(null, 'New Todo');
    expect(result).toBe(1);
  });
});

describe('Update todo title and status', () => {
  it('should update todo', async () => {
    const body = {
      todo: 'Update a Todo',
      status: 'Incomplete',
    };
    jest.spyOn(todoRepository, 'updateTodo').mockResolvedValue(1);
    const result = await todoService.updateTodo(null, 1, body);
    expect(result).toBe(1);
  });
});

describe('Delete todo', () => {
  it('should delete todo', async () => {
    jest.spyOn(todoRepository, 'deleteTodo').mockResolvedValue(1);
    const result = await todoService.deleteTodo(null, 1);
    expect(result).toBe(1);
  });
});
