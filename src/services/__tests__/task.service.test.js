const fileUtils = require('../../utils/task.util');
const fileOps = require('../task.service');
const fileRepo = require('../../repository/todo.repository');

describe('Get todos service:', () => {
  it('should display todos ', async () => {
    const todos = [{
      id: '1',
      title: 'abc',
      status: 'Completed',
    }];

    const getSpy = jest.spyOn(fileRepo, 'getTodos')
      .mockResolvedValue(todos);

    const data = await fileOps.getTodosService('db');
    expect(getSpy).toHaveBeenCalledWith('db');
    expect(data).toEqual(todos);
  });
});

describe('Get todo by id service:', () => {
  it('should display todo by id', async () => {
    const todos = [{
      title: 'abc',
    }];

    const spyOnTodoRepo = jest.spyOn(fileRepo, 'getTodoById').mockResolvedValue(todos);

    const todoList = await fileOps.getTodoByIdService('db', 1);
    expect(todoList).toEqual(todos);
    expect(spyOnTodoRepo).toHaveBeenCalledWith('db', 1);
  });
});

describe('Post todo service:', () => {
  it('should post a todo into db', async () => {
    const todos = [{
      title: 'abc',
      status: 'Complete',
    }];

    const postSpy = jest.spyOn(fileRepo, 'postTodo').mockResolvedValue(todos);

    await fileOps.postTodoService('db', 'body');
    expect(postSpy).toHaveBeenCalledWith('db', 'body');
  });
});

describe('Update todo by id service:', () => {
  it('should update todo by id', async () => {
    const todos = [{
      title: 'abc',
      status: 'Completed',
    }];

    const putSpy = jest.spyOn(fileRepo, 'updateTodo').mockResolvedValue(todos);

    await fileOps.putTodoService('body', 1, 'db');

    expect(putSpy).toHaveBeenCalledWith('body', 1, 'db');
  });
});

describe('Delete todo by id service:', () => {
  it('should delete todo by id', async () => {
    const todos = [{
      title: 'abc',
      status: 'Completed',
    }];

    const putSpy = jest.spyOn(fileRepo, 'updateTodo').mockResolvedValue(todos);

    await fileOps.putTodoService('db', 'body', 1);

    expect(putSpy).toHaveBeenCalledWith('db', 'body', 1);
  });
});
