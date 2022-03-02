## 流体代码结构

## 基本框架

1. 导入包。

   ```dart
   导入 'package:flutter/material.dart';
   ```

   这行代码可以导入材质界面组件库。 [Material](https://material.io/guidelines) 是移动和网络的标准视觉设计语言， Flutter默认提供一组丰富的材料样式界面组件。 2.

2. 应用程序门户。

   ```dart
   void main() => runApp(MyApp());
   ```

    - 类似于C/C++, Java, `Flutter 应用程序中的主` 函数是应用程序的切入点。 `主` 函数调用 `运行应用程序` 方法，其函数是启动Flutter 应用程序。 `运行App` 需要一个 `小部件` 参数，在这种情况下是一个 `MyApp` 对象， 和 `MyApp()` 是 Flutter 应用程序的根组件。
    - `个主要的` 函数使用 (`=>`) 符号，它是一个单行函数或在 Dart 中的方法的短语。

3. 应用程序结构。

   ```dart
   class MyApp extensive StatelessWidget }
     @overript
     Widget build(BuildContext context) }
       return new MaterialApp(
         //application name  
         title: 'Flutter Demo', 
         主题: 新主题(
           /蓝色主题  
           主主题: 颜色 lue,
         ),
         //apply home page route  
         home: new MyHomePage(title: 'Flutter Demo Home Page'),
       ;
     }
}
   ```

    - `MyApp` 类代表了继承 `无国籍小部件` 类的流体应用程序， 这意味着应用程序本身也是一个小部件。

    - 在污染物中，大多数东西都是小部件(后来是“组件”或“小部件”)，包括对齐、填充、布局等，这些都是以小部件的形式提供的。

    - 构建页面时，Flutter调用组件的 `构建` 种方法。 小部件的主要任务是提供一个 build() 方法来描述如何构建界面(通常通过合并和组装其他基本部件)。

    - `MaterialApp` 是材料库中提供的 Flutter APP 框架。 您可以通过它来设置应用程序的名称、主题、语言、主页和路由列表。 `MaterialApp` 也是一个小部件。

    - `首页` 是Flutter 应用程序的主页，它也是一个小部件。

## 主页组件

   ```dart
   class MyHomePage extends StatefulWidget }
     MyHomePage({Key key, this.title}) : super(key: key);
     最终字符串标题；
     @override
     _MyHomePageState createState() => new _MyHomePageState();
   }

   class _MyHomePageState扩展状态<MyHomePage> {
   }
   ```

`MyHomePage` 是Flutter 应用程序的主页，它继承了 `Statulfulget` 类， 这意味着它是一个 **状态小部件** (状态组件)。 现在，让我们简单地考虑一下一个有名无实的小部件在两个方面不同于一个无国籍的小部件。

1. 状态小部件可以有在小部件生命周期内可变的状态，而无状态小部件则不可变的。

2. 状态小部件由至少两个类组成。
    - `StatefulWidget` 类。
    - `状态` 类； `StatelfulWidget` 类本身是不可变的， 但是在 `状态` 类中的状态可能会在小部件生命周期中改变。

   `_MyHomePageState` 类是对应 `MyHomePage` 类的状态类。 这里的读者可能已经收到通知：与 `MyApp` 类不同， 没有 `构建` 方法在 `MyHomePage` 类 相反， `build` 方法已被移动到 `_MyHomePageState` 方法中。

### 国家类

接下来，让我们看看 `_MyHomePageState` 中包含的内容。

1. 组件的状态。 既然我们只需要保持点击计数器，定义 `_计数器` 状态。

   ``dart int _count = 0; // 用于记录按钮点击总数
   ```

   `_计数器`是指在屏幕右下角持有带“+”符号按钮点击次数的状态。

2. 设置状态自增函数。

   ```dart
   void _incrementCounter() {
     setState(() {
        _counter++;
     });
}
   ```

   按下按钮时调用此函数。 此函数首先通过自我递增 `_count` 然后调用 `设置状态` 方法。 `settate` 方法的目的是通知流体框架一个状态已经改变。 当Flutter框架收到通知时，它将执行 `build` 方法来重建基于新状态的接口。 这样你就可以重建任何需要更新的东西，而不必修改个别的部件。

3. 构建界面界面

   构建界面的逻辑在 `构建` 方法中。 当 `MyHomePage` 首次创建时 `_MyHomePageState` 类将被创建，初始化完成时， 流体框架将调用 `构建小部件的` 方法来构建小部件树， 最后将小部件树渲染到设备屏幕。 因此，让我们来看看在 `构建` 方法 `_MyHomePageState` 中做了什么。

   ```dart
     Widget build(BuildContext context) {
       return new Scaffold(
         appBar: new AppBar(
           title: new Text(widget.title),
         ),
         body: new Center(
           child: new Column(
             mainAxisAlignment: MainAxisAlignment.center ,
             孩子: <Widget>[
               new Text(
                 '你已经多次按下按钮:',
               ),
               new Text(
                 '$_counter',
                 style: Theme.of(context).textTheme.headline4,
               ),
             ],
           ),
         ),
         floatingActionButton: new FloatingActionButton(
           onPressed: _incrementCounter,
           tooltip: 'Increment',
           child: new Icon(Icons.add),
         ),
       );
}
   ```

    - `Scaffold` 是材料库中提供的一个页面scaffold ，它提供了一个默认的导航栏，一个标题， 和 `正文` 包含主屏幕小部件树的属性 (后来称为“组件树”或“小部件树”)。 组件树可能非常复杂。 在这本书稍后的示例中，默认情况下通过 `Scaffold` 创建路线。
    - `正文的组件树` 包含一个 `中心` 组件。 和 `中心` 可以将其子组件树与屏幕中心对齐。 在这种情况下， `Center` 子组件是一个 `列` 组件. 和 `列的角色` 是沿屏幕垂直对齐其所有子组件； 在这种情况下， `列` 子组件是两个 `文本`s, 和第一个 `文本` 显示固定文本“您已经多次按下按钮：”， 和第二个 `文本` 显示 `_计数器` 状态。
    - `浮动动动作按钮` 是页面右下角的 `+` 悬停按钮， its `onPressed` property 接受一个代表其处理程序的回调函数, 在这种情况下， `_增量计数器` 方法被直接用作处理函数。

现在，让我们把整个计数器执行流程合并在一起：点击右下角的 `浮动动动作按钮` 按钮， `_增量计数器` 方法已调用。 在 `_增量计数器` 方法中，首先是 `_计数器` 计数器(state) 将是自增量的， 然后 `setState` 会通知流体框架状态已经改变。 然后Flutter框架将调用 `构建` 方法用新状态重建界面并最终在设备屏幕上显示。

#### 为什么要将构建方法放在国家而不是StatefulWidget？

现在，让我们回答早些时候提出的问题，为什么 `build()` 方法被放置在状态 (而不是 `StatefulWidget`)？ 这主要是为了增加发展的灵活性。 如果 `build()` 方法被放置在 `StatefulWidget` 有两个问题。

- 不方便的状态访问

  想象一下，如果我们的 `StatefulWidget` 有很多状态，每次状态变化，我们都要调用 `build` 方法，因为状态存储在 State 中，如果 `build` 方法在 `StatefulWidget`中，那么 `build` 方法和状态在两个独立的类中，所以在构建的时候读取状态会很不方便！ 可能很不方便！ 假如您确实将 `构建` 方法放入StatefulWidget， 因为建立UI的过程取决于国家， `构建` 方法必须有一个 `状态` 参数，类似于下文。

  ```dart
    小部件构建(BuildContext context, State state)}
        //state.count
...
    }
  ```

  在这种情况下，你只能宣布国家的所有状态为公开状态。 这样你就可以访问国家课外的状态！ 然而，如果国家公开，国家将不再是私人的，这意味着国家的修改将无法控制。 但如果你将 `build()` 方法放入国家，构建过程不仅可以直接访问州。 但也不需要揭露非常方便的私人状态。

- Inheriting `StatefulFidget` 不方便。

  例如，Flutter 对动画小部件有一个基本类 `动画小部件` ，继承自 `StatulfulfWidget` 小类。 摘要方法 `build(BuildContext 上下文)` 被介绍在 `动画小部件`中， 和所有继承自 `动画小部件的动画小部件` 必须实现此 `构建` 方法。 现在想象如果 `Statulfulfulget` 类已经有一个 `building` 方法， 如上所述， `build` 方法需要接收一个状态对象， 这意味着 `动画小部件` 必须将自己的状态对象 (注意为 _ 动画小部件) 转到子类， 因为子类需要调用父类的 `编译` 方法在其 `编译` 方法， 和代码可能看起来是这样的。

  ```dart
  class MyAnimationWidget exts AnimatedWidget@un.org
      @overript
      Widget build(BuildContext context, State state)format@@
        /，因为子类将使用 AnimatedWidgett 的状态对象 _animatedWidgetState。
        //so 动画小部件必须以某种方式暴露其状态对象 _animatedWidgetState
        // 将其暴露于其子类   
        super.build(context, _animatedWidgetState)
      }
}
  ```

  这显然是没有意义的，因为：

    1. `动画小部件` 的状态对象是 `动画小部件` 的内部实现细节，不应向外曝光。
    2. 如果父类状态将暴露于子类， 那就必须有一种通过机制，这样做毫无意义， 因为父母和子女类别之间的状态与子女类别本身的逻辑无关。

总之，可以找到 `StatefulWidget`， 将 `建立在国家` 方法可以给发展带来很大的灵活性。
