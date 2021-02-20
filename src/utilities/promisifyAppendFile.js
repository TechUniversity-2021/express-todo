const fs = require('fs');

function promisifyAppendFs(filePath, fileContent) {
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, fileContent, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = {
  promisifyAppendFs,
};
