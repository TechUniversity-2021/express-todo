const fs = require('fs');

function appendFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, `${data}\n`, (err) => {
      if (err) reject(err);
      resolve('finish');
    });
  });
}

module.exports = { appendFile };
