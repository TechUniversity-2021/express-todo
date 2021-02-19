const fs = require('fs');

const filePath = '../resources/todo.txt';

const readFileData = (dirname) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});
async function getFileContent(dirname) {
  const arr = ['id', 'task', 'status'];
  let data = await readFileData(dirname);
  const obj = {};
  let key;

  for (let start = 0; start < arr.length; start++) {
    data = data.split('|');
  }
  console.log(obj);
  return obj;
}

getFileContent(filePath);
module.exports = {
  readFileData,
  getFileContent,
};
