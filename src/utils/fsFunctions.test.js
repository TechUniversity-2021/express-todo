const fs = require('fs');
const { promisifyReadFile } = require('./fsFunctions');

describe('PromisifyReadFile ', () => {
  it('should resolve', () => {
    jest
      .spyOn(fs, 'readFile')
      .mockImplementation((file, option, callback) => {
        callback(null, '12345');
      });
    return expect(promisifyReadFile('randomFile')).resolves.toBe('12345');
  });

  it('should reject', () => {
    jest
      .spyOn(fs, 'readFile')
      .mockImplementation((file, option, callback) => {
        callback(new Error('An error occured'), null);
      });
    return expect(promisifyReadFile('randomFile')).rejects.toEqual(new Error('An error occured'));
  });
});
