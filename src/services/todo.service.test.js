// const { v4: uuidv4 } = require('uuid');
const fileUtils = require('../utils/fileUtils');
const todoRepository = require('../repository/todo.repository');
const todoService = require('./todo.service');

// anything which has await before it mock

describe('Todo service', () => {
  // xit('should return a list of todos when file read is successful', async () => {
  //   jest
  //     .spyOn(fileUtils, 'readAfile')
  //     .mockResolvedValue('1|break|active\n2|break|active');
  //   const response = await todoService.getTodo();
  //   expect(response).toStrictEqual([
  //     { id: '1', todo: 'break', status: 'active' },
  //     { id: '2', todo: 'break', status: 'active' },
  //   ]);
  // });

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
    const spyOnTodoRepo = jest
      .spyOn(todoRepository, 'getTodos')
      .mockResolvedValue(mockResponse);
    const response = await todoService.getTodo('dbObject');
    expect(response).toStrictEqual(mockResponse); // coz function is returning
    expect(spyOnTodoRepo).toHaveBeenCalledWith('dbObject');
  });

  it('should get a list of todos based on id', async () => {
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
      .spyOn(todoRepository, 'getTodoByID')
      .mockResolvedValue(mockResponse);
    const response = await todoService.getTodoWithId('dbObject', '1');
    expect(response).toStrictEqual(mockResponse);
    expect(spyOnTodoByIdRepo).toHaveBeenCalledWith('dbObject', '1');
  });

  it('should create a new todo', async () => {
    const mockResponse = [
      {
        id: 12,
        title: 'Water plants',
        status: 'Active',
        created_at: '2021-02-23T06:52:56.207Z',
        updated_at: null,
      },
    ];
    const spyOnCreateTodoRepo = jest
      .spyOn(todoRepository, 'createTodo')
      .mockResolvedValue(mockResponse);
    const response = await todoService.postTodo('dbObject', { todo: 'Water plants', status: 'Active' });
    expect(response).toStrictEqual(mockResponse);
    expect(spyOnCreateTodoRepo).toHaveBeenCalledWith('dbObject', 'Water plants', 'Active');
  });

  it('should update a todo based on id', async () => {
    const mockResponse = [
      {
        id: 12,
        title: 'Water plants',
        status: 'Active',
        created_at: '2021-02-23T06:52:56.207Z',
        updated_at: null,
      },
    ];
    const spyOnUpdateTodoRepo = jest
      .spyOn(todoRepository, 'updateTodo')
      .mockResolvedValue(mockResponse);
    const response = await todoService.updateTodo('dbObject', 12, { todo: 'Water terrace plants', status: 'Completed' });
    expect(response).toStrictEqual(mockResponse);
    expect(spyOnUpdateTodoRepo).toHaveBeenCalledWith('dbObject', 12, 'Water terrace plants', 'Completed');
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
      .spyOn(todoRepository, 'deleteTodo')
      .mockResolvedValue(mockResponse);
    const response = await todoService.deleteTodoWithId('dbObject', 12);
    expect(response).toStrictEqual(mockResponse);
    expect(spyOnDeleteTodoRepo).toHaveBeenCalledWith('dbObject', 12);
  });

  // jest.mock(todoService.getTodo)
  xit('should return a todo of the respective id', async () => {
    // jest
    //   .spyOn(todoService, 'getTodo')
    //   .mockResolvedValue(
    //     '1|Take a break|Active\n2|Make tea|Active\n3|Buy 1kg rice|Active\n4|Follow tdd|Active',
    //   );
    // const response = await todoService.getTodoWithId(3);
    // expect(response).toStrictEqual([
    //   { id: '3', todo: 'Buy 1kg rice', status: 'Active' },
    // ]);
  });

  // TODO - uuid mock
  // jest.mock('uuid');
  xit('should add a new todo', async () => {
    jest
      .spyOn(fileUtils, 'appendToAfile')
      .mockResolvedValue('1|break|active\n2|break|active\n123|Do work|active');
    // uuidv4.mockImplementation(() => '123');
    const response = await todoService.postTodo({ todo: 'Do work' });
    console.log(response);
    expect(response).toBe('1|break|active\n2|break|active\n123|Do work|active');
  });

  xit('should update a todo and write to file', async () => {
    jest
      .spyOn(fileUtils, 'readAfile')
      .mockResolvedValue('1|break|active\n2|break|active');
    jest
      .spyOn(fileUtils, 'writeToAfile')
      .mockResolvedValue('1|break|active\n2|break|completed');
    const response = await todoService.updateTodo(2, { status: 'completed' });
    expect(response).toStrictEqual([
      { id: '1', todo: 'break', status: 'active' },
      { id: '2', todo: 'break', status: 'completed' },
    ]);
  });
});
