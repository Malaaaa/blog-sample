### Flutter Learning

#### Overview Overview 

- is Google's mobile UI framework for quickly building high-quality native user interfaces on iOS and Android. It can also be used for web and other multi-end utilities.
- [flutter hands-on](https://book.flutterchina.club/) The subsequent operations are also based on this book
- DOM tree and control tree are similar 
  - DOM tree (html)! [DOM tree](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/pic_htmltree.gif)
  - Widget tree (flutter) ! [Widget tree](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/OIP.Bw-atr2JI-0ypRc2E9JcZgHaGa)

> Hierarchical relationships like Unity

- Flutter uses its own high performance rendering engine to draw widgets.
- Flutter's high performance is mainly ensured by two things, firstly, Flutter APP is developed in Dart language, which is basically the same speed as JavaScript in JIT (Just-In-Time) mode. However, Dart supports AOT, and when running in AOT (compile before run) mode, JavaScript is far behind. The speed increase is useful for calculating view data at high frame rates. Secondly, Flutter uses its own rendering engine to draw UI, and layout data etc. is directly controlled by Dart language, so there is no need to communicate between JavaScript and Native during the layout process like RN, which is a clear advantage in some sliding and dragging scenarios.
  
- Flutter framework structure

  > ! [Framework Structure](https://pcdn.flutterchina.club/imgs/1-1.png)
  
- "Hot Reload" only rebuilds the entire widget tree)

#### Dart Language Fundamentals

##### Variable Declarations

1. **var**

   Similar to `var` in JavaScript, it can receive variables of any type, but the biggest difference is that once a var variable is assigned a value in Dart, the type is determined and then the type cannot be changed, e.g.

   ```dart
   var t;
   t = "hi world";
   // The following code will report an error in dart, because the type of variable t has been determined as String.
   // Once the type is determined, it cannot be changed again.
   t = 1000;
   ```

   Dart is a strongly typed language, any variable has a definite type. In Dart, when a variable is declared with `var`, Dart will infer its type according to the type of the first assignment, and its type will be determined after compilation.

2. **dynamic** and **Object**

    `Object` is the root class of all Dart objects, that is, all types are subclasses of `Object` (including Function and Null), so any type of data can be assigned to an object declared by `Object`.
    `dynamic` is the same keyword as `var`, and the declared variables can be assigned to any object.
    And `dynamic` is the same as `Object` in that the variables they declare can change the type of assignment at a later stage.

    ```dart
    dynamic t;
    Object x;
    t = "hi world";
    x = 'Hello Object';
    // The following code is fine
    t = 1000;
    x = 1000;
    ```

   The difference between `dynamic` and `Object` is that the compiler will provide all possible combinations of objects declared by `dynamic`,
   The object declared by `Object` can only use the properties and methods of Object, otherwise the compiler will report an error. For example:

   ```dart
    dynamic a;
    Object b;
    main() {
        a = "";
        b = "";
        printLengths();
    }   

    printLengths() {
        // no warning
        print(a.length);
        // warning:
        // The getter 'length' is not defined for the class 'Object'
        print(b.length);
    }
   ```

   Variable a will not report an error, variable b will be reported by the compiler

   This feature of `dynamic` is similar to the role of `id` in `Objective-C`.
   This feature of `dynamic` makes us need to be careful when using it, as it can easily introduce a runtime error.

3. **final** and **const**

   If you never intend to change a variable, then use `final` or `const`, not `var`, and not a type. A `final` variable can only be set once, the difference being that a `const` variable is a compile-time constant and a `final` variable is initialized the first time it is used. Variables modified by `final` or `const` have variable types that can be omitted, e.g.

   ```dart
   // The type declaration String can be omitted
   final str = "hi world";
   //final String str = "hi world"; 
   const str1 = "hi world";
   //const String str1 = "hi world";
   ```

##### Functions

Dart is a true object-oriented language, so even functions are objects and have a type **Function**. This means that functions can be assigned to variables or passed as arguments to other functions, which is typical of functional programming.

1. Function declaration

   ```dart
   bool isNoble(int atomicNumber) {
     return _nobleGases[atomicNumber] ! = null;
   }
   ```

   Dart function declarations that do not explicitly declare the return value type are treated as ``dynamic`` by default, note that there is no type inference for the function return value.

   ```dart
   typedef bool CALLBACK();
   
   //do not specify the return type, the default is dynamic, not bool
   isNoble(int atomicNumber) {
     return _nobleGases[atomicNumber] ! = null;
   }
   
   void test(CALLBACK cb){
      print(cb()); 
   }
   // error, isNoble is not a bool type
   test(isNoble);
   ```

2. For functions that contain only one expression, you can use the abbreviated syntax

   ```dart
   bool isNoble (int atomicNumber) => _nobleGases [ atomicNumber ] ! = null ;   
   ```

3. Functions as variables

   ```dart
   var say = (str){
     print(str);
   };
   say("hi world");
   ```

4. Functions passed as arguments

   ```dart
   void execute(var callback) {
       callback();
   }
   execute(() => print("xxx"))
   ```

5. Optional positional arguments

   Wrap a set of function arguments, mark them as optional positional arguments with [], and place them at the end of the argument list.

   ```dart
   String say(String from, String msg, [String device]) {
     var result = '$from says $msg';
     if (device ! = null) {
       result = '$result with a $device';
     }
     return result;
   }
   ```

   Here is an example of calling this function without optional arguments.

   ```dart
   say('Bob', 'Howdy'); // the result is: Bob says Howdy
   ```

   The following is an example of calling this function with the third argument.

   ```dart
   say('Bob', 'Howdy', 'smoke signal'); // the result is: Bob says Howdy with a smoke signal
   ```

6. Optional named parameters

   When defining a function, use {param1, param2, ...}, placed at the end of the parameter list, to specify named parameters. For example.

   ```dart
   // Set the [bold] and [hidden] flags
   void enableFlags({bool bold, bool hidden}) {
       // ... 
   }
   ```

   When calling a function, you can use the specified named parameter. For example: ``paramName: value``

   ```dart
   enableFlags(bold: true, hidden: false);
   ```

   Optional named parameters are very much used in Flutter.

   **Note that you cannot use both optional position parameters and optional named parameters**

##### Asynchronous support

The Dart class library has a very large number of functions that return `Future` or `Stream` objects. These functions are called **Asynchronous functions**: they only return after some time-consuming operation has been set up, like an IO operation. Instead of waiting until the operation is complete.

The `async` and `await` keywords support asynchronous programming, allowing you to write asynchronous code much like synchronous code.

###### Future

`Future` is very similar to `Promise` in JavaScript and represents the final completion (or failure) of an asynchronous operation and the representation of its result value. In short, it is used to handle asynchronous operations. If the asynchronous processing succeeds, the successful operation is executed, and if the asynchronous processing fails, an error is caught or the subsequent operation is stopped. A Future will only correspond to one result, either success or failure.

Since it has a lot of functions, we will only introduce its common API and features here. Also, remember that the return value of all `Future` APIs is still a `Future` object, so it is easy to chain calls.

####### Future.then

For the sake of example, in this case we use `Future.delayed` to create a delayed task (the actual scenario would be a real time-consuming task, like a network request) that returns the result string "hi world!" after 2 seconds, and then we receive the asynchronous result in `then` and print the result with the following code.

```dart
Future.delayed(new Duration(seconds: 2), (){
   return "hi world!";
}).then((data){
   print(data);
});
```

##### Future.catchError

If an error occurs in an asynchronous task, we can catch the error in ``catchError``, and we change the above example to

```dart
Future.delayed(new Duration(seconds: 2),(){
   //return "hi world!";
   throw AssertionError("Error");  
}).then((data){
   //execute successfully will go here  
   print("success");
}).catchError((e){
   //execution failure goes here  
   print(e);
});
```

In this example, we have thrown an exception in an asynchronous task and the `then` callback function will not be executed, instead the `catchError` callback function will be called; however, the `catchError` callback is not the only one that catches errors, the `then` method has an optional parameter `onError` that we can also use to catch the exception.

```dart
Future.delayed(new Duration(seconds: 2), () {
    //return "hi world!";
    throw AssertionError("Error");
}).then((data) {
    print("success");
}, onError: (e) {
    print(e);
});
```

####### Future.whenComplete

There are times when we encounter scenarios where we need to do something regardless of the success or failure of the asynchronous task execution, such as popping up the load dialog before the network request and closing it after the request is finished. The first one is to close the dialog in `then` or `catch` respectively, and the second one is to use `whenComplete` callback of `Future`, we will change the above example as follows

```dart
Future.delayed(new Duration(seconds: 2),(){
   //return "hi world!";
   throw AssertionError("Error");
}).then((data){
   // execution success will go here 
   print(data);
}).catchError((e){
   //Failed execution goes here   
   print(e);
}).whenComplete((){
   //will go here whether it succeeds or fails
});
```



####### Future.wait

There are times when we need to wait for multiple asynchronous tasks to finish executing before performing some operations, for example, we have an interface that needs to fetch data from two web interfaces separately first, and after the successful fetching, we need to perform specific processing on the two interface data before displaying it on the UI interface, how should we do that? The answer is `Future.wait`, which accepts an array of `Future` parameters, only after all `Future` in the array are executed successfully, the success callback of `then` will be triggered, as long as there is a `Future` execution failure, the error callback will be triggered. In the following, we simulate two asynchronous tasks of data fetching by simulating ``Future.delayed``, and when both asynchronous tasks are executed successfully, the results of the two asynchronous tasks are stitched together and printed out, with the following code.

```dart
Future.wait([
  // return the result after 2 seconds  
  Future.delayed(new Duration(seconds: 2), () {
    return "hello";
  }),
  // return the result after 4 seconds  
  Future.delayed(new Duration(seconds: 4), () {
    return " world";
  })
]).then((results){
  print(results[0]+results[1]);
}).catchError((e){
  print(e);
});
```

Execute the above code and you will see "hello world" in the console after 4 seconds.

###### Async/await

The function and usage of `async/await` in Dart and `async/await` in JavaScript are exactly the same, so if you already know the usage of `async/await` in JavaScript, you can just skip this section.

####### Callback Hell

If there is a lot of asynchronous logic in the code, and if there are a lot of asynchronous tasks that depend on the results of other asynchronous tasks, there is bound to be a callback situation in the `Future.then` callback. For example, let's say there is a requirement scenario where the user logs in first, and then gets the user ID after successful login, and then requests the user's personal information through the user ID, and after getting the user's personal information, we need to cache it in the local file system for ease of use, with the following code.

```dart
// First define each asynchronous task separately
Future<String> login(String userName, String pwd){
    ...
    //user login
};
Future<String> getUserInfo(String id){
    ...
    //get user information 
};
Future saveUserInfo(String userInfo){
    ...
    // Save user information 
}; 
```

Next, execute the entire task flow.

```dart
login("alice", "******").then((id){
 //get user information by, id after successful login    
 getUserInfo(id).then((userInfo){
    //Get the user information and save it 
    saveUserInfo(userInfo).then((){
       //Save the user information and perform other operations next
        ...
    });
  });
})
```

If there are a lot of asynchronous dependencies in the business logic, there will be a callback inside the callback, too much nesting will lead to a decrease in readability and error rate, and it is very difficult to maintain, this problem is imaginatively called **Callback Hell**. The callback hell problem was very prominent in JavaScript before, and was the most trolled point of JavaScript, but with the release of the ECMAScript6 and ECMAScript7 standards, this problem has been very well solved, and the two magic tools to solve the callback hell are the introduction of `Promise` in ECMAScript6, and the introduction of `Promise` in ECMAScript7. and the introduction of `async/await` in ECMAScript7. In Dart, the two are almost completely panned in JavaScript: `Future` is equivalent to `Promise`, and `async/await` doesn't even change its name. Next, let's see how we can eliminate the nesting problem in the above example by using `Future` and `async/await`.

####### Eliminating Callback Hell with Future

```dart
login("alice", "******").then((id){
  	return getUserInfo(id);
}).then((userInfo){
    return saveUserInfo(userInfo);
}).then((e){
   //execute the next action 
}).catchError((e){
  // error handling  
  print(e);
});
```

As mentioned above, *"the return value of all the APIs of `Future` is still a `Future` object, so it's easy to chain calls "* , if a `Future` is returned in then, the `future` will execute, and the end of execution will trigger the The `then` callback will be triggered after the execution, so that the nesting of layers is avoided by sequentially going down.

###### Eliminate callback hell with async/await

Is there a way to execute asynchronous tasks as we write synchronous code without using callbacks? The answer is yes, this is to use `async/await`, the following we look directly at the code first, and then explain, the code is as follows.

```dart
task() async {
   try{
    String id = await login("alice", "******");
    String userInfo = await getUserInfo(id);
    await saveUserInfo(userInfo);
    //execute the next action   
   } catch(e){
    // error handling   
    print(e);   
   }  
}
```

- `async` is used to indicate that the function is asynchronous, and the defined function returns a `Future` object, which can be used to add a callback function using the then method.
- `await` is followed by a `Future`, which indicates that it waits for that asynchronous task to complete, and will only go down when the asynchrony is complete; `await` must appear inside the `async` function.

As you can see, we have represented an asynchronous stream in synchronous code by `async/await`.

> In fact, in both JavaScript and Dart, `async/await` is just syntactic sugar that the compiler or interpreter will eventually translate into a chain of calls to a Promise (Future).

##### Stream

`Stream` is also used to receive asynchronous event data, unlike `Future`, it can receive the result of multiple asynchronous operations (success or failure). That is, when executing an asynchronous task, the result data or error exceptions can be passed by triggering the success or failure event multiple times. `Stream` is often used in asynchronous task scenarios where data is read multiple times, such as downloading network content, reading and writing files, etc. As an example.

```dart
Stream.fromFutures([
  // return the result after 1 second
  Future.delayed(new Duration(seconds: 1), () {
    return "hello 1";
  }),
  // Throw an exception
  Future.delayed(new Duration(seconds: 2), () {
    throw AssertionError("Error");
  }),
  // return result after 3 seconds
  Future.delayed(new Duration(seconds: 3), () {
    return "hello 3";
  })
]).listen((data){
   print(data);
}, onError: (e){
   print(e.message);
},onDone: (){

});
```

The above code will output in turn.

```dart
I/flutter (17666): hello 1
I/flutter (17666): Error
I/flutter (17666): hello 3
```

##### Inheritance (extends)

The inheritance rules in dart.

- Subclasses use the extends keyword to inherit from the parent class
- Subclasses inherit the properties and methods visible in the parent class, but not the constructor.
- subclasses can override the parent's methods getter and setter 
- subclasses override superclass methods with @override 
- subclasses call superclass methods with super
- Subclasses can inherit non-private variables from the parent class 

##### mixins (with)

The Chinese word for mixins means to mix in, which means to mix in other functions in the class. In Dart, mixins can be used to achieve similar functionality as multiple inheritance because the conditions for using mixins have been changing with the Dart version, here are the conditions for using mixins in Dart 2.x.

- (1) as mixins class can only inherit from Object, can not inherit from other classes
- (2) the class as mixins can not have a constructor
- (3) a class can mixins more than one mixins class
- (4) mixins is never inheritance, nor is it an interface, but is a completely new feature Look at the specific code.

##### interface implementation(implementations)

  Flutter does not have interfaces, but each class in Flutter is an implicit interface that contains all the member variables and defined methods of the class. If you have a class A, and you want class B to have the API of A, but you don't want to have the implementation of A, then you should treat A as an interface, and class B implements class A.
  So in Flutter: class is interface

- When a class is used as an interface, the methods in the class are the methods of the interface and need to be reimplemented in the subclass, with @override in the subclass implementation.
- When a class is used as an interface, the member variables in the class also need to be reimplemented in the subclass. Add @override in front of member variables
