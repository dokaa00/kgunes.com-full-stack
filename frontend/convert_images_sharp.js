const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

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

async function convertImages() {
    console.log(`Found ${files.length} images. Converting to WebP...`);
    
    for (const file of files) {
        const ext = path.extname(file);
        const outputFile = file.replace(ext, ".webp");
        
        try {
            await sharp(file)
                .webp({ quality: 80 })
                .toFile(outputFile);
            console.log(`Converted: ${file} -> ${outputFile}`);
            
            // Optional: Delete original? No, let's keep them for safety for now.
        } catch (err) {
            console.error(`Failed to convert ${file}:`, err);
        }
    }
    console.log("Conversion complete!");
}

convertImages();
