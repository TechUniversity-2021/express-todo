const fs = require('fs');
const { readAfile, appendToAfile, writeToAfile } = require('./fileUtils');

describe('File read', () => {
  it('should resolve with value success', () => {
    //   jest.spyOn(fs, 'readFile').mockImplementation((file, option, cb) => cb(null, 'hello'));
    //   readAfile('abc.txt').then((data) => {
    //     expect('hello').toBe(data);
    //     done();
    //   });
    jest
      .spyOn(fs, 'readFile')
      .mockImplementation((file, option, cb) => cb(null, 'success'));
    return expect(readAfile('abc.txt')).resolves.toBe('success');
  });

  it('should reject with error message', () => {
    jest
      .spyOn(fs, 'readFile')
      .mockImplementation((file, option, cb) => cb(new Error('error')));
    return expect(readAfile('abc.txt')).rejects.toEqual(Error('error'));
  });
});

describe('File write', () => {
  it('should resolve with value success', () => {
    jest
      .spyOn(fs, 'writeFile')
      .mockImplementation((file, data, option, cb) => cb(null));
    return expect(writeToAfile('abc.txt', 'write this')).resolves.toBe('write this');
  });

  it('should reject with error message', () => {
    jest
      .spyOn(fs, 'writeFile')
      .mockImplementation((file, data, option, cb) => cb(new Error('error')));
    return expect(writeToAfile('abc.txt', 'xx')).rejects.toEqual(Error('error'));
  });
});

describe('File append', () => {
  it('should resolve with value success', () => {
    jest
      .spyOn(fs, 'appendFile')
      .mockImplementation((file, data, option, cb) => cb(null));
    return expect(appendToAfile('abc.txt', 'write this')).resolves.toBe('write this');
  });

  it('should reject with error message', () => {
    jest
      .spyOn(fs, 'appendFile')
      .mockImplementation((file, data, option, cb) => cb(new Error('error')));
    return expect(appendToAfile('abc.txt', 'xx')).rejects.toEqual(Error('error'));
  });
});
