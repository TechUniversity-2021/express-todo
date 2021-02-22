const fs = require('fs');
const fileUtils = require('./file.utils');

describe('File Utils', () => {
  it('promisified read file should resolve with file content', (done) => {
    jest.spyOn(fs, 'readFile').mockImplementation((file, option, cb) => {
      cb(null, 'hello');
    });
    fileUtils.getFileData('dummy.txt').then((data) => {
      expect(data).toBe('hello');
      done();
    });
  });

  it("promisified read file should reject with 'Error'", (done) => {
    jest.spyOn(fs, 'readFile').mockImplementation((file, option, cb) => {
      cb(Error('Error'), null);
    });
    fileUtils.getFileData('dummy.txt').catch((err) => {
      expect(err).toStrictEqual(Error('Error'));
      done();
    });
  });

  it('promisified read directory should resolve with files', (done) => {
    jest.spyOn(fs, 'readdir').mockImplementation((dir, option, callback) => {
      callback(null, ['file.txt']);
    });
    fileUtils.getDirectoryFiles('dummyDir').then((data) => {
      expect(data).toStrictEqual(['file.txt']);
      done();
    });
  });

  // Used rejects instead of then
  it("promisified read directory should reject with 'Error'", (done) => {
    jest.spyOn(fs, 'readdir').mockImplementation((dir, option, cb) => {
      cb(Error('Error'), null);
    });
    expect(fileUtils.getDirectoryFiles('dummyDir')).rejects.toStrictEqual(Error('Error'));
    done();
  });

  it('promisified append file should resolve with appended Data', (done) => {
    jest.spyOn(fs, 'appendFile').mockImplementation((file, option, cb) => {
      cb(null, 'Updated');
    });
    expect(fileUtils.appendFile('dummyFile', '1|lala|Active')).resolves.toBe('Updated');
    done();
  });

  it('promisified update file should resolve with updated Data', (done) => {
    jest.spyOn(fs, 'writeFile').mockImplementation((file, option, cb) => {
      cb(null, 'Updated');
    });
    expect(fileUtils.appendFile('dummyFile', '1|lala|Active')).resolves.toBe('Updated');
    done();
  });
});
