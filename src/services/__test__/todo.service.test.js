const service = require('../todo.service');
const readUtil = require('../../utils/readFile');
const appendUtil = require('../../utils/appendFile');
const parser = require('../../utils/parsingData');

describe('getAllTodos Service', () => {
  it('should return tasks array', async () => {
    const readTasks = '1|appy|active\n2|vorina|active\n3|priya|active';
    const parsedTasks = ['1|appy|active', '2|vorina|active', '3|priya|active'];
    const tasksObjectArray = parsedTasks.map((task) => {
      const taskDetails = task.split('|');
      const taskObject = {
        id: taskDetails[0],
        name: taskDetails[1],
        status: taskDetails[2],
      };
      return taskObject;
    });

    jest.spyOn(readUtil, 'fread').mockReturnValue(readTasks);
    jest.spyOn(parser, 'parsingData').mockReturnValue(parsedTasks);

    const recievedTasks = await service.getAllTodos();
    expect(recievedTasks).toEqual(tasksObjectArray);
  });

  it('should return error object message with incorrect file path ', async () => {
    const freadSpy = jest.spyOn(readUtil, 'fread');
    freadSpy.mockImplementation(() => { throw new Error('invalid file path'); });
    const recievedError = await service.getAllTodos();
    expect(recievedError).toBe('invalid file path');
  });
});

describe('createTodo Service', () => {
  it('should return status and  message', async () => {
    const mockTitle = 'cook';
    const mockStatus = 'active';
    const mockResponse = {
      status: 201,
      message: 'task successfully created',
    };

    jest.spyOn(appendUtil, 'appendFile').mockReturnValue();

    const response = await service.createTodo(mockTitle, mockStatus);
    expect(response).toEqual(mockResponse);
  });

  it('should go to catch block', async () => {
    const mockResponse = {
      status: 404,
      message: 'invalid file path',
    };
    jest.spyOn(appendUtil, 'appendFile').mockImplementation(() => { throw new Error(mockResponse.message); });
    const response = await service.createTodo();
    expect(response).toEqual(mockResponse);
  });
});
