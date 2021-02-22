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

function appendFile(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.appendFile(fileName, data, (err) => {
      if (err) reject(err);
      resolve('Updated');
    });
  });
}

function updateFile(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject(err);
      resolve('Updated');
    });
  });
}

// getFileData("./test.txt").then(console.log, console.log);
module.exports = {
  getFileData, getDirectoryFiles, appendFile, updateFile,
};
