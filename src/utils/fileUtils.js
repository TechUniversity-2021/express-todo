const fs = require('fs');


function getFileData(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {

      if (err) reject(err);
      resolve(data);

    });
  });
}

function appendFile(fileName, data) {

  return new Promise((resolve, reject) => {
    fs.appendFile(fileName, data, (err) => {
      if (err) reject(err)
      resolve("added successfully")
    })
  })

}

function  writeFile(fileName,data) {
  return new Promise((resolve,reject)=>{
    fs.writeFile(fileName,data,(err)=>{
      if (err) reject(err)
      resolve("delete successfully")
    })
  })
  
}

function updateFile(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject(err)
      resolve("update successful")
    })
  })
}
//getFileData('resources/todos.txt').then(console.log, console.log);

module.exports = { getFileData, appendFile, updateFile,writeFile }
