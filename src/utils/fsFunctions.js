const fs = require('fs');

const promisifyReadFile = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

const promisifyReadDir = (dirPath) => new Promise((resolve, reject) => {
  fs.readdir(dirPath, 'utf-8', (err, files) => {
    if (err) {
      reject(err);
    } else {
      resolve(files);
    }
  });
});

const promisifyAppendFile = (filePath, newToDo) => new Promise((resolve, reject) => {
  fs.appendFile(filePath, newToDo, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(newToDo);
    }
  });
});

const promisifyWriteFile = (filePath, updatedFile) => new Promise((resolve, reject) => {
  fs.writeFile(filePath, updatedFile, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(updatedFile);
    }
  });
});

module.exports = {
  promisifyReadFile,
  promisifyReadDir,
  promisifyAppendFile,
  promisifyWriteFile,
};
