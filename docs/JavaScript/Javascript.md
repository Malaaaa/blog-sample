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
