const fs = require('fs');
const { readFile, readDir } = require('../fsFunctions.utilities');

describe('Promisified Read File function', () => {
  it('should resolve with file contents', () => {
    jest
      .spyOn(fs, 'readFile')
      .mockImplementation((file, option, callback) => {
        callback(null, '21,34,43,57,"Anukriti"');
      });
    return expect(readFile('MOCK_FILE')).resolves.toBe(
      '21,34,43,57,"Anukriti"',
    );
  });
  test('should reject with an error object incase an error occures during file read', () => {
    jest
      .spyOn(fs, 'readFile')
      .mockImplementation((file, option, callback) => {
        callback(new Error('An error occured'), null);
      });
    return expect(readFile('MOCK_FILE')).rejects.toEqual(
      new Error('An error occured'),
    );
  });
});

describe('Promisified Read Directory function', () => {
  it('should resolve with array of filenames', () => {
    jest
      .spyOn(fs, 'readdir')
      .mockImplementation((directory, option, callback) => {
        callback(null, ['beverages.txt', 'fruits.txt', 'vegetables.txt']);
      });
    return expect(readDir('MOCK_DIRECTORY')).resolves.toEqual(
      ['beverages.txt', 'fruits.txt', 'vegetables.txt'],
    );
  });
  it('should resolve with an empty array if no files in directory', () => {
    jest
      .spyOn(fs, 'readdir')
      .mockImplementation((directory, option, callback) => {
        callback(null, []);
      });
    return expect(readDir('MOCK_DIRECTORY')).resolves.toEqual(
      [],
    );
  });

  it('should reject with error object when an error occurs during retrieving files from directory', () => {
    jest
      .spyOn(fs, 'readdir')
      .mockImplementation((directory, option, callback) => {
        callback(new Error('Directory not found!'), null);
      });
    return expect(readDir('MOCK_DIRECTORY')).rejects.toEqual(
      new Error('Directory not found!'),
    );
  });
});
