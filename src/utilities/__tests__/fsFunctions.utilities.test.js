const fs = require('fs');
const {
  readFile, readDir, appendFile, writeFile,
} = require('../fsFunctions.utilities');
const FileOperationError = require('../../errors/fileOperation.errors');

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
      new FileOperationError('Error reading file'),
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
      new FileOperationError('Error reading directory'),
    );
  });
});

describe('Promisified Append File function', () => {
  it('should append data and resolve with success message', () => {
    jest
      .spyOn(fs, 'appendFile')
      .mockImplementation((file, data, option, callback) => {
        callback(null);
      });
    return expect(appendFile('MOCK_FILE', 'MOCK_DATA')).resolves.toBe('Success');
  });
  it('should reject with an error object incase an error occures during appending data', () => {
    const MOCK_ERROR = new Error('An error occured');
    jest
      .spyOn(fs, 'appendFile')
      .mockImplementation((file, data, option, callback) => {
        callback(MOCK_ERROR);
      });
    return expect(appendFile('MOCK_FILE')).rejects.toEqual(
      new FileOperationError('Error appending data to file'),
    );
  });
});

describe('Promisified Write File function', () => {
  it('should write data and resolve with success message', () => {
    jest
      .spyOn(fs, 'writeFile')
      .mockImplementation((file, data, option, callback) => {
        callback(null);
      });
    return expect(writeFile('MOCK_FILE', 'MOCK_DATA')).resolves.toBe('Success');
  });
  it('should reject with an error object incase an error occures during appending data', () => {
    const MOCK_ERROR = new Error('An error occured');
    jest
      .spyOn(fs, 'writeFile')
      .mockImplementation((file, data, option, callback) => {
        callback(MOCK_ERROR);
      });
    return expect(writeFile('MOCK_FILE')).rejects.toEqual(
      new FileOperationError('Error writing data to file'),
    );
  });
});
