const fs = require('fs');
const readOp = require('./__test__/todo.service');

describe('should Read files', () => {
  it('should return files content', () => {
    jest
      .spyOn(fs, 'readFile')
      .mockImplementation((file, option, callback) => {
        callback(null, 'read File content');
      });
    return expect(readOp.readFileData('../seed/')).resolves.toBe('read File content');
  });
  it('should reject file data read request', () => {
    jest.spyOn(fs, 'readFile')
      .mockImplementation((file, option, cb) => {
        cb('reject read file content request', null);
      });
    return expect(readOp.readFileData('../seed1/')).rejects.toEqual('reject read file content request');
  });
});
