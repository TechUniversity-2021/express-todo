const fs = require('fs');

function getFileData(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function getDirectoryFiles(dirName) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirName, 'utf-8', (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
}

// getFileData("./test.txt").then(console.log, console.log);
module.exports = { getFileData, getDirectoryFiles };
