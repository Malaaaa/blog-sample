# Rxjs vs Promise(Async/Await) and Observable vs Generator

Promise and rxjs are designed to be tools that solve different problems.
Observable is what we often call push mode (not we push, is Observable push), and Generator is pull mode (not Generator pull, is we pull).

**rxjs** stands for responsive programming. Provides asynchronous data flow to help developers develop applications.
**Promise(Async/Await)** solves the problem of asynchronous callbacks in javascript.
rxjs can fully achieve the effect of Promise through the combination of Observable and operater.

**Observable** Observables are lazy Push collections of multiple values, the officail site said. [detail](https://rxjs.dev/guide/observable)
**Generator** (use function* syntax) is a factory function to create an iterators. Create a custom loop action which can pull multiple values.

The table of officail site.

|      | Single   | Multiple   |
| ---- | -------- | ---------- |
| Pull | Function | Iterator   |
| Push | Promise  | Observable |

For single data, we may call Function and get the return value(Pull), or we use Promise get the value when the CallBack finished and deliver the value(Push).

```js
function getHelloWorld(){
    return "HelloWorld"
}
const data = getHelloWorld()
console.log(data);
```

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("HelloWorld");
  }, 300);
});
myPromise.then(data => console.log(data)).catch(error => console.log(error))
```

For the promise Function we can write a more readable way by using Async/Await as follow. `async` is the keyword which allowed we use `await` keyword.

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("HelloWorld");
  }, 300);
});
async function getHelloWorld() {
  try{
    var data = await myPromise;
    console.log(data); 
  }  catch (e) {
    console.log(e); 
  }
}
getHelloWorld()
```

For multiple data,  we may use Iterator(defined by Ganerator) and call next method multiple times, or we use Observable get the value when every CallBacks finished and deliver the value(Push).

```js
function* getIterator() {
  yield* "HelloWorld"; // similar to yield every letter one by one because String is iterable.
}
const getHelloWorld = getIterator()
console.log(getHelloWorld.next().value);
console.log(getHelloWorld.next().value);
console.log(getHelloWorld.next().value);
console.log(getHelloWorld.next().value);
console.log(getHelloWorld.next().value);
console.log(getHelloWorld.next().value);
console.log(getHelloWorld.next().value);
console.log(getHelloWorld.next().value);
```

```js
import { from } from 'rxjs';

const data = 'HelloWorld';
const observable = new Observable((subscriber) => {
  for (const x of data) {
    setTimeout(() => {
      subscriber.next(x);
      if (x === data[data.length - 1]) {
        subscriber.complete();
        console.log('after complete'); // this line also executed and after the complete() Callback.
      }
    }, 200);
  }
});
console.log('just before subscribe');
observable.subscribe({
  next(x) { console.log('got value ' + x); },
  error(err) { console.error('something wrong occurred: ' + err); },
  complete() { console.log('done'); }
});
console.log('just after subscribe');
```

![console](./image/2022-05-29-22-51-33.png)

The observable can directly call the `toPromise()` method to get the Promise and correctly resolve the result. The complete() Callback turn the statement to fullfilled and the final value is the resolve value.

```js
import { Observable } from 'rxjs';

const promise = new Promise(function (resolve, reject){
  resolve('i am promise');
});
​
const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});
​
const observablePromise = observable.toPromise();
observablePromise.then((value) => {
  console.log('observablePromise value is', value); //3
});
```

**Why the toPromise conversion?**
In fact, by design, Observable is a very much more powerful tool than Promise, so is it possible to use Observale when building applications. But Promise with async and await can increase the readability and maintenance cost of code in many cases, and if you need to combine more than one Observable in a method, use toPromise with await as if it were a If you need to combine multiple Observables within a method, using toPromise with await is as smooth as seeing a wild horse running.

```ts
function pureObservable(conditionA: Observable<boolean>, conditionB: Observable<boolean>, executor: Observable<any>) {
  return conditionA.pipe(
    mergeMap((value) => {
      if (value) {
        return conditionB;
      } else {
        return of(value);
      }
    }),
    mergeMap((value) => {
      if (value) {
        return executor;
      } else {
        return of(false);
      }
    }),
  )
}
​
async function withPromise(conditionA: Observable<boolean>, conditionB: Observable<boolean>, executor: Observable<any>) {
  const predicate = await conditionA.toPromise() && await conditionB.toPromise();
  return predicate && await executor.toPromise();
}

const ca = of(true);
const cb = of(true);
const exe = of('abc');

withPromise(ca, cb, exe);

pureObservable(ca, cb, exe).subscribe((value) => {
  console.log('pureObservable result', value);
});
```

**Why not just use promise?**

The biggest constraint of using promise alone with async,await is that the native ES specification of promise cannot be called externally from resolve. The most simple way on [stackflow](https://stackoverflow.com/questions/26150232/resolve-javascript-promise-outside-the-promise-constructor-scope) is

```js
var promiseResolve, promiseReject;

var promise = new Promise(function(resolve, reject){
  promiseResolve = resolve;
  promiseReject = reject;
});

promiseResolve();
```

Wrap another promise to caught the fulfilled state.

The rxjs Subject class can trigger the data flow from outside, and the ready state can be achieved with multicasting to many Observers.

## In short

**Promise**
Pro: a good way to solve single asynchronous function. The chaining is a elegant way to execute Callback Functions. With Async/Await keywords the readability and maintenance improve a lot.
Con: Native ES specification of promise cannot be called externally from resolve.
**Rxjs**
Pro: Simplifying Asynchronous JavaScript Logic. RxJS encapsulates all asynchronous events into Observable. Because all asynchronous events are encapsulated as Observable, all asynchronous events can be subscribed to with the same api. RxJS's Operator makes it very easy to implement very complex asynchronous operations.
Con: Learning curve complex, There is some difficulty in debugging the code also.
**Ganerator**
Pro: Very easy to implement custom iterators to lazy load values. Using generators can be combine with promise, using a synchronous coding style to handle asynchronous cases.
Con: Therefore a generator allows us to define a potentially infinite data structure. And it is synchronous may be blocking other functions.
