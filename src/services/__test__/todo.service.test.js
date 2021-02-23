const service = require('../todo.service');
const readUtil = require('../../utils/readFile');
const appendUtil = require('../../utils/appendFile');
const writeUtil = require('../../utils/writeFile');
const parser = require('../../utils/parsingData');
const todoRepository = require('../../repository/todo.repository');

// describe('deleteTodoByID Service', () => {
//   it('should return nothing with success', async () => {
//     const mockID = '1';
//     jest.spyOn(writeUtil, 'writeFile').mockResolvedValue();
//     const response = await service.deleteTodoByID(mockID);
//     expect(response).toEqual(undefined);
//   });

//   it('should go to catch block', async () => {
//     const mockResponse = {
//       status: 500,
//       message: 'invalid file path',
//     };
//     jest.spyOn(writeUtil, 'writeFile').mockImplementation(() => { throw new Error(mockResponse.message); });
//     try {
//       const response = await service.deleteTodoByID();
//     } catch (err) {
//       expect(err).toEqual(Error(mockResponse.message));
//     }
//   });
// });

// describe('updateTodo Service', () => {
//   it('should return nothing with success', async () => {
//     jest.spyOn(writeUtil, 'writeFile').mockResolvedValue();
//     const response = await service.updateTodo();
//     expect(response).toEqual(undefined);
//   });

//   it('should go to catch block', async () => {
//     const mockResponse = {
//       status: 500,
//       message: 'invalid file path',
//     };
//     jest.spyOn(writeUtil, 'writeFile').mockImplementation(() => { throw new Error(mockResponse.message); });
//     try {
//       await service.updateTodo();
//     } catch (err) {
//       expect(err).toEqual(Error(mockResponse.message));
//     }
//   });
// });

describe('getAllTodos Service', () => {
  it('should return tasks array', async () => {
    const mockResponse = [
      {
        id: 1,
        title: 'drink water',
        status: 'active',
        craeted_at: '2021-02-22T10:37:11.911Z',
        updated_at: null,
      },
      {
        id: 2,
        title: 'watch',
        status: 'active',
        craeted_at: '2021-02-22T10:37:11.911Z',
        updated_at: null,
      },
    ];
    jest.spyOn(todoRepository, 'getAllTodos').mockResolvedValue(mockResponse);
    const receivedTasks = await service.getAllTodos();
    expect(receivedTasks).toEqual(mockResponse);
  });

  it('should return error object message with incorrect file path ', async () => {
    jest.spyOn(todoRepository, 'getAllTodos').mockImplementation(() => { throw new Error('error'); });
    try {
      const received = await service.getAllTodos();
    } catch (error) {
      expect(error).toEqual(Error('error'));
    }
  });
});

describe('getTodoByID Service', () => {
  it('should return task object', async () => {
    const mockResponse = [
      {
        id: 1,
        title: 'drink water',
        status: 'active',
        craeted_at: '2021-02-22T10:37:11.911Z',
        updated_at: null,
      },
    ];
    jest.spyOn(todoRepository, 'getTodoByID').mockResolvedValue(mockResponse);
    const receivedTasks = await service.getTodoByID();
    expect(receivedTasks).toEqual(mockResponse);
  });

  it('should return error object ', async () => {
    jest.spyOn(todoRepository, 'getTodoByID').mockImplementation(() => { throw new Error('error'); });
    try {
      const received = await service.getTodoByID();
    } catch (error) {
      expect(error).toEqual(Error('error'));
    }
  });
});

// describe('createTodo Service', () => {
//   it('should return status and  message', async () => {
//     const mockTitle = 'cook';
//     const mockStatus = 'active';
//     const mockResponse = {
//       status: 201,
//       message: 'task successfully created',
//     };

//     jest.spyOn(appendUtil, 'appendFile').mockReturnValue();

//     const response = await service.createTodo(mockTitle, mockStatus);
//     expect(response).toEqual(mockResponse);
//   });

//   it('should go to catch block', async () => {
//     const mockResponse = {
//       status: 404,
//       message: 'invalid file path',
//     };
//     jest.spyOn(appendUtil, 'appendFile').mockImplementation(() => { throw new Error(mockResponse.message); });
//     const response = await service.createTodo();
//     expect(response).toEqual(mockResponse);
//   });
// });
