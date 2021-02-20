const fs = require('fs');
const { getFileData, getDirectoryFiles } = require('./file-utils');

describe('File Utils', () => {
  it('promisified read file should resolve with file content', (done) => {
    jest.spyOn(fs, 'readFile').mockImplementation((file, option, cb) => {
      cb(null, 'hello');
    });
    getFileData('dummy.txt').then((data) => {
      expect(data).toBe('hello');
      done();
    });
  });

  it("promisified read file should reject with 'Error'", (done) => {
    jest.spyOn(fs, 'readFile').mockImplementation((file, option, cb) => {
      cb(Error('Error'), null);
    });
    getFileData('dummy.txt').catch((err) => {
      expect(err).toStrictEqual(Error('Error'));
      done();
    });
  });

  it('promisified read directory should resolve with files', (done) => {
    jest.spyOn(fs, 'readdir').mockImplementation((dir, option, callback) => {
      callback(null, ['file.txt']);
    });
    getDirectoryFiles('dummyDir').then((data) => {
      expect(data).toStrictEqual(['file.txt']);
      done();
    });
  });

  // Used rejects instead of then
  it("promisified read directory should reject with 'Error'", (done) => {
    jest.spyOn(fs, 'readdir').mockImplementation((dir, option, cb) => {
      cb(Error('Error'), null);
    });
    expect(getDirectoryFiles('dummyDir')).rejects.toStrictEqual(Error('Error'));
    done();
  });
});
