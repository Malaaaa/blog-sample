## Flutter code structure

## Basic framework

1. Import packages.

   ```dart
   import 'package:flutter/material.dart';
   ```

   This line of code acts as an import of the Material UI component library. [Material](https://material.io/guidelines) is a standard visual design language for mobile and web, and Flutter provides a rich set of Material style UI components by default. 2.

2. application portal.

   ```dart
   void main() => runApp(MyApp());
   ```

    - Similar to C/C++, Java, ``main`` function in Flutter application is the entry point of the application. The `main` function calls the `runApp` method, whose function is to start the Flutter application. `runApp` takes a `Widget` parameter, which in this case is a `MyApp` object, and `MyApp()` is the root component of the Flutter application.
    - The `main` function uses the (`=>`) notation, which is shorthand for a one-line function or method in Dart.

3. Application structure.

   ```dart
   class MyApp extends StatelessWidget {
     @override
     Widget build(BuildContext context) {
       return new MaterialApp(
         //application name  
         title: 'Flutter Demo', 
         theme: new ThemeData(
           //blue theme  
           primarySwatch: Colors.blue,
         ),
         //application home page route  
         home: new MyHomePage(title: 'Flutter Demo Home Page'),
       );
     }
   }
   ```

    - The `MyApp` class represents a Flutter application that inherits from the `StatelessWidget` class, which means that the application itself is also a widget.

    - In Flutter, most things are widgets (later "components" or "widgets"), including alignment, padding, layout, etc., which are all are provided in the form of widgets.

    - Flutter calls the `build` method of a component when building a page. The main job of a widget is to provide a build() method to describe how to build the UI interface (usually by combining and assembling other base widgets).

    - `MaterialApp` is the Flutter APP framework provided in the Material library, through which you can set the name, theme, language, home page and routing list of the application. `MaterialApp` is also a widget.

    - `home` is the home page of the Flutter app, it is also a widget.

## Home page component

   ```dart
   class MyHomePage extends StatefulWidget {
     MyHomePage({Key key, this.title}) : super(key: key);
     final String title;
     @override
     _MyHomePageState createState() => new _MyHomePageState();
   }
   
   class _MyHomePageState extends State<MyHomePage> {
   }
   ```

`MyHomePage` is the home page of the Flutter application, it inherits from the `StatefulWidget` class, which means it is a **stateful widget** (a stateful component). For now, let's just briefly consider that a stateful widget is different from a stateless widget in two ways.

1. Stateful widgets can have states that are mutable during the widget lifecycle, while Stateless widgets are immutable.

2. Stateful widget consists of at least two classes.
    - A `StatefulWidget` class.
    - A `State` class; the `StatefulWidget` class itself is immutable, but the state held in the `State` class may change during the widget's lifecycle.

   The `_MyHomePageState` class is the state class corresponding to the `MyHomePage` class. Here, the reader may have noticed: Unlike the `MyApp` class, there is no `build` method in the `MyHomePage` class, instead, the `build` method has been moved to the `_MyHomePageState` method.

### State class

Next, let's see what is contained in `_MyHomePageState`.

1. the state of the component. Since we only need to maintain a click counter, define a ``_counter`` state.

   ``dart
   int _counter = 0; // used to record the total number of button clicks
   ```

   `_counter` is the state that holds the number of button clicks with a "+" sign in the bottom right corner of the screen.

2. Set the self-increment function for the status.

   ```dart
   void _incrementCounter() {
     setState(() {
        _counter++;
     });
   }
   ```

   This function is called when the button is clicked. The function works by first self-incrementing `_counter` and then calling the `setState` method. The purpose of the `setState` method is to notify the Flutter framework that a state has changed. When the Flutter framework receives the notification, it will execute the `build` method to rebuild the interface based on the new state. so you can rebuild anything that needs to be updated without having to modify individual widgets.

3. Build UI interface

   The logic for building the UI interface is in the `build` method. When `MyHomePage` is created for the first time, the `_MyHomePageState` class will be created, and when the initialization is complete, the Flutter framework will call the `build` method of the widget to build the widget tree, and finally render the widget tree to the device screen . So, let's see what is done in the `build` method of `_MyHomePageState`.

   ```dart
     Widget build(BuildContext context) {
       return new Scaffold(
         appBar: new AppBar(
           title: new Text(widget.title),
         ),
         body: new Center(
           child: new Column(
             mainAxisAlignment: MainAxisAlignment.center,
             children: <Widget>[
               new Text(
                 'You have pushed the button this many times:',
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

    - `Scaffold` is a page scaffold provided in the Material library that provides a default navigation bar, a header, and a `body` property containing the main screen widget tree (later referred to as the "component tree" or "widget tree"). Component trees can be very complex. In the examples later in this book, routes are created via `Scaffold` by default.
    - The component tree of `body` contains a `Center` component, and `Center` can align its child component trees to the center of the screen. In this case, the `Center` subcomponent is a `Column` component, and the role of `Column` is to align all its subcomponents vertically along the screen; in this case, the `Column` subcomponent is two `Text`s, and the first `Text` displays the fixed text "You have pushed the button this many times:", and the second `Text` displays the value of the `_counter` state.
    - The `floatingActionButton` is the hover button with `+` in the bottom right corner of the page, its `onPressed` property accepts a callback function that represents its handler when it is clicked, in this case the `_incrementCounter` method is directly used as its handler function.

Now, let's string together the entire counter execution flow: when the `floatingActionButton` button in the bottom-right corner is clicked, the `_incrementCounter` method is called. In the `_incrementCounter` method, first the `_counter` counter (state) will be self-incremented, then `setState` will notify the Flutter framework that the state has changed, then the Flutter framework will call the `build` method to rebuild the UI with the new state and finally display it on the device screen.

#### Why put the build method in State and not in StatefulWidget?

Now, let's answer the question raised earlier, why is the `build()` method placed in State (instead of `StatefulWidget`) ? This is mainly to increase the flexibility of development. If the `build()` method is placed in the `StatefulWidget` there are two problems.

- Inconvenient state access

  Imagine if our `StatefulWidget` has many states, and each time the state changes, we have to call the `build` method, since the state is stored in State, if the `build` method is in `StatefulWidget`, then the `build` method and the state are in two separate classes, so it will be very inconvenient to read the state when building! would be very inconvenient! Imagine if you actually put the `build` method in a StatefulWidget, since the process of building the UI depends on the State, the `build` method would have to have a `State` parameter, something like the following.

  ```dart
    Widget build(BuildContext context, State state){
        //state.counter
        ...
    }
  ```

  In this case, you can only declare all the state of the State as public, so that you can access the state outside the State class! However, by making the state public, the state will no longer be private, which means that modifications to the state will become uncontrollable. But if you put the `build()` method in the State, the build process not only has direct access to the state, but also does not need to expose the private state, which is very convenient.

- Inheriting `StatefulWidget` is inconvenient

  For example, Flutter has a base class `AnimatedWidget` for animated widgets, which inherits from the `StatefulWidget` class. An abstract method `build(BuildContext context)` is introduced in `AnimatedWidget`, and all animated widgets that inherit from `AnimatedWidget` have to implement this `build` method. Now imagine that if the `StatefulWidget` class already has a `build` method, as described above, the `build` method needs to receive a state object, which means that the `AnimatedWidget` has to pass its own State object (noted as _ animatedWidgetState) to its child class, because the child class needs to call the parent class's `build` method in its `build` method, and the code might look like this.

  ```dart
  class MyAnimationWidget extends AnimatedWidget{
      @override
      Widget build(BuildContext context, State state){
        //since the subclass is going to use the AnimatedWidget's state object _animatedWidgetState.
        //so the AnimatedWidget must somehow expose its state object _animatedWidgetState
        // Expose it to its subclasses   
        super.build(context, _animatedWidgetState)
      }
  }
  ```

  This obviously doesn't make sense, because

    1. the state object of `AnimatedWidget` is an internal implementation detail of `AnimatedWidget` and should not be exposed to the outside.
    2. if the parent class state is to be exposed to the child class, then there must be a passing mechanism, and it is pointless to do this set of passing mechanism, because the passing of state between parent and child classes is irrelevant to the logic of the child class itself.

To sum up, it can be found that for `StatefulWidget`, putting the `build` method in State can bring a lot of flexibility to the development.
