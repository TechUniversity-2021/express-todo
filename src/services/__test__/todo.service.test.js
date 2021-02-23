const service = require('../todo.service');
const readUtil = require('../../utils/readFile');
const appendUtil = require('../../utils/appendFile');
const writeUtil = require('../../utils/writeFile');
const parser = require('../../utils/parsingData');

describe('deleteTodoByID Service', () => {
  it('should return nothing with success', async () => {
    const mockID = '1';
    jest.spyOn(writeUtil, 'writeFile').mockResolvedValue();
    const response = await service.deleteTodoByID(mockID);
    expect(response).toEqual(undefined);
  });

  it('should go to catch block', async () => {
    const mockResponse = {
      status: 500,
      message: 'invalid file path',
    };
    jest.spyOn(writeUtil, 'writeFile').mockImplementation(() => { throw new Error(mockResponse.message); });
    try {
      const response = await service.deleteTodoByID();
    } catch (err) {
      expect(err).toEqual(Error(mockResponse.message));
    }
  });
});

describe('updateTodo Service', () => {
  it('should return nothing with success', async () => {
    jest.spyOn(writeUtil, 'writeFile').mockResolvedValue();
    const response = await service.updateTodo();
    expect(response).toEqual(undefined);
  });

  it('should go to catch block', async () => {
    const mockResponse = {
      status: 500,
      message: 'invalid file path',
    };
    jest.spyOn(writeUtil, 'writeFile').mockImplementation(() => { throw new Error(mockResponse.message); });
    try {
      await service.updateTodo();
    } catch (err) {
      expect(err).toEqual(Error(mockResponse.message));
    }
  });
});

describe('getAllTodos Service', () => {
  it('should return tasks array', async () => {
    const readTasks = '1|appy|active\n2|vorina|active\n3|priya|active\n';
    const parsedTasks = ['1|appy|active', '2|vorina|active', '3|priya|active'];
    const tasksObjectArray = parsedTasks.map((task) => {
      const taskDetails = task.split('|');
      const taskObject = {
        id: taskDetails[0],
        title: taskDetails[1],
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
    freadSpy.mockImplementation(() => { throw new Error('error'); });
    try {
      const recieved = await service.getAllTodos();
    } catch (error) {
      freadSpy.mockClear();
      expect(error).toEqual(Error('error'));
    }
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
