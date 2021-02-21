const fs = require('fs');
const { appendFile } = require('../appendFile');

describe('appendFile function', () => {
  it("should resolve with value 'finish'", () => {
    jest.spyOn(fs, 'appendFile')
      .mockImplementation((path, data, callback) => {
        callback(null);
      });
    return expect(appendFile()).resolves.toBe('finish');
  });

  it("should reject with error message 'error' ", () => {
    jest.spyOn(fs, 'appendFile')
      .mockImplementation((path, data, callback) => {
        callback(Error('error'));
      });
    return expect(appendFile()).rejects.toEqual(Error('error'));
  });
});
