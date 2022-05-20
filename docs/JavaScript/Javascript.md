# Useful Javascript exmaple

```Javascript
export const files = [...document.querySelectorAll(".formfile")];

files.forEach((item)=>{
item.style.display = "none";
});

const failureItems = arr.map(item => `<li class="text-warning">${item}</li>`);  //iterator
```

Currying

```Javascript
function currying(fn) {
  function curried(...args) {
    if (args.length > fn.length) {
      fn.apply(this, args);
    } else {
      function currirdPartly(...argsPartly) {
        curried.apply(this, [...args, ...argsPartly]); //Recursion to handle every call.
      }
      return currirdPartly;
    }
  }
  return curried;
}
```
Download image

```js
var imgs = document.querySelectorAll(".list-thumb-image")
var pics =[]
pics.forEach.call(imgs, item => {
  let pic = {}
  pic.url = item.style.backgroundImage.split('"')[1]
  pics.push(pic)
})
var urls =[]

for(var i=0;i<10;i++){
  urls.push(pics[i].url)
}
const downloadRes = async (url, name) => {
  let response = await fetch(url) // Content to blob address
  let blob = await response.blob() // Create hidden downloadable links
  let objectUrl = window.URL.createObjectURL(blob)
  let a = document.createElement("a")
  a.href = objectUrl
  a.download = name
  a.click()
  a.remove()
}
pics.forEach((item, index) => {
  setTimeout(() => {
    downloadRes(item.url, index)
  }, 1000 * index)
})
```

Download Text

```js
var a = []
var hs = []
var h2 = document.querySelectorAll("h2")
for(var i=0;i<10;i++){
  hs.push(h2[i].innerText)
}
let csvContent = "data:text/csv;charset=utf-8," 
    + h2.join(",");
var encodedUri = encodeURI(csvContent);
window.open(encodedUri);
var ps = []
var p = document.querySelectorAll("p")
for(var i=0;i<10;i++){
  ps.push(p[i].innerText)
}
let cssvContent = "data:text/csv;charset=utf-8," 
    + p.join(",");
var encodedUri = encodeURI(cssvContent);
window.open(encodedUri,'ps');

let csssvContent = "data:text/csv;charset=utf-8," 
    + urls.join(",");
var encodedUri = encodeURI(csssvContent);
window.open(encodedUri);
```