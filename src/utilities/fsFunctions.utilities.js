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

module.exports = {
  readFile: promisifyReadFile,
  readDir: promisifyReadDir,
};
