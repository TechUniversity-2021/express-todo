const fs = require('fs');

const readFileData = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});

const appendFileData = (filePath, content) => new Promise((res, rej) => {
  fs.appendFileSync(filePath, content, (err) => {
    if (err) {
      rej(err);
    }
    res('New todo Added');
  });
});

const updateFileData = (filePath, oldData, newContent) => new Promise((res, rej) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      rej(err);
    }
    const result = data.replace(oldData, newContent);
    fs.writeFile(filePath, result, 'utf8', (err) => {
      if (err) rej(err);
    });
    res('Happily Added');
  });
});
module.exports = {
  readFileData,
  appendFileData,
  updateFileData,
};
