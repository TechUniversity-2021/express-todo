const fs = require("fs");

const readAfile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      // console.log(err, data);
      if (err) {
        if(err.message === 'file not found'){
          reject(new Error('message'))
        } else if (err.message === 'file'){
          reject(new Error('message'))
        }
        reject(err);
      }
      resolve(data);
    });
  });
};

// console.log(readAfile('/Users/swetha_gumpena/TechUniv/node-fs-example/seed/fruits.txt').then(console.log))

module.exports = {readAfile}
