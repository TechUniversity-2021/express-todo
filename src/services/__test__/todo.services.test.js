const fileRead = require('../../utilities/promisifyReadFile');
const { getTodos } = require('../todo.services');

describe('Get Todo', () => {
  it('should return the list of todos', async () => {
    const spyOnFileReadContent = jest.spyOn(fileRead, 'promisifyFs').mockImplementation(('abc.txt'));
    spyOnFileReadContent.mockResolvedValue('1|lala|active');
    const todoObjects = await getTodos();
    expect(todoObjects).toEqual([{ id: '1', status: 'active', todo: 'lala' }]);
  });
});
