# 调试流器应用

### 暗色分析器

在运行您的应用程序之前，运行 `流量分析` 来测试您的代码。 此工具是一个静态代码检查工具，它是一个围绕 `dartanalyzer` 工具的包装器，主要用于分析代码和帮助开发者发现可能的错误。 例如， Dart 分析器大量使用代码中的类型注释来帮助跟踪问题并避免 `var`， 未输入参数、未输入列表文本等。

如果您在 IntelliJ 中使用 Flutter 插件，当您打开 IDE 时，解析器将自动启用。 如果读者正在使用另一个IDE，强烈建议读者启用Dart 解析器，因为大部分时间， Dart 解析器可以在代码运行前找到大多数问题。

### Dart Observatory (statementlevel level level debugger and parser)

如果我们使用 `flotter 运行`, 则运行时, 我们可以打开观测站工具的网页，如观测站监听到 [http://127。 0.0.1：8100/](http://127.0.0.1:8100/) 默认情况下，可以在浏览器中直接打开链接。 直接使用状态级单步调试器连接到您的应用程序。 如果您正在使用 IntelliJ，您也可以使用它内置的调试器调试您的应用程序。

天文台还支持分析、堆积检查等等。 欲了解更多关于天文台的信息，请参阅 [天文台文档](https://dart-lang.github.io/observatory/)。

如果您使用天文台进行分析， 请务必运行 `flotter 使用 <code>-profile` 选项运行应用程序的</code> 命令。 否则， 概况中出现的主要问题将是调试断语，以核实框架的各种不变因素(见下文“调试模式声明”)。

### `debugger()` 声明

此 `debugger()` 语句可用来在使用 Dart 观测站时插入程序断点 (或另一个 Dart 调试器)。 例如IntelliJ IDE中的调试器。 要使用此项，您必须添加 `导入'dart:developer';` 到相关文件的顶部。

`debugger()` 语句在</code> 引用时需要一个可选的 `</p>

<p spaces-before="0">参数，您可以指定只有当特定条件为 true时参数才会被中断，如下所示。</p>

<pre><code class="dart">虚空函数(双向偏移) 然后
  debugger(时间：偏移 > 30.0);
  // ...
}
`</pre>

### `打印``调试打印`计时`流体日志`

Dart `print()` 函数将输出到系统控制台，您可以使用 `flotter 日志` 查看它(基本上是一个包装器 `adb logcat`)。

如果您一次输出太多，那么安卓系统有时会丢弃一些日志行。 为了避免这种情况，您可以使用 [`debugPrint()`](https://docs.flutter.io/flutter/foundation/debugPrint.html) 来自Flutter的 `基础` 库。 这是一个包装打印，将输出限制在一个能避免被安卓内核丢弃的水平。

Flutter 框架中的许多类有 `toString` 实现。 按惯例，这个输出通常包括对象的 `运行时间类型` 单行输出, 通常是在 ClassName(有关此实例的更多信息...)。 在树中使用的一些类也有 `toStringDeep`，从那个点返回整个子树的多行描述。 已经有些类具有详细信息 `toString` 将实现一个 `toStringShort` 只返回对象的类型或其他非常短的描述(一个或两个单词)。

### 调试模式声明

在 Flutter 应用程序调试过程中， Dart `断言说` 语句已被Flutter框架启用和使用来执行一些运行时间检查，以核实某些不可变规则没有被违反。

1. 违反一项不可改变的规则， 它被报告到控制台，带有一些上下文信息，以帮助追踪问题的根源。

要关闭调试模式并使用发布模式，请使用 `flotter 运行 --release` 运行您的应用程序。 这也会关闭观测台调试器。 关闭除天文台以外的所有调试助手的中间模式称为 `-profile 模式`， 只用 `-profile` 替换 `-release`

### 调试应用程序图层

Flutter框架的每一层都能够将当前状态或事件转储到控制台(使用 `-debugprint`)。

#### 小部件树

要转储小部件树的状态，请调用 [`debugDump()`](https://docs.flutter.io/flutter/widgets/debugDumpApp.html)。 您可以在应用程序未处于构建阶段的任何时候调用此方法(即在调用 `runApp()`之后) 只要应用程序至少构建了一次(i)，就不能调用 `build()` 方法中。 ., 在调用 `build()` 之后的任何时间.

例如，此应用程序：

```dart
导入“包：颤振/material.dart”；

void main() {
  runApp(
    new MaterialApp(
      home: new AppHome(),
    ),
  );
}

类 AppHome 扩展 StatelessWidget {
  @override
  小部件构建（BuildContext 上下文）{
    返回新材料（
      子：新中心（
        子：新 FlatButton（
          onPressed：（）{
            debugDumpApp();
          }，
          孩子：新文本（'转储应用'），
        ），
      ），
    ）；
  }
}
```

...将会输出类似的内容(确切的细节将根据框架的版本、设备的大小等而有所不同。

```shell
I/flutter ( 6559)：小部件-CHECKED MODE
I/flutter ( 6559)：RenderObjectToWidgetAdapter<RenderBox>([GlobalObjectKey RenderView(497039273)]； renderObject: RenderView
I/flutter ( 6559): Recommended MaterialApp(state: _MaterialAppState(1009803148))
I/flutter ( 6559): recordScrollConfiguration()
I/flutter ( 6559): recentAnimatedTheme(dur: 200ms; 状态: _AnimatedThemeState(543295893; ticker 禁用; ThemeDataTween(ThemeData(Brightnes) ight Color(0xff2196f3) 等...) -> null)
I/flutter ( 6559): ringTheme(ThemeData(Brightness.light Color(0xff2196f3) 等...))
I/flutter (6559)：小部件App([GlobalObjectKey _MaterialAppState(1009803148)]； state: _WidgetsAppState(552902158))
I/flutter ( 6559): CheckedModeBanner()
I/flutter ( 6559): RecommendeBanner()
I/flutter ( 6559): RecordCustomPaint(renderObject: RenderCustomCustomPaint)
I/flutter ( 6559): RecentDefaultTextStyle(继承: true; 颜色：Color(0xd0ff0000)；家庭：“单一空间”；大小：48。 重量：900；装饰：双色(0xffffff00) TextDecoration. nderline
I/flotter ( 6559): ediaQuery(MediaQueryData(size: Size(411.4, 683.4), devicePixelRatio: 2.625, textScaleFactor: 1. , 填充: EdgeInsets(0, 24.0, 0.0, 0.0 )
I/flutter ( 6559): LocaleQuery(null)
I/flutter ( 6559): 约束标题(颜色: Color(0xff2196f3))
... 
```

这是一个“平整”树，显示各种构建函数投放的小部件(如果你在小部件树根处调用 `toStringDeepWid` )， 这是你得到的树木)。 您将看到许多小部件没有出现在您的应用程序源代码中，因为它们是由 `build()` 框架中的小部件插入的。 例如， [`InkFeature`](https://docs.flutter.io/flutter/material/InkFeature-class.html) 是材料小部件的实现细节。

当调试令App() 被调用时，按钮从被按下变为被释放， FlatButton 对象也调用 `setState()` 并标记为 `dirty`。 这就是为什么如果你看到倾倒，你会看到特定的对象被标记为“脏”。 您还可以看到哪些手势监听器已注册； 在这种情况下， 单个动作检测器被列出并监听“tap”手势("tap" 是 `TapGestureDetor`s `toStringShort` 函数输出)

如果您写了自己的小部件，您可以通过覆盖 [`调试FillProperties()`](https://docs.flutter.io/flutter/widgets/Widget/debugFillProperties.html) 添加信息。 将 [诊断属性](https://docs.flutter.io/flutter/foundation/DiagnosticsProperty-class.html) 对象作为方法参数并调用父类方法。 此函数用于此 `toString` 方法来填充小部件描述信息。

#### 渲染树

如果你试图调试布局问题，小部件树可能不够详细。 在这种情况下，您可以通过调用 `debugDumpRenderTree()` 来输出渲染树。 与 `debugDumpApp()`一样，您可以在布局或绘图阶段以外的任何时候调用此函数。 一般来说，从 [帧回调](https://docs.flutter.io/flutter/scheduler/SchedulerBinding/addPersistentFrameCallback.html) 或从事件处理程序调用它是最好的解决办法。

要调用 `debugDumpRenderTree()`, 你需要添加 `导入包:flutter/rendering.dart';` 到你的源文件。

下面是小示例的输出。

```shell
I/flutter (6559): RenderView
I/flutter (6559): │ 启用调试模式 - android
I/flutter (6559): │ 窗口大小: Size(1080.0, 1794.0) (物理像素)
I/flutter ( 6559): │ 设备像素比: 2.625 (物理像素/逻辑像素)
I/flutter (6559): │ 配置: Size(411.4, 683.4) at 2.625x (inlogical pixel)
I/flutter (6559): │
I/flutter (6559): └─child: RenderCustomPaint
I/flutter (6559): │ creator: CustomPaint ← Banner ← CheckedModeBanner ←
I/flutter (6559): │ WidgetsApp-[GlobalObjectKey _MaterialAppState(1009803148)] ←
I/flutter (6559): │ Theme ← AnimatedTheme ← ScrollConfiguration ← MaterialApp ←
I/flutter (6559): │   [root]
I/flutter (6559): │ parentData: <none>
I/flutter (6559): │ 约束: BoxConstraints （w=411.4，h=683.4）
I/颤振（6559）：│尺寸：尺寸（411.4，683.4）
... 
```

这是根 `RenderObject` 对象的 `toStringDeep` 函数的输出。

当调试布局出现问题时，关键的问题是 `大小` 和 `约束` 字段。 限制因素会被传递到树上，大小会被传递。

如果您写了自己的渲染对象，您可以通过覆盖 [`debugFillProperties()`](https://docs.flutter.io/flutter/rendering/Layer/debugFillProperties.html) 将信息添加到输出中。 将 [诊断属性](https://docs.flutter.io/flutter/foundation/DiagnosticsProperty-class.html) 对象作为方法的参数，然后调用父方法。

#### 图层树

阅读器可以理解渲染树可以分层， 和最后绘图需要合成不同的图层，而图层则是绘图时要合成的图层。 如果你试图调试合成问题，你可以使用 [`debugDumpLayerTree()`](<https://docs.flutter.io/flutter/> rendering/debugDumpLayerTree.html)。 就上述例子而言，它将产生结果。

```
I/flutter：TransformLayer
I/flutter：│创建者： [root]
I/flutter：│偏移量：Offset(0.0, 0.0)
I/flutter：│变换：
I/flutter：   [0] 3.5,0.0,0.0,0.0
I/颤振：│   [1] 0.0,3.5,0.0,0.0
I/颤振：│   [2] 0.0,0.0,1.0,0.0
I/颤振：│   [3] 0.0,0.0,0.0,1.0
I/颤振：│
I /flutter : ├─child 1: OffsetLayer
I/flutter : │ │ creator: RepaintBoundary ← _FocusScope ← Semantics ← Focus-[GlobalObjectKey MaterialPageRoute(560156430)] ← _ModalScope-[GlobalKey 328026813] ← _OverlayEntry-[GlobalKey 388965355] ← Stack ← Overlay-[GlobalKey 625702218] ← Navigator-[GlobalObjectKey _MaterialAppState(859106034)] ← Title ← ⋯
I/flutter : │ │ offset: Offset(0.0, 0.0)
I/flutter : │ │
I/flutter : │ └─ child 1: PictureLayer
I/flutter : │
I/flutter : └─child 2: PictureLayer
```

这是root `Layer <code>toStringDeep`</code> 的输出。

根转换是一个转换，使用设备像素比率；在这种情况下，每个逻辑像素代表3.5设备像素。

`修复边界` 小部件在渲染树的图层中创建 `渲染修复边界` 这用于减少所需的再循环量。

### 语句

您也可以调用 [`debugDumpSemanticsTree()`](https://docs.flutter.io/flutter/rendering/debugDumpSemanticsTree.html) 获取语义树的转储(向系统可访问性API展示的树)。 要使用此函数, 您必须首先启用辅助函数, 例如启用系统助手或 `SemanticsDebugger` (下面讨论)。

对于以上示例，它将输出：

```
I/flutter : SemanticsNode(0; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4))
I/flutter :  ├SemanticsNode(1; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4))
I/flutter :  │ └SemanticsNode(2; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4); canBeTapped)
I/flutter :  └SemanticsNode(3; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4))
I/flutter :    └SemanticsNode(4; Rect.fromLTRB(0.0, 0.0, 82.0, 36.0); canBeTapped; "Dump App")
```

### 计划中

查找相对于帧的开始/结束事件发生地点， 您可以切换 [`debugPrintBeginFramework Banner`](https://docs.flutter.io/flutter/scheduler/debugPrintBeginFrameBanner.html) 和 [`debugPrintEndFramework Banner`](https://docs.flutter.io/flutter/scheduler/debugPrintEndFrameBanner.html) 布尔值以打印帧的起始和结尾到控制台。

示例：

```
I/flutter : ▄▄▄▄▄▄▄▄ 第 12 帧 30 秒 437.086ms ▄▄▄▄▄▄▄▄
I/flutter : 调试打印：我是否每帧不止一次执行这项工作？
I/flutter : 调试打印: 每帧我执行一次以上的工作?
I/flutter : ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
```

[`debugPrintScheduleFrameworks`](https://docs.flutter.io/flutter/scheduler/debugPrintScheduleFrameStacks.html)它也可以用于打印导致当前帧被调度的调用堆栈。

### 视觉调试

您也可以通过设置 `调试PaintSize启用` 到 `true` 来视觉调试布局问题。 这是来自 `渲染` 库的布尔值。 它可以在任何时候启用，并且当它是真实时会影响绘画。 设置它的最简单的方法是将它设置在 `无效的 main()` 的顶部。

当启用时，所有方框都会有亮黑暗圆环边框，填充(从小部件如填充)会以亮蓝色显示， 子部件周围有一个深蓝色框，对齐(来自中心和对齐等小部件)显示为黄箭头。 空白(例如容器没有任何子节点)以灰色显示。

[`调试PaintBaselines已启用`](https://docs.flutter.io/flutter/rendering/debugPaintBaselinesEnabled.html) 做了类似的事情， 但对于有基线的物体，文本基线以绿线标出，理想度基线以橙色标出。

[`调试PaintPointers启用`](https://docs.flutter.io/flutter/rendering/debugPaintPointersEnabled.html) 标志打开了一种特殊模式，在这种模式下，任何被点击的对象都会被高亮显示在暗色高亮中。 这可以帮助您确定某个对象是否以某种不正确的方式进行命中测试(如果点击的位置有响应用户动作的小部件的话， 例如，如果其母项目实际上超出其母项目的范围， 它首先不会被考虑进行撞击试验。

如果你试图调试一个复合图层，比如用来确定是否和在哪里添加 `修复边界` 小部件， 您可以使用 [`调试绘图布局Borders启用`](https://docs.flutter.io/flutter/rendering) /debugPaintLayerBorders启用 tml标记每个图层的边界有橙色或概述的行，或使用[`debugRepaintRainbow已启用`](https://docs)。 lutter.io/flutter/rendering/debugRepainbowEnabled.html）旗帜每次重新绘制时都会导致图层被一组旋转颜色覆盖。

所有这些标记只能在调试模式下工作。 通常，Flutter框架中以``debug... `为起点的任何东西只能在调试模式下工作。

### 调试动画

调试动画的最简单方式是减缓动画。 要做到这一点，请设置 [`timeDilation`](https://docs.flutter.io/flutter/scheduler/timeDilation.html) 变量(在调度程序库中) 大于 1.0，例如：50.0。 最好只在应用程序启动一次时设置一次。 如果您在飞行时更改它，特别是如果您在动画运行时将其值更改为较小的值， 你可能会在观察上出现倒退，这可能会导致命中弹，这通常会干扰我们的发展努力。

### 调试性能问题

要了解什么原因导致应用程序重新布局或重新绘制，您可以设置 [`debugPrintMarkNeedsLayoutStacks`](https://docs.flutter.io/flutter/rendering/) 单独调试PrintMarkNeedsLayoutStacks。 tml和[`debugPrintMarkNeedsPaintStacks`](https://docs.flutter.io/flutter/rendering/debugPrintMarkNeedsPaintStacks.html) 标志 每当请求渲染方框重新布局并重新修复时，这些记录堆栈跟踪到控制台。 如果此方法适用于您， 您可以在 `服务` 库中使用 `debugPrintStack()` 方法来按需打印堆栈跟踪。

### 统计应用程序启动时间

收集Flutter应用程序启动所需时间的详细信息， 您可以在运行 `通风机运行` 时使用 `跟踪启动` 和 `配置` 选项。

```shell
flutter run --trace-startup --profile
```

跟踪输出被保存为 `start_up_info.json` 在 Flutter 项目目录下的构建目录下。 输出列出了从应用程序启动到这些跟踪事件所花费的时间(在微秒中捕获)。

- 当进入流体引擎时。
- 当显示应用程序的第一帧时。
- 初始化流体框架。
- 当完成流体框架的初始化时。

以 :

```json
主席:
  "engineEnterTimestampMicros": 960255565262,
  "timeToFirstFramers": 2171978,
  "timeToFrameworkInitMicros": 514585,
  "timeAfterFrameworkInitMicros": 1657393
}
```

### 跟踪暗色代码性能。

要执行自定义性能跟踪并测量Dart 任意代码段的壁/CPU时间(类似于Android上使用 [systrace](https://developer.android.com/studio/profile/systrace.html) )，使用 `dart:developer`s [时间线](https://api.dartlang.org/stable/dart-developer/Timeline-class.html) 工具包括您想要测试的代码块。 例如:

```dart
Timeline.startSync('有趣的函数');
// iWonderHowLongThisTakes();
Timeline.finishSync();
```

然后打开您的应用程序观测站时间线页，在“录音流”中选择“Dart”复选框，并执行您想要测量的函数。

刷新页面将在 Chrome 的 [跟踪工具](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) 中按时间顺序显示应用程序的时间线记录。

请确保使用 `-profile` 标志运行 `flutter run` ，以确保运行时性能特征与最终产品的差异最小。