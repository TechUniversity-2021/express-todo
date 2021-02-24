const { Todo } = require('../models'); // todos should be same as modelName in model->todos.js
const todoService = require('./todo.service');

// anything which has await before it mock

describe('Todo service', () => {
  it('should get a list of todos', async () => {
    const mockResponse = [
      {
        id: 1,
        title: 'Take xerox',
        status: 'active',
        created_at: '2021-02-22T10:24:28.027Z',
        updated_at: null,
      },
    ];
    jest
      .spyOn(Todo, 'findAll')
      .mockResolvedValue(mockResponse);
    const response = await todoService.getTodo();
    expect(response).toStrictEqual(mockResponse); // coz function is returning
  });

  it('should get a todo of respective id', async () => {
    const mockResponse = [
      {
        id: 1,
        title: 'Take xerox',
        status: 'active',
        created_at: '2021-02-22T10:24:28.027Z',
        updated_at: null,
      },
    ];
    const spyOnTodoByIdRepo = jest
      .spyOn(Todo, 'findAll')
      .mockResolvedValue(mockResponse);
    const response = await todoService.getTodoWithId('1');
    expect(response).toStrictEqual(mockResponse);
    expect(spyOnTodoByIdRepo).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
    });
  });

  it('should create a new todo', async () => {
    const mockResponse = {
      id: 12,
      title: 'Water plants',
      status: 'Active',
      created_at: '2021-02-23T06:52:56.207Z',
      updated_at: null,
    };
    const spyOnCreateTodoRepo = jest
      .spyOn(Todo, 'create')
      .mockResolvedValue(mockResponse);
    const response = await todoService.postTodo({ todo: 'Water plants', status: 'Active' });
    expect(response).toStrictEqual(mockResponse);
    expect(spyOnCreateTodoRepo).toHaveBeenCalledWith({ title: 'Water plants', status: 'Active' });
  });

  it('should update a todo based on id', async () => {
    const mockResponse = [
      1,
      [
        {
          id: 8,
          title: 'Hello',
          status: 'Active',
          createdAt: '2021-02-24T09:40:17.992Z',
          updatedAt: '2021-02-24T10:12:26.802Z',
        },
      ],
    ];
    const spyOnUpdateTodoRepo = jest
      .spyOn(Todo, 'update')
      .mockResolvedValue(mockResponse);
    const response = await todoService.updateTodo(12, { todo: 'Water terrace plants', status: 'Completed' });
    expect(response).toStrictEqual(mockResponse[1]);
    expect(spyOnUpdateTodoRepo).toHaveBeenCalledWith({ title: 'Water terrace plants', status: 'Completed' },
      {
        where: {
          id: 12,
        },
        returning: true,
      });
  });

  it('should delete a todo based on id', async () => {
    const mockResponse = [
      {
        id: 12,
        title: 'Water plants',
        status: 'Active',
        created_at: '2021-02-23T06:52:56.207Z',
        updated_at: null,
      },
    ];
    const spyOnDeleteTodoRepo = jest
      .spyOn(Todo, 'destroy')
      .mockResolvedValue(mockResponse);
    const response = await todoService.deleteTodoWithId(12);
    expect(response).toStrictEqual(mockResponse);
    expect(spyOnDeleteTodoRepo).toHaveBeenCalledWith({
      where: {
        id: 12,
      },
    });
  });
  it('should delete all todos', async () => {
    const mockResponse = [
      {
        id: 12,
        title: 'Water plants',
        status: 'Active',
        created_at: '2021-02-23T06:52:56.207Z',
        updated_at: null,
      },
    ];
    const spyOnDeleteTodoRepo = jest
      .spyOn(Todo, 'destroy')
      .mockResolvedValue(mockResponse);
    const response = await todoService.deleteAllTodos();
    expect(response).toStrictEqual(mockResponse);
    expect(spyOnDeleteTodoRepo).toHaveBeenCalledWith({
      truncate: true,
    });
  });
});
