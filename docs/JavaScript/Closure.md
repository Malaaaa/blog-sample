# Use Chrome devtools understanding Closure .



**Closure** is a inside function in another function. The purpose of it is to creat a local scope witch won't effect the global or outside funtion.  In MDN [there is a dtailed explanations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

In development, the Closure is very useful but can also cause a lot of trouble. In react hooks, some state may lost because of it. But we can easily get it out by useing devtools and have a clear view of thr **Closure**.

The following is a Clouser exmaple;

```js
const testClosure = () => {
  let num = 0;
  const effect = () => {
    num += 1;
    const message = `num value in message：${num}`;
    return function unmount() {
      console.log(message);
    };
  };
  return effect;
};
const add = testClosure();
const unmount = add();
add();
add();
add();
add();
unmount();
```

If you are fimiliar with clourse you can easily get the the output 

```
num value in message：1
```

What was happened in this process? Use the devtool I can explain to you without any diffculty to understanding.

Just press `F12`and chose source to get the js function location 

![devtool](F:\Github\blog-sample\docs\JavaScript\img\image-20220324134517641.png)

 At the sope area there is a Closure (./src/App.js) and we can see the only Global scope window. The Closure between them is index.js, and the top one also the deepest one is Closure (testClosure) in Clouser exmaple

![Scope](F:\Github\blog-sample\docs\JavaScript\img\scople.png)

I put a break point at line 22,The first time we call **testClosure**() , in the second deep Clouser. effect is an Anonymous Clouser in testClosure() and unmount() is a **Clouser** function with name 'unmount'.

!(F:\Github\blog-sample\docs\JavaScript\img\breakpoint.png)

![image-20220324141310209](F:\Github\blog-sample\docs\JavaScript\img\breakpoint.png)

From the picture, It is obvious the `const add` is undifined before Assignment. That is  Hoisting but you can't use it, for `let` and `const` there will be an  `Throws ReferenceError` you can see [MDN get more about hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)

Click next, step in testClosuer there are attributes [this, effect, let], and their Hoisting value undefined. Look at scope it is under (./src/App.js).

![image-20220324142854729](F:\Github\blog-sample\docs\JavaScript\img\testClosure.png)  	 

Just click next excute `const add = testClosure();` and we can see the return value is a **Anonymous** Function named effect (this name attribute is given for locate the function) .This add is same as effect but can be called in  function App scope.(effect can just called in function testClosure)

![image-20220324143430450](F:\Github\blog-sample\docs\JavaScript\img\returnValue.png)

Continue click to execute `const unmount = add();` It execute add() which get value from **testClosure** with num=0 and execute num+=1 then return a **funtion** unmount()(not a anonymous funtion) to unmount.(at end you can see the full scope)

![image-20220324192022626](F:\Github\blog-sample\docs\JavaScript\img\add.png)

Here is why the result is `num value in message：1`, The`const unmountis`assigned a property {message:"num value in message:1"}.

add() will change the num every call but don't excute **unmount** **function** so console have no output. But we can use `add()();`to get execute the inner function .This is also about Currying [click here know more about currying](https://javascript.info/currying-partials)

![image-20220324185224217](F:\Github\blog-sample\docs\JavaScript\img\inner.png)

At the end when we excute **unmount**(), we can see scope why the result is `num value in message：1` , unmount() is under **Closure** (effect) this **Closure** is created at `const unmount = add();` 

![image-20220324190442533](C:\Users\LMA192\AppData\Roaming\Typora\typora-user-images\image-20220324190442533.png)
