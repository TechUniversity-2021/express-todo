const fs = require('fs');

const readAfile = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    // console.log(err, data);
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});

const writeToAfile = (filePath, data) => new Promise((resolve, reject) => {
  fs.writeFile(filePath, data, 'utf-8', (err) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});

const appendToAfile = (filePath, data) => new Promise((resolve, reject) => {
  fs.appendFile(filePath, `\n${data}`, 'utf-8', (err) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});

module.exports = { readAfile, appendToAfile, writeToAfile };
