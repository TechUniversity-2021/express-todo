const fileRead = require('../../utilities/promisifyReadFile');
const fileAppend = require('../../utilities/promisifyAppendFile');
const fileWrite = require('../../utilities/promisifyWriteFile');
const { getTodos, postTodos, putTodos } = require('../todo.services');
const constFilePath = require('../../constants/filePath');

describe('Get Todo', () => {
  it('should return the list of todos', async () => {
    const spyOnFileReadContent = jest.spyOn(fileRead, 'promisifyFs').mockImplementation(('abc.txt'));
    spyOnFileReadContent.mockResolvedValue('1|lala|active');
    const todoObjects = await getTodos();
    expect(todoObjects).toEqual([{ id: '1', status: 'active', todo: 'lala' }]);
  });
});

describe('Post Todo', () => {
  it('should add to the list of todos', async () => {
    const mockFilePath = jest.fn().mockReturnValue('abc.txt');
    const spyOnAppendContent = jest.spyOn(fileAppend, 'promisifyAppendFs').mockImplementation(mockFilePath, '1|a|c\n2|b|c');
    await postTodos('1|a|c\n2|b|c');
    expect(spyOnAppendContent).toHaveBeenCalledWith('src/resources/todo.txt', '1|a|c\n2|b|c');
  });
});

describe('Put Todo', () => {
  it('should update to the list of todos', async () => {
    const mockFilePath = jest.fn().mockReturnValue('abc.txt');
    const spyOnAppendContent = jest.spyOn(fileAppend, 'promisifyAppendFs').mockImplementation(mockFilePath, '1|a|c\n2|b|c');
    await putTodos('1|a|c\n2|b|c');
    expect(spyOnAppendContent).toHaveBeenCalledWith('src/resources/todo.txt', '1|a|c\n2|b|c');
  });
});
