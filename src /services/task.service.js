const fs = require('fs');

function readData(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

// readData('../resources/file.txt').then(console.log);

module.exports = { readData };
