const fs = require('fs');

function promisifyWriteFs(filePath, fileContent) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, fileContent, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = {
  promisifyWriteFs,
};
