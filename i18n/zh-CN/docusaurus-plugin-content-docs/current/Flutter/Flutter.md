---
sidebar_position: 1
---

# 流利学习

## 概览

- 是谷歌的移动用户界面框架，以便在iOS和Android上快速构建高质量的本地用户界面。 它也可用于网络和其他多端公用事业。
- [流感手动](https://book.flutterchina.club/) 其后的操作也以这本书为基础
- DOM 树和控制树是相似的
  - DOM 树 (html) ！ [DOM树](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/pic_htmltree.gif)
  - 小部件树 (flutter) ！ [部件树](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/OIP.Bw-atr2JI-0ypRc2E9JcZgHaGa)

> 等级关系，例如Unity

- Flutter使用自己的高性能渲染引擎来绘制部件。
- 污染物的高性能主要通过两个因素来保证：第一，流体杀伤人员地雷是以黑体语言开发的。 在JIT (Just-In-Time) 模式中，它的速度与JavaScript基本相同。 但是，Dart 支持 AOT，当在 AOT (运行前编译)模式中，JavaScript 远远落后了。 速度增加有助于以高帧率计算视图数据。 第二，Flutter使用自己的渲染引擎绘制界面和布局数据等。 由 Dart 语言直接控制，因此在布局过程中, JavaScript 和 Native 之间, 像RN 之间没有必要进行通信。 这显然是某些滑动和拖拉情景中的优势。

- 流体框架结构

  > ! [框架结构](https://pcdn.flutterchina.club/imgs/1-1.png)

- "热重新加载"仅重建整个小部件树)

## 深色语言基础

### 变量声明

1. **瓦尔**

   类似于JavaScript中的 `var` ，它可以接收任何类型的变量。 但最大的差异是当一个var 变量在 Dart 被赋予值时， 类型已确定，然后类型无法更改，例如

   ```dart
   var t;
   t = “hi world”；
   // 以下代码将报告黑暗中的一个错误，因为变量的类型已经确定为字符串。
   // 一旦确定了类型，它不能再次更改。
   t = 1 000；
   ```

   暗色是一种强烈类型的语言，任何变量都具有确定的类型。 在 Dart 中，当变量与 `var`一起声明时 Dart 将根据第一次作业的类型推断其类型，其类型将在编译后确定。

2. **动态** and **对象**

    `对象` 是所有Dart 对象的根类，即： 所有类型都是 `对象的子类` (包括函数和Null) 所以任何类型的数据都可以分配给由 `对象` 声明的对象。 `动态` 是与 `var`相同的关键词，声明的变量可以分配给任何对象。 `动态` 与 `对象` 相同，因为他们声明的变量可以在稍后阶段更改作业类型。

    ```dart
    动态t;
    对象 x;
    t = "hi world";
    x = 'Hello Object';
    // 下面的代码很好
    t = 1000;
    x = 1000;
    ```

   `动态` 和 `对象` 之间的差别是，编译器将提供 `动态`声明的对象的所有可能组合 由 `对象声明的对象` 只能使用对象的属性和方法， 否则编译器会报告错误。 例如：

   ```dart
    动态的；
    对象 b;
    main() {
        a = "";
        b = "";
        打印长度（）；
    }   

    printLengths() {
        // 没有警告
        print(a.length);
        // 警告：
        // 没有为类 'Object' 定义 getter 'length'
        print(b.length);
}
   ```

   变量不会报告错误，变量b将由编译器报告

   `dynamic` 的这个特性类似于 `id` 在 `Objective-C`中的作用。 `动态` 的这个特性使我们在使用它时需要小心，因为它可以很容易地引入运行时错误。

3. **终极** and **const**

   如果您不打算更改变量，请使用 `final` 或 `const`, 不是 `var`, 而不是类型。 `最后` 变量只能设置一次， 差异是 `const` 变量是一个编译时间常量和 `最后的` 变量是首次使用时初始化的。 由 `最终` 或 `const` 修改的变量类型可以被省略，例如：

   ```dart
   // 类型声明字符串可以省略
   最终str = "hi world";
   //final String str = “hi world”； 
   const str1 = “hi world”；
   //const String string str1 = “hi world”；
   ```

### 职能

Dart 是一个真正面向对象的语言，所以即使是函数也是对象，并且有类型 **函数**。 这意味着可以将功能分配给变量或作为参数传递给其他功能，而其他功能是职能方案拟订的典型。

1. 函数声明

   ```dart
   bool isNoble(int atomicNumber) {
     return _nobleGases[atomicNumber]！ = null;
}
   ```

   未明确声明返回值类型的暗色函数声明默认被当作 `动态` 来处理， 注意函数返回值没有类型的推论。

   ```dart
   typef bool CALLBACK();

   //do 不指定返回类型, 默认是动态的, 不是 bool
   isNoble(int atomicNumber) format@@
     return _nobleGases[atomicNumber]！ = null；
   }

   无效test(CALLBACK cb)。
      print(cb))； 
   }
   // 错误，不可以是一种布尔类型
   测试(isNoble)；
   ```

2. 对于只包含一个表达式的函数，您可以使用缩写语法

   ```dart
   bool Noble (int atomicNumber) => _nobleGases [ atomicNumber ] ！ = nul；   
   ```

3. 作为变量的函数

   ```dart
   var say = (str)}.
     print(str);
   };
   say("hi world");
   ```

4. 作为参数传递的函数

   ```dart
   void execute(var callback) {
       callback();
   }
   execute(() => print("xxx"))
   ```

5. 可选位置参数

   将一组函数参数换成[]，标记它们为可选的位置参数，并将它们放在参数列表的末尾。

   ```dart
   String say(String from, String msg, [String device]) {
     var result = '$from say $msg';
     如果（设备！ = null) v.
       results = '$result with a $device';
     }
     return result;
}
   ```

   这是一个没有可选参数的调用此函数的例子。

   ```dart
   say('Bob', 'Howdy'); // the result is: Bob says Howdy
   ```

   以下是用第三个参数来称呼此功能的一个例子。

   ```dart
   说('Bob', 'Howdy', 'smoke signal'); // 结果: Bob says howdy with a smoke signe
   ```

6. 可选命名参数

   定义函数时，使用 {param1, param2, ...}，放在参数列表的末尾，以指定命名参数。 例如：

   ```dart
   // 设置 [bold] 和 [hidden] 标志
   void enableFlags({bool bold, bool hidden}) {
       // ... 
}
   ```

   调用函数时，您可以使用指定的参数。 例如： `个参数名称：值`

   ```dart
   启用标志(bold: true, hidden: false);
   ```

   可选的命名参数在污染物中非常常用。

   **注意您不能同时使用可选的位置参数和可选的命名参数**

### 异步支持

Dart 类库有大量函数返回 `未来` 或 `Stream` 对象。 这些函数叫做 **异步函数**：它们只是在一些耗费时间的操作设置之后才返回，就像IO 操作一样。 而不是等到行动完成。

`async` and `正在等待` 关键字支持异步编程，使您能够写异步代码非常像同步代码。

#### 未来

`未来` 非常类似于JavaScript中的 `承诺` ，并且代表异步操作的最终完成(或失败)以及结果值的表达。 简而言之，它用于处理异步操作。 如果异步处理成功，执行成功， 并且，如果异步处理失败，则出现错误或其后的操作停止。 未来只能与成功或失败的一个结果相对应。

由于它有很多功能，我们只会在这里介绍它共同的 API 和功能。 另外，请记住所有 `未来` API仍然是 `未来` 对象， 所以它很容易接听电话。

##### 然后是

为了示例，在这种情况下，我们使用 `未来。 延迟了` 来创建一个延迟的任务(实际情况将是一项真正耗费时间的任务)。 像一个网络请求那样返回结果字符串"hi world! 2秒后，我们会收到异步结果 `然后` 然后用以下代码打印结果。

```dart
Future.delayed(new Duration(seconds: 2), ()}
   return "hi world!";
}).then((data)}
   print(data);
});
```

### Future.catch错误

如果异步任务中出现错误，我们可以在 `捕获错误`中找到错误，我们将上面的示例更改为

```dart
Future.delayed(new Duration(seconds:2),()}
   //return "hi world!";
   duture AssertionError("Error");  
})。 hen(data)@un.org
   /execution successful will go his  
   print("success");
})。 atchError((e))}
   //execution fails here  
   print(e);
})；
```

在此示例中，我们在异步任务中抛出了一个异步， `当时` 回调函数将不会被执行， 而是 `catch错误` 回调函数将被调用； 然而， `捕获错误` 回调不是唯一有捕获错误的回调， `然后` 方法有一个可选参数 `on错误` 我们也可以用来捕获异常。

```dart
Future.delayed(new Duration(seconds:2)，() /
    //return "hi world!";
    duture AssertionError("Error");
})。 hen(data) Windows
    print("success");
}, on: (e) Windows
    print(e);
});
```

##### 何时完成

有时我们会遇到这样的情况，即不管异步执行任务的成败如何，我们都需要做些什么。 例如在网络请求之前弹出加载对话框并在请求完成后关闭它。 第一个是关闭对话框，然后在 `` 或 `抓取` 第二个是在完成 `时使用` 回调 `未来`我们将修改以下示例

```dart
Future.delayed(new Duration(seconds:2),()}
   //return "hi world!";
   duture AssertionError("Error");
})。 hen(data)@un.org
   // 执行成功将在此处 
   print(data)；
})。 atchError((e))}
   //failed execution his   
   print(e);
})。 henComplete(()}
   //将前往这里，无论它成功还是失败
})；
```

##### 等待

有时候我们需要等待多项异步任务才能完成执行才能执行某些操作。 例如，我们有一个接口，需要先从两个网络接口单独获取数据。 并在成功获取之后， 我们需要对两个接口数据进行具体处理，然后才能在界面上显示它，我们应该如何做？ 答案是 `未来。 ait`, 它接受了一个 `未来的数组` 参数, 仅在所有 `未来之后成功执行数组中的` 将触发 `和` 成功的回调, 只要有 `未来的执行` 执行失败，错误回调将被触发。 下面我们模拟两个异步的数据采集任务，模拟 `未来. 过了`，并且当两个异步任务都成功执行时， 两项异步任务的结果一起设计并打印出来，包括以下代码。

```dart
Future.wait([
  // 2秒后返回结果  
  Future.delayed(new Duration(seconds: 2), () {
    return "hello";
  }),
  // 4秒后返回结果  
  Future.delayed(new Duration(seconds: 4), () {
    return "world";
  })
]).then((results){
  print(results[0]+results[1]);
}).catchError( (e){
  打印 (e);
});
```

执行上面的代码，你会在 4 秒后在控制台中看到"你好世界"。

#### Async/等待中

Dart 中 `async/await` 和 JavaScript 中 `async/await` 的作用和用法完全一样，所以如果你已经知道 JavaScript 中 `async/await` 的用法，可以跳过本节。

##### Callback Hell

如果代码中有很多异步逻辑， 如果有许多异步任务取决于其他异步任务的结果， `未来必然会出现回调状态。 hen` 回调。 例如，让我们说存在一个要求用户先登录的场景。 然后在成功登录后获取用户ID，然后通过用户ID请求用户的个人信息， 在获取用户个人信息后，我们需要将其存储在本地文件系统中以便于使用，并且有以下代码。

```dart
// 首次单独定义每个异步任务
未来<String> 登录(正在使用者名称，字符串pwd)
...
    //user 登录
};
未来<String> getUserInfo(String id)。
...
    //获取用户信息 
};
Future saveUserInfo(String userInfo)
...
    // 保存用户信息 
}; 
```

接下来，执行整个任务流程。

```dart
login("Alice", "******").then((id)}
 //获取用户信息，登录成功    
 getUserInfo(id)。 hen(userInfo)@un.org
    /获取用户信息并保存它 
    saveUserInfo(userInfo)。 hen()}
       //保存用户信息并执行其他操作
...
    });
  });
})
```

如果业务逻辑中存在许多异步依赖关系，回调将会在回调中出现回调。 过多嵌套会导致可读性和错误率降低，很难维持， 这个问题被富有想象力地称为 **回调头盔**。 回调问题以前在JavaScript中非常突出，并且是JavaScript中最受奖赏的点。 但随着ECMAScript6和ECMAScript7标准的发布，这个问题已得到很好的解决， 和解决回调头盔的两个魔法工具是在 ECMAScript6 中引入 `Promise` ， 和ECMAScript7介绍 `承诺` 和在 ECMAScript7 中引入 `异步/等待`。 在 Dart 中，这两个人几乎完全在 JavaScript 中被嵌入： `未来` 等于 `承诺`， 和 `异步/等待` 甚至不更改其名称。 接下来，让我们看看我们如何能够通过使用 `Future` 和 `异步等待` 来消除上述示例中的嵌套问题。

##### 未来消除回调头盔

```dart
login("Alice", "******").then((id)
   return getUserInfo(id)；
}).then((userInfo)format@@
    return saveUserInfo(userInfo)；
})。 hen((e))@un.org
   //execution the next action 
})。 atchError((e))@un.org
  // 错误处理  
  打印(e)；
})；
```

如前所述， *“ `Future` 的所有API的返回值仍然是一个 `Future` 对象，因此很容易链式调用”* ，如果此时返回一个 `Future` ，则执行 `Future` , 执行结束会触发 `then` 回调在执行后会触发，从而通过顺序往下避免层的嵌套。

#### 通过异步/等待取消回调头盔

在我们写同步代码而不使用回调时，是否有办法执行异步任务？ 答案是肯定的，这是使用 `async/reward`， 下面我们直接查看代码，然后解释如下。

```dart
tasync () async 当中，
   try@un.org
    String id = 等待login("alice", "********");
    String userInfo = 等待 getUserInfo(id)；
    等待saveUserInfo(userInfo)；
    /execution next action   
   } catche(
    // 错误处理   
    printe);   
   }  
}
```

- `async` 被用来表示函数异步, 和定义的函数返回一个 `未来` 对象，它可以用来使用当时的方法添加回调函数。
- `正在等待` 之后 `未来`, 表示等待异步任务完成，并且只有在异步完成后才会停止； `等候` 必须出现在 `异步` 函数。

正如你可以看到的那样，我们在同步代码中由 `异步/等待` 表示异步流.

> 事实上，在 JavaScript 和 Dart 中， `异步/等待` 只是编译器或解释器最终会转化成一连串通调用的语法糖(未来)。

### 流

`流` 也用于接收异步事件数据，不像 `未来`， 它可以收到多个异步操作的结果(成功或失败)。 也就是说，当执行异步任务时，结果数据或错误异常可以通过触发成功或失败事件多次传递。 `流` 常常用于异步任务场景，数据被多次读取。 例如下载网络内容、阅读和写入文件等。 这方面的一个例子。

```dart
Stream.fromFutures([
  // 1 秒后返回结果
  Future.delayed(new Duration(seconds: 1), () {
    return "hello 1";
  }),
  // 抛出异常
  Future. delay(new Duration(seconds: 2), () {
    throw AssertionError("Error");
  }),
  // 3 秒后返回结果
  Future.delayed(new Duration(seconds: 3), () {
    return "hello 3";
  })
]).listen((data){
   print(data);
}, onError: (e){
   print(e.message);
},onDone: () {

});
```

上面的代码将依次输出。

```dart
I/flutter (17666): hello 1
I/flotter (17666): 错误
I/flotter (17666): hello 3
```

### 继承(扩展)

dart中的继承规则

- 子类使用扩展关键字继承父类
- 子类继承属性和在父类可见的方法，但不是构造器。
- 子类可以覆盖父类的方法getter 和 setter
- 使用 @override 来覆盖超级类方法
- 带超级类的子类调用超级类方法
- 子类可以继承父类的非私有变量

### 混合物(含)

中文对混合物的意思是混合，它意味着混合在该类的其他函数中。 深色， 混合物可以用来实现类似于多重继承的功能，因为混合物的使用条件一直在随着黑暗版本的改变， 这里是Dart 2.x中使用混合物的条件。

- (1) 由于mixins 类只能继承对象，无法继承其它类
- (2) 混合类不能有构造函数
- (3) 一个类可以混合多个混合物类
- (4) 混合物绝不是继承，也不是一个接口，而是一个全新的特性。看看特定的代码。

### 接口实现(实现)

  流体没有接口， 但Flutter中的每个类都是一个隐含的接口，包含该类的所有成员变量和定义方法。 如果您有A类，且您想要B类拥有A类API， 但您不想要实现A， 然后你应该把A作为一个接口，把B类实现A类。 在 Flutter: 类是接口

- 当一个类用作接口时， 类中的方法是接口的方法，需要在子类中重新实现， 在子类实现中使用 @override
- 当一个类用作接口时，该类中的成员变量也需要在子类中重新实现。 在成员变量前添加 @override
