const fs = require("fs");
const path = require("path");

const src = process.argv[2];
const dist = process.argv[3];
fs.mkdir(dist, (err) => {
  if (!err) console.log("creat file beginning copy");
});
function getFiles(src, dist) {
  fs.readdir(src, { withFileTypes: true }, (err, files) => {
    for (let file of files) {
      if (file.isDirectory()) {
        fs.mkdir(path.resolve(dist, file.name), (err) => {
          if (!err) console.log("creat file beginning copy");
        });
        getFiles(path.resolve(src, file.name), path.resolve(dist, file.name));
      } else {
        fs.copyFileSync(
          path.resolve(src, file.name),
          path.resolve(dist, file.name)
        );
      }
    }
  });
}
getFiles(src, dist);
