const fs = require('fs');
const { writeFile } = require('../writeFile');

describe('Fread Util', () => {
  it("should resolve with value 'finish'", () => {
    jest.spyOn(fs, 'writeFile')
      .mockImplementation((path, options, callback) => {
        callback(null);
      });
    return expect(writeFile()).resolves.toBe('finish');
  });

  it("should reject with error message 'error' ", () => {
    jest.spyOn(fs, 'writeFile')
      .mockImplementation((path, options, callback) => {
        callback(new Error('error'));
      });
    return expect(writeFile()).rejects.toEqual(Error('error'));
  });
});
