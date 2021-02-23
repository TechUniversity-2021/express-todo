const fs = require('fs');
const readOp = require('../todo.utilites');

describe('should Read files', () => {
  it('should return files content', () => {
    jest
      .spyOn(fs, 'readFile')
      .mockImplementation((file, option, callback) => {
        callback(null, 'read File content');
      });
    return expect(readOp.readFileData('./src/resources/todo.txt')).resolves.toBe('read File content');
  });
  it('should reject file data read request', () => {
    jest.spyOn(fs, 'readFile')
      .mockImplementation((file, option, cb) => {
        cb('reject read file content request', null);
      });
    return expect(readOp.readFileData('./src/resources/todo.txt')).rejects.toEqual('reject read file content request');
  });
  // append
  it('should append todo list', () => {
    jest.spyOn(fs, 'appendFileSync').mockImplementation((file, content, cb) => {
      cb('Error');
    });
    return expect(readOp.appendFileData('./src/r657esources/todo.txt', 'mock')).rejects.toBe('Error');
  });
  it('should append todo list', () => {
    jest.spyOn(fs, 'appendFileSync').mockImplementation((file, content, cb) => {
      cb(null);
    });
    return expect(readOp.appendFileData('./src/r657esources/todo.txt', 'mock')).resolves.toBe('New todo Added');
  });
  // update
  it('should update todo list', () => {
    jest.spyOn(fs, 'readFile').mockImplementation((file, content, cb) => {
      cb(null, 'I have data');
    });

    jest.spyOn(fs, 'writeFile').mockImplementation((file, content, option, cb) => {
      cb('Error');
    });
    return expect(readOp.updateFileData('./src/resources/todo.txt123', 'mock')).rejects.toBe('Error');
  });
  it('should update todo list', () => {
    jest.spyOn(fs, 'readFile').mockImplementation((file, content, cb) => {
      cb(null, 'I have data');
    });

    jest.spyOn(fs, 'writeFile').mockImplementation((file, content, option, cb) => {
      cb(null);
    });
    return expect(readOp.updateFileData('./src/resources/todo.txt123', 'mock')).resolves.toBe('Happily Added');
  });
});
