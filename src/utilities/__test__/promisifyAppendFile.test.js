const fs = require('fs');
const fileOps = require('../promisifyAppendFile');

describe('File append', () => {
  it('should add conetnt to the file', async () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((filePath, fileContent, callback) => {
      callback(null, 'lallalallalalala');
    });
    const text = await fileOps.promisifyAppendFs('abc123.txt', 'lallalallalalala');
    expect(text).toBe('lallalallalalala');
  });
  it('should return no such file found', () => {
    jest
      .spyOn(fs, 'appendFile')
      .mockImplementation((filePath, fileContent, callback) => {
        callback(new Error('No such file found'), null);
      });
    return expect(fileOps.promisifyAppendFs('xxx.txt', 'lal')).rejects.toEqual(new Error('No such file found'));
  });
});
