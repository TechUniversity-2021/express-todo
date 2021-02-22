// describe('todo service should', () => {
//   it('parse file data', async () => {

//   });
// });
const getToDoRepository = require('../repository/todo.repository');
const toDoServices = require('./todo.service');

describe('dbFetchToDo service', () => {
  const mockResponse = null;
  const mockRequest = { params: { id: 1 } };
  const expectedValue = [
    {
      id: 1,
      title: 'Go to the mall',
      status: 'active',
      created_at: '2021-02-22T11:25:01.457Z',
      updated_at: null,
    },
  ];
  it('should fetch todo by id', async () => {
    jest.spyOn(getToDoRepository, 'getTodoById').mockResolvedValue(expectedValue);
    const result = await toDoServices.dbFetchToDo('db', mockRequest, mockResponse);
    expect(result).toStrictEqual(expectedValue);
  });
});
