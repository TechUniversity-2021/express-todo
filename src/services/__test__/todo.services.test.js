const { response } = require('express');
const fileRead = require('../../utilities/promisifyReadFile');
const fileAppend = require('../../utilities/promisifyAppendFile');
const fileWrite = require('../../utilities/promisifyWriteFile');
const {
  getTodos, postTodos, putTodos, getTodoById,
} = require('../todo.services');
const constFilePath = require('../../constants/filePath');
const repositoryTodo = require('../../repository/todo.repository');

describe('Get Todo', () => {
  it('should return the list of todos', async () => {
    // const spyOnFileReadContent = jest.spyOn(fileRead, 'promisifyFs').mockImplementation(('abc.txt'));
    // spyOnFileReadContent.mockResolvedValue('1|lala|active');
    const mockResponse = [
      {
        id: 1,
        title: 'Hii',
        status: 'Active',
        created_at: '2021-02-22T10:14:34.888Z',
        updated_at: null,
      },
    ];
    const spyOnTodoRepo = jest.spyOn(repositoryTodo, 'getTodos').mockResolvedValue(mockResponse);
    const todoObjects = await getTodos('db', '1');
    expect(spyOnTodoRepo).toHaveBeenCalledWith('db');
    expect(todoObjects).toEqual(mockResponse);
  });
});

describe('Post Todo', () => {
  it('should add to the list of todos', async () => {
    // const mockFilePath = jest.fn().mockReturnValue('abc.txt');
    // const spyOnAppendContent = jest.spyOn(fileAppend, 'promisifyAppendFs').mockImplementation(mockFilePath, '1|a|c\n2|b|c');
    const mockValue = {
      id: '1',
      todo: 'll',
      status: 'Inactive',
    };
    const spyOnPostTodoRepo = jest.spyOn(repositoryTodo, 'postTodo').mockResolvedValue(mockValue);
    const responseValue = await postTodos('db', mockValue);
    expect(spyOnPostTodoRepo).toHaveBeenCalledWith('db', mockValue);
    expect(responseValue).toStrictEqual(mockValue);
  });
});

describe('Put Todo', () => {
  it('should update to the list of todos', async () => {
    const mockValue = {
      todo: 'll',
      status: 'Inactive',
    };
    const spyOnPutTodoRepo = jest.spyOn(repositoryTodo, 'putTodo').mockResolvedValue(mockValue);
    const responseValue = await putTodos('db', '1', mockValue);
    // const mockFilePath = jest.fn().mockReturnValue('abc.txt');
    // const spyOnAppendContent = jest.spyOn(fileAppend, 'promisifyAppendFs').mockImplementation(mockFilePath, '1|a|c\n2|b|c');
    expect(spyOnPutTodoRepo).toHaveBeenCalledWith('db', '1', mockValue);
    expect(responseValue).toStrictEqual(mockValue);
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
    const spyOnTodoRepo = jest.spyOn(repositoryTodo, 'getTodosById').mockResolvedValue(mockResponse);
    const todoByIdResult = await getTodoById('db', '1');
    expect(todoByIdResult).toStrictEqual(mockResponse);
    expect(spyOnTodoRepo).toHaveBeenCalledWith('db', '1');
  });
});
