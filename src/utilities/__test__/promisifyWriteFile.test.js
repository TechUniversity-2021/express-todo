const fs = require('fs');
const fileOps = require('../promisifyWriteFile');

describe('File write', () => {
  it('should write content to the file', async () => {
    jest.spyOn(fs, 'writeFile').mockImplementation((filePath, fileContent, callback) => {
      callback(null, 'lallalallalalala');
    });
    const text = await fileOps.promisifyWriteFs('abc123.txt', 'lallalallalalala');
    expect(text).toBe('lallalallalalala');
  });
  it('should return no such file found', () => {
    jest
      .spyOn(fs, 'writeFile')
      .mockImplementation((filePath, fileContent, callback) => {
        callback(new Error('No such file found'), null);
      });
    return expect(fileOps.promisifyWriteFs('xxx.txt', 'lal')).rejects.toEqual(new Error('No such file found'));
  });
});
