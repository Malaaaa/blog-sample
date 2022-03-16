Switch can "fall through" without break --[MDN]([A re-introduction to JavaScript (JS tutorial) - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript))

situation 1

```js
function eatIt(){ console.log("eat")};
var a = 1

switch (a) {
  case 1: // fallthrough
  case 2:
    eatIt();
    break;
  default:
    doNothing();
}
```

output will be 

```js
eat
```

situation 2

```js

switch (a) {
  case 1:     
    eatIt();
// fallthrough
  case 2:
    eatIt();
    break;
  default:
    doNothing();
}
```

output will be 

```js
eat
eat
```

