# Common built-in modules

## path

```js
const path = require("path");
const filepath = "/User/abc.txt";

console.log(path.dirname(filepath));
console.log(path.basename(filepath));
console.log(path.extname(filepath));
// 2.join
const basepath = "../User/abc";
const filename = "./abc.txt";
const othername = "./abc.js";
const filepath1 = path.join(basepath, filename);
// console.log(filepath1);
// resolve  the spliced path string has a / or . / or . / or .
const filepath2 = path.resolve(basepath, filename, othername);
console.log(filepath2);
const result = path.resolve(basepath2, filename2);
console.log(result);
```

## fs

```js
const fs = require("fs");
const filepath = "./abc.txt";
// 1.Synchronized operation
const info = fs.statSync(filepath);
console.log("Code to be executed later");
console.log(info);
// 2.Asynchronous operations
fs.stat(filepath, (err, info) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(info);
  console.log(info.isFile());
  console.log(info.isDirectory());
});
console.log("Code to be executed later");
// 3. Promise
fs.promises
  .stat(filepath)
  .then((info) => {
    console.log(info);
  })
  .catch((err) => {
    console.log(err);
  });
console.log("Code to be executed later");

fs.open("./abc.txt", (err, fd) => {
  if (err) {
    console.log(err);
    return;
  }
});
// Get information about a file by its descriptor
fs.fstat(fd, (err, info) => {
  console.log(info);
});
// File Write
fs.writeFile("./abc.txt", content, { flag: "a" }, (err) => {
  console.log(err);
});

// File Reading
fs.readFile("./abc.txt", { encoding: "utf-8" }, (err, data) => {
  console.log(data);
});

// Create Folder
const dirname = "./malaaa";
if (!fs.existsSync(dirname)) {
  fs.mkdir(dirname, (err) => {
    console.log(err);
  });
}
// Read all files in a folder (recursion)
function getFiles(dirname) {
  fs.readdir(dirname, { withFileTypes: true }, (err, files) => {
    for (let file of files) {
      if (file.isDirectory()) {
        const filepath = path.resolve(dirname, file.name);
        getFiles(filepath);
      } else {
        console.log(file.name);
      }
    }
  });
}
getFiles(dirname);

// 3.rename
fs.rename("./malaaa", "./kobe", (err) => {
  console.log(err);
});
```

## events (Asynchronous event) Sending events and listening to events are done through the EventEmitter class, and they both belong to the events object.

```js
const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.on("click", (args) => {
  console.log("Listening to 1 to click events", args);
});
const listener2 = (args) => {
  console.log("Listening to 2 to click events", args);
};
emitter.on("click", listener2);

emitter.on("tap", (args) => {
  console.log(args);
});
setTimeout(() => {
  emitter.emit("click", "malaaa", "james", "kobe");
  emitter.off("click", listener2);
  emitter.emit("click", "malaaa", "james", "kobe");
}, 2000);
// Get subscribed events
console.log(emitter.eventNames());
console.log(emitter.listenerCount("click"));
console.log(emitter.listeners("click"));
```
