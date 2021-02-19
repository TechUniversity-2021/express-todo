const fs = require('fs');
const fileOps = require('./PromisifyFileRead');

test('Should return the content of files', async () => {
  jest.spyOn(fs, 'readFile')
    .mockImplementation((fileContent, option, callback) => {
      callback(null, 'abc');
    });
  const text = await fileOps.promisifyFs('../seed/fruits12.txt');
  expect(text).toBe('abc');
});

test('Should return no such file found', () => {
  jest
    .spyOn(fs, 'readFile')
    .mockImplementation((fileContent, option, callback) => {
      callback(new Error('No such file found'), null);
    });
  return expect(fileOps.promisifyFs('../seed/fruits12.txt')).rejects.toEqual(new Error('No such file found'));
});
