# 资源管理

Flutter APP 安装程序将包含代码和素材(资源)。 资源被打包到应用程序安装程序中，可以在运行时访问。 常见类型的资产包括静态数据(例如： JSON 文件)、配置文件、图标和图像 (JPEG、WebP、GIF、动画的 WebP / GIF、PNG、BMP 和 WBMP) 等。

## 指定资产

像软件包管理一样，Flutter 使用 [`pubspec.yaml`](https://www.dartlang.org/tools/pub/pubspec) 文件来管理应用程序所需的资源，作为示例：

```yaml
flutter:
  assets:
    - assets/my_icon.png
    - assets/background.png
```

`assets` 指定了应该包含在应用程序中的文件。 和每个资产通过文件系统路径识别其自己的路径，相对于 `pubspec的位置。 aml` 文件已找到。 资产申报的顺序无关紧要。 和资产的实际目录可以是任何文件夹(在这种情况下是资产文件夹)。

在建造过程中，Flutter将资产放入特殊档案，名为 *asset bundles*， 可以在运行时通过应用程序读取(但未修改)。

## 资产变体

构建过程支持“资产变量”的概念：资产的不同版本可在不同情况下显示。 当在 `pubspect 的素材部分中指定一个素材路径时。 aml`, 构建过程在相邻的子目录中寻找任何具有相同名称的文件。 这些文件随后与特定资产一起被包含在资产捆绑中。

例如，如果应用程序目录有以下文件：

- .../pubspec.yaml
- .../graphics/my_icon.png
- .../graphics/background.png
- .../graphics/dark/background.png
- ...等

然后 `pubspec.yaml` 文件应该只包含 :

```
flutter:
  assets:
    - graphics/background.png
```

然后 `图形/背景.png` 和 `图形/dark/background.png` 都将包含在您的素材包中。 前者被认为是 *主要资产* 而后者被认为是变体。

Flutter在选择匹配当前设备分辨率的图像时使用资产变体(见下文)， 今后，流星可能会将这种机制扩展到本地化、阅读技巧等等。

## 正在加载资产

您的应用程序可以通过 [`AssetBundle`](https://docs.flutter.io/flutter/services/AssetBundle-class.html) 对象访问其资产。 有两种主要方法允许从素材包加载字符串或图像 (bin) 文件。

### 正在加载文本资源

- 通过 [加载`rootBundle`](https://docs.flutter.io/flutter/services/rootBundle.html) 对象：每个Flutter 应用程序都有 [`rootBundle`](<https://docs>。 flutter.io/flutter/services/rootBundle。 tml对象， 您可以轻松地访问主要资源包，并直接使用 `package:flutter/services 中的全局静态 <code>rootBundle` 对象加载资产。 art</code>
- 通过 [加载`DefaultAssetBundle`](https://docs.flutter.io/flutter/widgets/DefaultAssetBundle-class.html): 建议使用 [`默认AssetBundle`](https://docs.flutter.io/flutter/widgets/DefaultAssetBundle-class.html) 获取当前BuildContext的 AssetBundle 这个方法不是使用由应用程序构建的默认素材捆绑包，而是。 它生成了一个不同的 AssetBundle ，父部件在运行时动态地替换。这对于本地化或测试场景是有用的。

通常情况下，assets (例如JSON 文件) 可以在应用程序运行时使用 ``默认AssetBundle 间接加载。 f()`'，当它们可以直接使用``rootBundle`”在部件上下文之外加载时， 或者当其他 ``AssetBundle`' 的处理不可用时，例如：

```dart
导入 'dart:async' 显示未来;
导入 'package:flutter/services.dart' show rootBundle;

Future<String> loadAsset() async Puerto
  return rehing rootBundle.loadString('assets/config.json');
}
```

### 正在加载图像

与本地开发相似，Flutter可以用适合它的分辨率加载当前设备的图像。

#### 宣布依赖决议的图像资源

[`AssetImage`](https://docs.flutter.io/flutter/painting/AssetImage-class.html) 可以逻辑地映射资产请求到最近于当前设备的像素比率 (dpi)。 要使映射发挥作用，它必须根据特定的目录结构保存资产。

- .../image.png
- .../*M**x/image.png
- .../*N**x/image.png
- ...等

M和N是与其中所载图像分辨率相对应的数字标识符。 。他们指定不同设备像素比率的图像。

主资源默认为 1.0x 分辨率图像。 看看一个例子。

- .../my_icon.png
- .../2.0x/my_icon.png
- ....0x/my_icon.png

设备像素比为1.8的设备， `... /2.0x/my_icon.png` 将被选中。 对于设备像素比率为2.7, `... /3.0x/my_icon.png` 将被选中。

如果渲染图像的宽度和高度未在 `图像` 部件上指定， 然后 `图像` 将占用与主要资源相同的屏幕空间大小。 也就是说，如果 `... /my_icon.png` 是72px by 72px, 那么 `... /3.0x/my_icon ng` 应为 216px ×216px; 但如果未指明宽度和高度，这两者都会渲染为72像素乘72像素(逻辑像素)。

`pubspec.yaml` 资产部分中的每个项目都应该对应于实际文件，但主要资源项目除外。 当一个资源从主资源中丢失时，它将按分辨率的降序排列选择。 。如果它不是 1x，它将在 2x中找到。 如果它不是在 2x 中，它将在 3x 中找到。

#### 正在加载图像

要加载图像，您可以使用 [`AssetImage`](https://docs.flutter.io/flutter/painting/AssetImage-class.html) 类. 例如，我们可以从上面的资产申报中加载背景图像。

```dart
构建小部件(BuildContext context context pirt) 让您
  return new DecoratedBox(
    Decoration: new BoxDecoration(
      image: new DecorationImage(
        image: new AssetImage('graphics/background). ng',
      ),
    ),
  );
}
```

注意 `AssetImage` 不是一个小工具，它实际上是 `ImageProvider`, 有时候你可能会得到一个直接显示图像的小部件，然后你可以使用 `图像。 set()` 方法，例如

```dart
Widget build(BuildContext context 上下文)(
  return Image.asset('graphics/background.png');
}
```

当使用默认资产捆绑加载资源时，分辨率等会自动在内部处理，这种处理对开发者来说是不可察觉的。 (如果您使用了一些较低级别的类，如 [`ImageStream`](https://docs.flutter.io/flutter/painting/ImageStream-class.html) 或 [`ImageCache`](<https://docs>。) flutter.io/flutter/油漆/ImageCache-class.html) 您会注意到存在与缩放相关的参数)

#### 依赖包中的资源图像

若要从依赖包加载图像，您必须给 `AssetImage` `package` 参数。

例如，假定您的应用程序依赖于一个名为“my_icons”的包，并具有以下目录结构。

- .../pubspec.yaml
- .../icons/heart.png
- .../icons/1.5x/heart.png
- .../icons/2.0x/heart.png
- ...等

然后加载图像，使用 :

```dart
 新的AssetImage('icons/heart.png', package: 'my_icons')
```

或

```dart
新 Image.asset('icons/heart.png', package: 'my_icons')
```

**注意：在使用自己的资源** 时，还应该通过添加 `包` 参数来获取包。

##### 点击包中的素材

如果在 `pubspec.yaml` 文件中声明了一个预期的资源，它将被打包到相应的软件包。 尤其是，包本身使用的资源必须在 `pubspec.yaml` 中指定。

包也可以选择在他们的 `lib/` 文件夹中包含资源，而这些资源在他们的 `pubspec.yaml` 文件中没有被声明。 在这种情况下，要想将图像打包，应用程序必须在 `pubspec.yaml` 中指定哪些图像要包含。 例如，名为 `fancy_background` 的软件包可能包含以下文件。

- .../lib/backgrounds/background1.png
- .../lib/backgrounds/background2.png
- .../lib/backgrounds/background3.png

要包含第一个图像，它必须在 `pubspec.yaml` 的素材部分中声明为

```
flutter:
  assets:
    - 软件包/fancy_backgrounds/backgrounds/background1.png
```

`lib/` 是隐含的，所以它不应该包含在资产路径中。

### 平台特定资源

上述资源都在流体应用中，这些资源只能在流体构架运行后才能使用。 如果我们想要设置应用图标或添加启动图像到我们的应用程序，那么我们必须使用平台特定的资产。

#### 设置应用图标

更新Flutter应用启动图标的方式与更新原生的 Android 或 iOS 应用程序中的启动图标相同。

- Android

  在 Flutter 项目的根目录中，导航到 `... /android/app/src/main/res` 目录，其中包含各种资源文件夹 (e). 。 `mipmap-hdpi` 已经包含了占位符图像“ic_launcher.png”，见图2-8。 只需按照 [Android 开发者指南](https://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher.html#size) 中的说明来替换它们。 并遵守每个屏幕密度(dpi)的建议图标尺寸标准。

  ! [图2-8](https://pcdn.flutterchina.club/imgs/2-8.png)

  > **注意：** 如果你重命名……。 ng 文件 名称也必须在 `android:icon` 属性 `<application>` 标签中更新 `AndroidManifest。 ml`

- iOS

  在 Flutter 项目的根目录中，导航到 `... /ios/Runner`。 目录 `Assets.xcassets/AppIcon.appicsted` 已经包含占位符图像(见图2-9)，只要用适当尺寸的图像替换，保留原始文件名称。

  ! [图2-9](https://pcdn.flutterchina.club/imgs/2-9.png)

#### Update startup page

! [图2-10](https://pcdn.flutterchina.club/imgs/2-10.png)

当Flutter框架加载时，Flutter使用本地平台机制绘制启动页面。 此启动页面将持续到应用程序的第一帧由 Flutter 渲染。

> **注意：** 这意味着如果您没有调用 [运行App](https://docs.flutter.io/flutter/widgets/runApp.html) 在应用程序的 `main()` 方法 (或更具体的) 如果您没有调用 [`窗口。 ender`] (<https://docs.flutter.io/flutter/dart-ui/Window/render.html>) 响应 [`windows。 nDrawFrame`](https://docs.flutter.io/flutter/dart-ui/) Window/onDrawFramework.html)将始终显示起始屏。

##### Android

若要将初始屏幕添加到您的Flutter应用程序，导航到 `... /android/app/src/main`。 在 `res/rawable/launch_background.xml`中，自定义启动屏幕并自定义可绘制(您也可以更改图像)。

##### iOS

要将图像添加到启动屏幕的中心 (splash屏幕)，导航到 `... /ios/Runner`。 在 `Assets.xcassets/LaunchImage.imageset`, 拖动图像和名称 `LaunchImage.png`, `LaunchImage@2x.png`, `LaunchImage@3x.png`. 如果你使用不同的文件名, 那么你也必须更新 `内容。 在同一目录中的son` 文件，并检查 Apple 的官方标准以了解图像的确切大小。

您也可以通过打开 Xcode 来完全自定义故事板. 在项目导航器中导航到 `运行器/运行器` 并通过打开 `资产拖动图像。 种子集`或使用接口构建器自定义，如图2-11所示。

! [图2-11](https://pcdn.flutterchina.club/imgs/2-11.png)
