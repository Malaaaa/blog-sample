function currying(fn) {
  function curried(...args) {
    if (args.length >= fn.length) {
      fn.apply(this, args);
    } else {
      function currirdPartly(...argsPartly) {
        return curried.apply(this, [...args, ...argsPartly]); //Recursion to handle every call.
      }
      return currirdPartly;
    }
  }
  return curried;
}
// func is the function to be converted
function curried(...args) {
  if (args.length >= func.length) {
    // (1) Same or longer just apply
    return func.apply(this, args);
  } else {
    return function (...args2) {
      // args2: incoming parameters, args: passed parameters.
      // (2) Get a partial function, Pass in the previously passed parameters with the new ones.
      return curried.apply(this, args.concat(args2));
    };
  }
}
function add(a, b, c, d, e) {
  return a + b + c + d + e;
}
const add4 = currying(add);
console.log(add4(1)(2)(3)(4)(5));
