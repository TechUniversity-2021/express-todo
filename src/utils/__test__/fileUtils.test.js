const fs = require('fs');
const fileUtils = require('../fileUtils');

describe('read file', () => {
  it('should resolve with success value', () => {
    jest.spyOn(fs, 'readFile').mockImplementation((fileName, option, cb) => cb(null, 'success'));
    expect(fileUtils.getFileData('abc.txt')).resolves.toBe('success');
  });
  it('should reject with error value', () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filename, option, cb) => cb(new Error('error'), null));
    expect(fileUtils.getFileData('abc.txt')).rejects.toEqual(Error('error'));
  });
});

describe('append file', () => {
  it("should append new todo in file with 'added successfully' value", () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((fileName, option, cb) => cb(null));
    expect(fileUtils.appendFile('abc.txt')).resolves.toBe('added successfully');
  });

  it('should reject append and throw error object', () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((fileName, option, cb) => cb(new Error('error')));
    expect(fileUtils.appendFile('abc.txt')).rejects.toEqual(new Error('error'));
  });
});

describe('write file', () => {
  it("should resolve with 'successful' value", () => {
    jest.spyOn(fs, 'writeFile').mockImplementation((fileName, option, cb) => cb(null));
    expect(fileUtils.writeFile('abc.txt')).resolves.toBe('successful');
  });

  it('should reject append and throw error object', () => {
    jest.spyOn(fs, 'writeFile').mockImplementation((fileName, option, cb) => cb(new Error('error')));
    expect(fileUtils.writeFile('abc.txt')).rejects.toEqual(new Error('error'));
  });
});

describe('update file', () => {
  it("should resolve with 'update successful' value", () => {
    jest.spyOn(fs, 'writeFile').mockImplementation((fileName, option, cb) => cb(null));
    expect(fileUtils.updateFile('abc.txt')).resolves.toBe('update successful');
  });

  it('should reject append and throw error object', () => {
    jest.spyOn(fs, 'writeFile').mockImplementation((fileName, option, cb) => cb(new Error('error')));
    expect(fileUtils.updateFile('abc.txt')).rejects.toEqual(new Error('error'));
  });
});
