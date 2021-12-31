### Flutter 学习

#### 概述 Overview 

- 是谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原生用户界面。也可以做web等等 多端公用。
- [flutter实战](https://book.flutterchina.club/) 之后的操作也都以此书为基础
- DOM 树 和 控件树 类似 
  - DOM tree (html)![DOM tree](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/pic_htmltree.gif)
  - Widget tree(flutter) ![Widget tree](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/OIP.Bw-atr2JI-0ypRc2E9JcZgHaGa)

> 层级关系 像Unity一样

- Flutter使用自己的高性能渲染引擎来绘制widget。
- Flutter高性能主要靠两点来保证，首先，Flutter APP采用Dart语言开发。Dart在 JIT（即时编译）模式下，速度与 JavaScript基本持平。但是 Dart支持 AOT，当以 AOT（运行前编译）模式运行时，JavaScript便远远追不上了。速度的提升对高帧率下的视图数据计算很有帮助。其次，Flutter使用自己的渲染引擎来绘制UI，布局数据等由Dart语言直接控制，所以在布局过程中不需要像RN那样要在JavaScript和Native之间通信，这在一些滑动和拖动的场景下具有明显优势。
  
- Flutter框架结构

  > ![框架结构](https://pcdn.flutterchina.club/imgs/1-1.png
  
- “Hot Reload”只会重新构建整个widget树)

#### Dart 语言基础

##### 变量声明

1. **var**

   类似于JavaScript中的`var`，它可以接收任何类型的变量，但最大的不同是Dart中var变量一旦赋值，类型便会确定，则不能再改变其类型，如：

   ```dart
   var t;
   t = "hi world";
   // 下面代码在dart中会报错，因为变量t的类型已经确定为String，
   // 类型一旦确定后则不能再更改其类型。
   t = 1000;
   ```

   Dart是一个强类型语言，任何变量都是有确定类型的，在Dart中，当用`var`声明一个变量后，Dart在编译时会根据第一次赋值数据的类型来推断其类型，编译结束后其类型就已经被确定。

2. **dynamic**和**Object**

    `Object` 是Dart所有对象的根基类，也就是说所有类型都是`Object`的子类(包括Function和Null)，所以任何类型的数据都可以赋值给`Object`声明的对象.
    `dynamic`与`var`一样都是关键词,声明的变量可以赋值任意对象。
    而`dynamic`与`Object`相同之处在于,他们声明的变量可以在后期改变赋值类型。

    ```dart
    dynamic t;
    Object x;
    t = "hi world";
    x = 'Hello Object';
    //下面代码没有问题
    t = 1000;
    x = 1000;
    ```

   `dynamic`与`Object`不同的是,`dynamic`声明的对象编译器会提供所有可能的组合,
   而`Object`声明的对象只能使用Object的属性与方法, 否则编译器会报错。如:

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

   变量a不会报错, 变量b编译器会报错

   `dynamic`的这个特性与`Objective-C`中的`id`作用很像.
   `dynamic`的这个特点使得我们在使用它时需要格外注意,这很容易引入一个运行时错误.

3. **final**和**const**

   如果您从未打算更改一个变量，那么使用 `final` 或 `const`，不是`var`，也不是一个类型。 一个 `final` 变量只能被设置一次，两者区别在于：`const` 变量是一个编译时常量，`final`变量在第一次使用时被初始化。被`final`或者`const`修饰的变量，变量类型可以省略，如：

   ```dart
   //可以省略String这个类型声明
   final str = "hi world";
   //final String str = "hi world"; 
   const str1 = "hi world";
   //const String str1 = "hi world";
   ```

##### 函数

Dart是一种真正的面向对象的语言，所以即使是函数也是对象，并且有一个类型**Function**。这意味着函数可以赋值给变量或作为参数传递给其他函数，这是函数式编程的典型特征。

1. 函数声明

   ```dart
   bool isNoble(int atomicNumber) {
     return _nobleGases[atomicNumber] != null;
   }
   ```

   Dart函数声明如果没有显式声明返回值类型时会默认当做`dynamic`处理，注意，函数返回值没有类型推断：

   ```dart
   typedef bool CALLBACK();
   
   //不指定返回类型，此时默认为dynamic，不是bool
   isNoble(int atomicNumber) {
     return _nobleGases[atomicNumber] != null;
   }
   
   void test(CALLBACK cb){
      print(cb()); 
   }
   //报错，isNoble不是bool类型
   test(isNoble);
   ```

2. 对于只包含一个表达式的函数，可以使用简写语法

   ```dart
   bool isNoble (int atomicNumber)=> _nobleGases [ atomicNumber ] ！= null ;   
   ```

3. 函数作为变量

   ```dart
   var say = (str){
     print(str);
   };
   say("hi world");
   ```

4. 函数作为参数传递

   ```dart
   void execute(var callback) {
       callback();
   }
   execute(() => print("xxx"))
   ```

5. 可选的位置参数

   包装一组函数参数，用[]标记为可选的位置参数，并放在参数列表的最后面：

   ```dart
   String say(String from, String msg, [String device]) {
     var result = '$from says $msg';
     if (device != null) {
       result = '$result with a $device';
     }
     return result;
   }
   ```

   下面是一个不带可选参数调用这个函数的例子：

   ```dart
   say('Bob', 'Howdy'); //结果是： Bob says Howdy
   ```

   下面是用第三个参数调用这个函数的例子：

   ```dart
   say('Bob', 'Howdy', 'smoke signal'); //结果是：Bob says Howdy with a smoke signal
   ```

6. 可选的命名参数

   定义函数时，使用{param1, param2, …}，放在参数列表的最后面，用于指定命名参数。例如：

   ```dart
   //设置[bold]和[hidden]标志
   void enableFlags({bool bold, bool hidden}) {
       // ... 
   }
   ```

   调用函数时，可以使用指定命名参数。例如：`paramName: value`

   ```dart
   enableFlags(bold: true, hidden: false);
   ```

   可选命名参数在Flutter中使用非常多。

   **注意，不能同时使用可选的位置参数和可选的命名参数**

##### 异步支持

Dart类库有非常多的返回`Future`或者`Stream`对象的函数。 这些函数被称为**异步函数**：它们只会在设置好一些耗时操作之后返回，比如像 IO操作。而不是等到这个操作完成。

`async`和`await`关键词支持了异步编程，允许您写出和同步代码很像的异步代码。

###### Future

`Future`与JavaScript中的`Promise`非常相似，表示一个异步操作的最终完成（或失败）及其结果值的表示。简单来说，它就是用于处理异步操作的，异步处理成功了就执行成功的操作，异步处理失败了就捕获错误或者停止后续操作。一个Future只会对应一个结果，要么成功，要么失败。

由于本身功能较多，这里我们只介绍其常用的API及特性。还有，请记住，`Future` 的所有API的返回值仍然是一个`Future`对象，所以可以很方便的进行链式调用。

####### Future.then

为了方便示例，在本例中我们使用`Future.delayed` 创建了一个延时任务（实际场景会是一个真正的耗时任务，比如一次网络请求），即2秒后返回结果字符串"hi world!"，然后我们在`then`中接收异步结果并打印结果，代码如下：

```dart
Future.delayed(new Duration(seconds: 2),(){
   return "hi world!";
}).then((data){
   print(data);
});
```

##### Future.catchError

如果异步任务发生错误，我们可以在`catchError`中捕获错误，我们将上面示例改为：

```dart
Future.delayed(new Duration(seconds: 2),(){
   //return "hi world!";
   throw AssertionError("Error");  
}).then((data){
   //执行成功会走到这里  
   print("success");
}).catchError((e){
   //执行失败会走到这里  
   print(e);
});
```

在本示例中，我们在异步任务中抛出了一个异常，`then `的回调函数将不会被执行，取而代之的是 `catchError`回调函数将被调用；但是，并不是只有 `catchError`回调才能捕获错误，`then`方法还有一个可选参数`onError`，我们也可以它来捕获异常：

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

有些时候，我们会遇到无论异步任务执行成功或失败都需要做一些事的场景，比如在网络请求前弹出加载对话框，在请求结束后关闭对话框。这种场景，有两种方法，第一种是分别在`then`或`catch`中关闭一下对话框，第二种就是使用`Future`的`whenComplete`回调，我们将上面示例改一下：

```dart
Future.delayed(new Duration(seconds: 2),(){
   //return "hi world!";
   throw AssertionError("Error");
}).then((data){
   //执行成功会走到这里 
   print(data);
}).catchError((e){
   //执行失败会走到这里   
   print(e);
}).whenComplete((){
   //无论成功或失败都会走到这里
});
```



####### Future.wait

有些时候，我们需要等待多个异步任务都执行结束后才进行一些操作，比如我们有一个界面，需要先分别从两个网络接口获取数据，获取成功后，我们需要将两个接口数据进行特定的处理后再显示到UI界面上，应该怎么做？答案是`Future.wait`，它接受一个`Future`数组参数，只有数组中所有`Future`都执行成功后，才会触发`then`的成功回调，只要有一个`Future`执行失败，就会触发错误回调。下面，我们通过模拟`Future.delayed` 来模拟两个数据获取的异步任务，等两个异步任务都执行成功时，将两个异步任务的结果拼接打印出来，代码如下：

```dart
Future.wait([
  // 2秒后返回结果  
  Future.delayed(new Duration(seconds: 2), () {
    return "hello";
  }),
  // 4秒后返回结果  
  Future.delayed(new Duration(seconds: 4), () {
    return " world";
  })
]).then((results){
  print(results[0]+results[1]);
}).catchError((e){
  print(e);
});
```

执行上面代码，4秒后你会在控制台中看到“hello world”。

###### Async/await

Dart中的`async/await` 和JavaScript中的`async/await`功能和用法是一模一样的，如果你已经了解JavaScript中的`async/await`的用法，可以直接跳过本节。

####### 回调地狱(Callback Hell)

如果代码中有大量异步逻辑，并且出现大量异步任务依赖其它异步任务的结果时，必然会出现`Future.then`回调中套回调情况。举个例子，比如现在有个需求场景是用户先登录，登录成功后会获得用户ID，然后通过用户ID，再去请求用户个人信息，获取到用户个人信息后，为了使用方便，我们需要将其缓存在本地文件系统，代码如下：

```dart
//先分别定义各个异步任务
Future<String> login(String userName, String pwd){
    ...
    //用户登录
};
Future<String> getUserInfo(String id){
    ...
    //获取用户信息 
};
Future saveUserInfo(String userInfo){
    ...
    // 保存用户信息 
}; 
```

接下来，执行整个任务流：

```dart
login("alice","******").then((id){
 //登录成功后通过，id获取用户信息    
 getUserInfo(id).then((userInfo){
    //获取用户信息后保存 
    saveUserInfo(userInfo).then((){
       //保存用户信息，接下来执行其它操作
        ...
    });
  });
})
```

可以感受一下，如果业务逻辑中有大量异步依赖的情况，将会出现上面这种在回调里面套回调的情况，过多的嵌套会导致的代码可读性下降以及出错率提高，并且非常难维护，这个问题被形象的称为**回调地狱（Callback Hell）**。回调地狱问题在之前JavaScript中非常突出，也是JavaScript被吐槽最多的点，但随着ECMAScript6和ECMAScript7标准发布后，这个问题得到了非常好的解决，而解决回调地狱的两大神器正是ECMAScript6引入了`Promise`，以及ECMAScript7中引入的`async/await`。 而在Dart中几乎是完全平移了JavaScript中的这两者：`Future`相当于`Promise`，而`async/await`连名字都没改。接下来我们看看通过`Future`和`async/await`如何消除上面示例中的嵌套问题。

####### 使用Future消除Callback Hell

```dart
login("alice","******").then((id){
  	return getUserInfo(id);
}).then((userInfo){
    return saveUserInfo(userInfo);
}).then((e){
   //执行接下来的操作 
}).catchError((e){
  //错误处理  
  print(e);
});
```

正如上文所述， *“`Future` 的所有API的返回值仍然是一个`Future`对象，所以可以很方便的进行链式调用”* ，如果在then中返回的是一个`Future`的话，该`future`会执行，执行结束后会触发后面的`then`回调，这样依次向下，就避免了层层嵌套。

###### 使用async/await消除callback hell

通过`Future`回调中再返回`Future`的方式虽然能避免层层嵌套，但是还是有一层回调，有没有一种方式能够让我们可以像写同步代码那样来执行异步任务而不使用回调的方式？答案是肯定的，这就要使用`async/await`了，下面我们先直接看代码，然后再解释，代码如下：

```dart
task() async {
   try{
    String id = await login("alice","******");
    String userInfo = await getUserInfo(id);
    await saveUserInfo(userInfo);
    //执行接下来的操作   
   } catch(e){
    //错误处理   
    print(e);   
   }  
}
```

- `async`用来表示函数是异步的，定义的函数会返回一个`Future`对象，可以使用then方法添加回调函数。
- `await` 后面是一个`Future`，表示等待该异步任务完成，异步完成后才会往下走；`await`必须出现在 `async` 函数内部。

可以看到，我们通过`async/await`将一个异步流用同步的代码表示出来了。

> 其实，无论是在JavaScript还是Dart中，`async/await`都只是一个语法糖，编译器或解释器最终都会将其转化为一个Promise（Future）的调用链。



##### Stream

`Stream` 也是用于接收异步事件数据，和`Future` 不同的是，它可以接收多个异步操作的结果（成功或失败）。 也就是说，在执行异步任务时，可以通过多次触发成功或失败事件来传递结果数据或错误异常。 `Stream` 常用于会多次读取数据的异步任务场景，如网络内容下载、文件读写等。举个例子：

```dart
Stream.fromFutures([
  // 1秒后返回结果
  Future.delayed(new Duration(seconds: 1), () {
    return "hello 1";
  }),
  // 抛出一个异常
  Future.delayed(new Duration(seconds: 2),(){
    throw AssertionError("Error");
  }),
  // 3秒后返回结果
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

上面的代码依次会输出：

```dart
I/flutter (17666): hello 1
I/flutter (17666): Error
I/flutter (17666): hello 3
```
##### 继承(extends)

dart中的继承规则：

- 子类使用extends关键词来继承父类
- 子类会继承父类里面可见的属性和方法 但是不会继承构造函数
- 子类能复写父类的方法 getter和setter 
- 子类重写超类的方法，要用@override 
- 子类调用超类的方法，要用super
- 子类可以继承父类的非私有变量 

##### 混合 mixins (with)
mixins的中文意思是混入，就是在类中混入其他功能。在Dart中可以使用mixins实现类似多继承的功能因为mixins使用的条件，随着Dart版本一直在变，这里说的是Dart2.x中使用mixins的条件：
- (1) 作为mixins的类只能继承自Object，不能继承其他类
- (2) 作为mixins的类不能有构造函数
- (3) 一个类可以mixins多个mixins类
- (4) mixins绝不是继承，也不是接口，而是一种全新的特性 看具体代码：

##### 接口实现(implements)
  Flutter是没有interface的，但是Flutter中的每个类都是一个隐式的接口，这个接口包含类里的所有成员变量，以及定义的方法。如果有一个类 A,你想让类B拥有A的API，但又不想拥有A里的实现，那么你就应该把A当做接口，类B implements 类A.
  所以在Flutter中:class 就是 interface

- 当class被当做interface用时，class中的方法就是接口的方法，需要在子类里重新实现，在子类实现的时候要加@override
- 当class被当做interface用时，class中的成员变量也需要在子类里重新实现。在成员变量前加@override