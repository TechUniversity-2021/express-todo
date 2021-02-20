const fs = require('fs');

const readFile = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});

// readFile('abc.txt').then(console.log)

module.exports = { readFile };
