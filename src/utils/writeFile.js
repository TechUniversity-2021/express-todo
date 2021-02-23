const fs = require('fs');

function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) reject(err);
      resolve('finish');
    });
  });
}

module.exports = { writeFile };
