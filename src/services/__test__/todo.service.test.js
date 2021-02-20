const service = require('../todo.service');
const read = require('../../utils/readFile');
const parser = require('../../utils/parsingData');

describe('getAllTodos Service', () => {
  it('should return tasks array', async () => {
    const readTasks = '1|appy|active\n2|vorina|active\n3|priya|active';
    const parsedTasks = ['1|appy|active', '2|vorina|active', '3|priya|active'];

    const freadSpy = jest.spyOn(read, 'fread');
    freadSpy.mockReturnValue(readTasks);
    const parsingDataSpy = jest.spyOn(parser, 'parsingData');
    parsingDataSpy.mockReturnValue(parsedTasks);
    const recievedTasks = await service.getAllTodos();

    const tasksObjectArray = parsedTasks.map((task) => {
      const taskDetails = task.split('|');
      const taskObject = {
        id: taskDetails[0],
        name: taskDetails[1],
        status: taskDetails[2],
      };
      return taskObject;
    });
    expect(recievedTasks).toEqual(tasksObjectArray);
  });

  it('should return error object message with incorrect file path ', async () => {
    const freadSpy = jest.spyOn(read, 'fread');
    freadSpy.mockImplementation(() => { throw new Error('invalid file path'); });
    const recievedError = await service.getAllTodos();
    expect(recievedError).toBe('invalid file path');
  });
});
