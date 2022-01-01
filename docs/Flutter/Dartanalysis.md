# Debugging Flutter applications

### Dart Analyzers

Before running your application, run `flutter analyze` to test your code. This tool is a static code checking tool that is a wrapper around the `dartanalyzer` tool and is mainly used to analyze code and help developers find possible errors. For example, the Dart analyzer makes heavy use of type annotations in the code to help track down problems and avoid `var`, untyped parameters, untyped list text, etc.

If you are using the Flutter plugin for IntelliJ, the parser is automatically enabled when you open the IDE. If the reader is using another IDE, it is highly recommended that the reader enable the Dart parser because most of the time, the Dart parser can find most of the problems before the code runs.

### Dart Observatory (statement-level single-step debugger and parser)

If we start the application using `flutter run`, then when it runs, we can open the web page of Observatory tool, for example Observatory listens to <http://127.0.0.1:8100/> by default and can open the link directly in the browser. Connect to your application directly using the statement-level single-step debugger. If you are using IntelliJ, you can also use its built-in debugger to debug your application.

Observatory also supports analysis, heap checking, and more. For more information about Observatory refer to the [Observatory documentation](https://dart-lang.github.io/observatory/).

If you use Observatory for analysis, be sure to run the `flutter run` command with the `-profile` option to run the application. Otherwise, the main issue that will appear in the profile will be debugging assertions to verify the various invariants of the framework (see "Debugging Mode Assertions" below).

### `debugger()` declaration

This `debugger()` statement can be used to insert programmatic breakpoints when using Dart Observatory (or another Dart debugger, such as the debugger in the IntelliJ IDE). To use this, you must add `import 'dart:developer';` to the top of the relevant file.

The `debugger()` statement takes an optional `when` reference.

parameter, you can specify that the parameter will only be interrupted when a specific condition is true, as follows.

```dart
void someFunction(double offset) {
  debugger(when: offset > 30.0);
  // ...
}
```

### `print`、`debugPrint`、`flutter logs`

The Dart `print()` function will output to the system console and you can use `flutter logs` to view it (basically a wrapper `adb logcat`).

If you output too much at once, then Android will sometimes discard some log lines. To avoid this, you can use [`debugPrint()`](https://docs.flutter.io/flutter/foundation/debugPrint.html) from Flutter's `foundation` library. This is a wrapper print that limits the output to a level that avoids being dropped by the Android kernel.

Many classes in the Flutter framework have `toString` implementations. By convention, this output usually includes the `runtimeType` single-line output of the object, usually in the form ClassName(more information about this instance...). Some classes used in the tree also have `toStringDeep`, which returns a multi-line description of the entire subtree from that point. Already some classes with detailed information `toString` will implement a `toStringShort` which returns only the type of the object or other very short (one or two word) description.

### Debug Mode Assertions

During Flutter application debugging, the Dart `assert` statement is enabled and used by the Flutter framework to perform a number of runtime checks to verify that some immutable rule is not violated.

When an immutable rule is violated, it is reported to the console with some contextual information to help track down the root cause of the problem.

To turn off debug mode and use release mode, run your application with `flutter run --release`. This also turns off the Observatory debugger. An intermediate mode that turns off all debugging aids except Observatory is called `-profile mode`, just replace `-release` with `-profile`.

### Debugging application layers

Each layer of the Flutter framework provides the ability to dump (dump) its current state or events to the console (using `-debugPrint`).

#### Widget tree

To dump the state of the Widgets tree, call [`debugDumpApp()`](https://docs.flutter.io/flutter/widgets/debugDumpApp.html). You can call this method (after calling `runApp()`) at any time when the application is not in the build phase (i.e., not called within the `build()` method), as long as the application has been built at least once (i.e., at any time after calling `build()`).

For example, this application:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    new MaterialApp(
      home: new AppHome(),
    ),
  );
}

class AppHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Material(
      child: new Center(
        child: new FlatButton(
          onPressed: () {
            debugDumpApp();
          },
          child: new Text('Dump App'),
        ),
      ),
    );
  }
}
```

...will output something like this (the exact details will vary depending on the version of the framework, the size of the device, etc.).

```shell
I/flutter ( 6559): WidgetsFlutterBinding - CHECKED MODE
I/flutter ( 6559): RenderObjectToWidgetAdapter<RenderBox>([GlobalObjectKey RenderView(497039273)]; renderObject: RenderView)
I/flutter ( 6559): └MaterialApp(state: _MaterialAppState(1009803148))
I/flutter ( 6559):  └ScrollConfiguration()
I/flutter ( 6559):   └AnimatedTheme(duration: 200ms; state: _AnimatedThemeState(543295893; ticker inactive; ThemeDataTween(ThemeData(Brightness.light Color(0xff2196f3) etc...) → null)))
I/flutter ( 6559):    └Theme(ThemeData(Brightness.light Color(0xff2196f3) etc...))
I/flutter ( 6559):     └WidgetsApp([GlobalObjectKey _MaterialAppState(1009803148)]; state: _WidgetsAppState(552902158))
I/flutter ( 6559):      └CheckedModeBanner()
I/flutter ( 6559):       └Banner()
I/flutter ( 6559):        └CustomPaint(renderObject: RenderCustomPaint)
I/flutter ( 6559):         └DefaultTextStyle(inherit: true; color: Color(0xd0ff0000); family: "monospace"; size: 48.0; weight: 900; decoration: double Color(0xffffff00) TextDecoration.underline)
I/flutter ( 6559):          └MediaQuery(MediaQueryData(size: Size(411.4, 683.4), devicePixelRatio: 2.625, textScaleFactor: 1.0, padding: EdgeInsets(0.0, 24.0, 0.0, 0.0)))
I/flutter ( 6559):           └LocaleQuery(null)
I/flutter ( 6559):            └Title(color: Color(0xff2196f3))
... 
```

This is a "flat" tree showing all the widgets projected by the various build functions (if you call `toStringDeepwidget` at the root of the widget tree, this is the tree you get). You will see many widgets that do not appear in your application source code because they were inserted by the `build()` function of the widget in the framework. For example, [`InkFeature`](https://docs.flutter.io/flutter/material/InkFeature-class.html) is an implementation detail of the Material widget .

When debugDumpApp() is called when the button changes from being pressed to being released, the FlatButton object also calls `setState()` and marks itself as `dirty`. That's why if you look at the dump, you will see specific objects marked as "dirty". You can also see which gesture listeners have been registered; in this case, a single GestureDetector is listed and listens to the "tap" gesture ("tap" is `TapGestureDetector`s `toStringShort` function outputs)

If you write your own widget, you can add information by overriding [`debugFillProperties()`](https://docs.flutter.io/flutter/widgets/Widget/debugFillProperties.html). Take the [DiagnosticsProperty](https://docs.flutter.io/flutter/foundation/DiagnosticsProperty-class.html) object as a method parameter and call the parent class method. This function is used by this `toString` method to populate the widget description information.

#### Rendering tree

If you try to debug layout issues, the widget tree may not be detailed enough. In this case, you can dump the render tree by calling `debugDumpRenderTree()`. As with `debugDumpApp()`, you can call this function at any time other than during the layout or drawing phase. As a general rule, calling it from the [frame callback](https://docs.flutter.io/flutter/scheduler/SchedulerBinding/addPersistentFrameCallback.html) or from an event handler is the best solution.

To call `debugDumpRenderTree()`, you need to add `import'package:flutter/rendering.dart';` to your source file.

The output of the small example above is shown below.

```shell
I/flutter ( 6559): RenderView
I/flutter ( 6559):  │ debug mode enabled - android
I/flutter ( 6559):  │ window size: Size(1080.0, 1794.0) (in physical pixels)
I/flutter ( 6559):  │ device pixel ratio: 2.625 (physical pixels per logical pixel)
I/flutter ( 6559):  │ configuration: Size(411.4, 683.4) at 2.625x (in logical pixels)
I/flutter ( 6559):  │
I/flutter ( 6559):  └─child: RenderCustomPaint
I/flutter ( 6559):    │ creator: CustomPaint ← Banner ← CheckedModeBanner ←
I/flutter ( 6559):    │   WidgetsApp-[GlobalObjectKey _MaterialAppState(1009803148)] ←
I/flutter ( 6559):    │   Theme ← AnimatedTheme ← ScrollConfiguration ← MaterialApp ←
I/flutter ( 6559):    │   [root]
I/flutter ( 6559):    │ parentData: <none>
I/flutter ( 6559):    │ constraints: BoxConstraints(w=411.4, h=683.4)
I/flutter ( 6559):    │ size: Size(411.4, 683.4)
... 
```

This is the output of the `toStringDeep` function of the root `RenderObject` object.

When debugging layout issues, the key things to look at are the `size` and `constraints` fields. Constraints are passed down the tree and sizes are passed up.

If you write your own rendering objects, you can add the information to the dump by overriding [`debugFillProperties()`](https://docs.flutter.io/flutter/rendering/Layer/debugFillProperties.html). Take the [DiagnosticsProperty](https://docs.flutter.io/flutter/foundation/DiagnosticsProperty-class.html) object as a parameter to the method and call the parent method.

#### Layer tree

The reader can understand that the rendering tree can be layered, and the final drawing requires composing different layers, while Layer is the layer to be composited when drawing. If you try to debug the composing problem, you can use [`debugDumpLayerTree()`](<https://docs.flutter.io/flutter/> rendering/debugDumpLayerTree.html). For the above example, it would output.

```
I/flutter : TransformLayer
I/flutter :  │ creator: [root]
I/flutter :  │ offset: Offset(0.0, 0.0)
I/flutter :  │ transform:
I/flutter :  │   [0] 3.5,0.0,0.0,0.0
I/flutter :  │   [1] 0.0,3.5,0.0,0.0
I/flutter :  │   [2] 0.0,0.0,1.0,0.0
I/flutter :  │   [3] 0.0,0.0,0.0,1.0
I/flutter :  │
I/flutter :  ├─child 1: OffsetLayer
I/flutter :  │ │ creator: RepaintBoundary ← _FocusScope ← Semantics ← Focus-[GlobalObjectKey MaterialPageRoute(560156430)] ← _ModalScope-[GlobalKey 328026813] ← _OverlayEntry-[GlobalKey 388965355] ← Stack ← Overlay-[GlobalKey 625702218] ← Navigator-[GlobalObjectKey _MaterialAppState(859106034)] ← Title ← ⋯
I/flutter :  │ │ offset: Offset(0.0, 0.0)
I/flutter :  │ │
I/flutter :  │ └─child 1: PictureLayer
I/flutter :  │
I/flutter :  └─child 2: PictureLayer
```

This is the output of the `toStringDeep` of the root `Layer`.

The root transformation is a transformation that applies a device pixel ratio; in this case, each logical pixel represents 3.5 device pixels.

The `RepaintBoundary` widget creates a `RenderRepaintBoundary` in the layer of the render tree. This is used to reduce the amount of repainting required.

### Semantics

You can also call [`debugDumpSemanticsTree()`](https://docs.flutter.io/flutter/rendering/debugDumpSemanticsTree.html) to get a dump of the semantics tree (the tree presented to the system accessibility API). To use this function, you must first enable the helper functions, such as enabling the system helper or `SemanticsDebugger` (discussed below).

For the above example, it will output :

```
I/flutter : SemanticsNode(0; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4))
I/flutter :  ├SemanticsNode(1; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4))
I/flutter :  │ └SemanticsNode(2; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4); canBeTapped)
I/flutter :  └SemanticsNode(3; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4))
I/flutter :    └SemanticsNode(4; Rect.fromLTRB(0.0, 0.0, 82.0, 36.0); canBeTapped; "Dump App")
```

### Scheduling

To find out where the start/end events occur relative to the frame, you can toggle the [`debugPrintBeginFrameBanner`](https://docs.flutter.io/flutter/scheduler/debugPrintBeginFrameBanner.html) and [`debugPrintEndFrameBanner`](https://docs.flutter.io/flutter/scheduler/debugPrintEndFrameBanner.html) boolean values to print the start and end of the frame to the console.

Example:

```
I/flutter : ▄▄▄▄▄▄▄▄ Frame 12         30s 437.086ms ▄▄▄▄▄▄▄▄
I/flutter : Debug print: Am I performing this work more than once per frame?
I/flutter : Debug print: Am I performing this work more than once per frame?
I/flutter : ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
```

[`debugPrintScheduleFrameStacks`](https://docs.flutter.io/flutter/scheduler/debugPrintScheduleFrameStacks.html)It can also be used to print the call stack that caused the current frame to be dispatched.

### Visual debugging

You can also debug layout issues visually by setting `debugPaintSizeEnabled` to `true`. This is a boolean value from the `rendering` library. It can be enabled at any time and affects drawing when it is true. The easiest way to set it is to set it at the top of `void main()`.

When it is enabled, all boxes get a bright dark cyan border, padding (from widgets like Padding) is shown in light blue, child widgets have a dark blue box around them, and alignment (from widgets like Center and Align) is shown as a yellow arrow. Blank (e.g. Container without any child nodes) is shown in gray.

[`debugPaintBaselinesEnabled`](https://docs.flutter.io/flutter/rendering/debugPaintBaselinesEnabled.html) does something similar, but for objects with baselines, the text baseline is shown in green and ideographic baselines are shown in orange.

The [``debugPaintPointersEnabled``](https://docs.flutter.io/flutter/rendering/debugPaintPointersEnabled.html) flag turns on a special mode where any object being clicked on is highlighted in dark cyan highlighting. This can help you determine if an object is hit-tested in some incorrect way (Flutter detects if the clicked location has a widget that responds to the user's actions), for example, if it is actually out of range of its parent item, it will not be considered for the hit test in the first place.

If you are trying to debug a composite layer, for example to determine if and where to add a `RepaintBoundary` widget, you can use [`debugPaintLayerBordersEnabled`](https://docs.flutter.io/flutter/rendering) /debugPaintLayerBordersEnabled.html) flag, which marks the borders of each layer with an orange or outlined line, or use the [`debugRepaintRainbowEnabled`](https://docs.flutter.io/flutter/ rendering/debugRepaintRainbowEnabled.html) flag whenever they redraw, which causes the layer to be covered by a set of rotating colors.

All these flags only work in debug mode. Normally, anything in the Flutter framework that starts with ``debug... `" will only work in debug mode.

### Debugging animations

The easiest way to debug animations is to slow them down. To do this, set the [`timeDilation`](https://docs.flutter.io/flutter/scheduler/timeDilation.html) variable (in the scheduler library) to a number greater than 1.0, e.g. 50.0. It is best to set this only once when the application starts once. If you change it on the fly, and especially if you change its value to a smaller value while the animation is running, you may get regressions on observation, which may result in assertion hits, and this usually interferes with our development efforts.

### Debugging performance issues

To understand what causes your application to re-layout or re-draw, you can set [`debugPrintMarkNeedsLayoutStacks`](https://docs.flutter.io/flutter/rendering/) separately debugPrintMarkNeedsLayoutStacks.html) and [`debugPrintMarkNeedsPaintStacks`](https://docs.flutter.io/flutter/rendering/ debugPrintMarkNeedsPaintStacks.html) flags. These log the stack trace to the console whenever the render box is asked to re-layout and repaint. If this method works for you, you can use the `debugPrintStack()` method in the `services` library to print the stack trace on demand.

### Statistical application startup time

To gather detailed information about how long it takes for a Flutter application to start, you can use the `trace-startup` and `profile` options when running `flutter run`.

```shell
flutter run --trace-startup --profile
```

The trace output is saved as ``start_up_info.json`` in the Flutter project directory under the build directory. The output lists the time spent from application startup to these trace events (captured in microseconds).

- When entering the Flutter engine.
- When displaying the first frame of the application.
- When initializing the Flutter framework.
- When completing the initialization of the Flutter framework.

As :

```json
{
  "engineEnterTimestampMicros": 96025565262,
  "timeToFirstFrameMicros": 2171978,
  "timeToFrameworkInitMicros": 514585,
  "timeAfterFrameworkInitMicros": 1657393
}
```

### Tracking Dart code performance

To perform a custom performance trace and measure the wall/CPU time of any code segment of Dart (similar to using [systrace](https://developer.android.com/studio/profile/systrace.html) on Android) Use ``dart:developer``s [Timeline](https://api.dartlang.org/stable/dart-developer/Timeline-class.html) tool to include the block of code you want to test, e.g.

```dart
Timeline.startSync('interesting function');
// iWonderHowLongThisTakes();
Timeline.finishSync();
```

Then open your application's Observatory timeline page, select the 'Dart' checkbox in 'Recorded Streams', and perform the function you want to measure.

Refreshing the page will display the application's timeline records in chronological order in Chrome's [Tracking Tools](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool).

Please make sure to run `flutter run` with the `-profile` flag to ensure that the runtime performance characteristics are minimally different from your final product.