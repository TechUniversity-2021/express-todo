const fs = require('fs');
const FileOperationError = require('../errors/fileOperation.errors');

const promisifyReadFile = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      reject(new FileOperationError('Error reading file'));
    } else {
      resolve(data);
    }
  });
});

const promisifyReadDir = (dirPath) => new Promise((resolve, reject) => {
  fs.readdir(dirPath, 'utf-8', (err, files) => {
    if (err) {
      reject(new FileOperationError('Error reading directory'));
    } else {
      resolve(files);
    }
  });
});

const promisifyAppendFile = (filePath, data) => new Promise((resolve, reject) => {
  fs.appendFile(filePath, data, 'utf-8', (err) => {
    if (err) {
      reject(new FileOperationError('Error appending data to file'));
    } else {
      resolve('Success');
    }
  });
});

const promisifyWriteFile = (filePath, data) => new Promise((resolve, reject) => {
  fs.writeFile(filePath, data, 'utf-8', (err) => {
    if (err) {
      reject(new FileOperationError('Error writing data to file'));
    } else {
      resolve('Success');
    }
  });
});

module.exports = {
  readFile: promisifyReadFile,
  readDir: promisifyReadDir,
  appendFile: promisifyAppendFile,
  writeFile: promisifyWriteFile,
};
