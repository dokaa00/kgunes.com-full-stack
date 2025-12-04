const fs = require("fs");
const path = require("path");

const directory = "public/images";

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.match(/\.(png|jpg|jpeg)$/)) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles(directory);

console.log(`Found ${files.length} images.`);
console.log("Large files (>1MB):");

files.forEach(file => {
    const stats = fs.statSync(file);
    const sizeInMB = stats.size / (1024*1024);
    if (sizeInMB > 1) {
        console.log(`${file}: ${sizeInMB.toFixed(2)} MB`);
    }
});
