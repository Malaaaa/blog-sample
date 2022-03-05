# 包管理

YAML 是一种直觉、易读和易读的文件格式，与xml或Json相比，它的语法很简单，很容易解析。 所以YAML 经常用于配置文件，Flutter 也使用yaml 文件作为其配置文件。 Flutter 工程的默认配置文件是 `pubspec.yaml`，让我们看看一个简单的例子。

```yaml
名称：flutter_in_action
描述：第一个流体应用程序。

版本: 1.0.0+1

依赖于:
  flutter:
    sdk: flutter
  cutperio_icons: ^0.1.2

dev_dependencies:
  flutter_test:
    sdk: flutter

flutter:
  uses-materialdesign: true
```

- `名称`: 应用程序或包的名称。
- `描述`: 描述, 应用程序或软件包的导言。
- `版本`: 应用程序或包的版本号。
- `依赖关系`: 应用程序或软件包依赖的其他软件包或插件。
- `dev_dependencies`: 开发环境所依赖的工具包(而不是流体应用本身所依赖的软件包)。
- `流体`: 与平滑相关的配置选项。

如果我们的流体应用程序本身依赖于包件，我们需要在 `依赖关系下添加依赖的包`接下来我们将演示如何添加、下载和使用第三方包，并举一个例子。

## Pub repository

Pub (<https://pub.dev/> )是官方的 Google 存储库用于 **Dart 软件包**

## 示例

接下来，我们实现一个显示随机字符串的小部件。 有一个叫做“english_words”的开放源码软件包，其中包含数以千计的通用英文词和一些有用的功能。 我们首先在pub上找到软件包“english_words”（如图2-5所示），确定其最新版本号以及是否支持Flutter。

! [图2-5](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/2-5.png)

我们看到“english_words”软件包的最新版本为3.1.3，它支持软体软件包。

1. 在依赖列表中加上“english_words”(第3.1.3版)，如下所示。

   ```yaml
   依赖:
     flutter:
       sdk: flotter

     cuccentino_icons: ^0.1.0
     # 添加的新依赖项
     : ^3.1.3
   ```

2. 下载包。 当在 Android Studio 的编辑器视图中查看 pubspec.yaml 时(图2-6)，点击 **包在右上角获取**。

   ! [图2-6](https://pcdn.flutterchina.club/imgs/2-6.png)

   这将安装依赖包到您的项目。 我们可以在控制台中看到以下内容。

   ```shell
   flutter_in_action中的 flutter 软件包获得
   运行 "flutter 软件包获取"...
   处理已完成，退出代码 0
   ```

   我们还可以通过定位当前项目目录并运行 `流体包手动获取` 命令，从控制台下载依赖项。 还注意 `依赖关系` 和 `dev_依赖关系`之间的差异 以前的依赖关系将作为应用程序源代码的一部分编译，用于生成最终安装程序。 后一种依赖仅作为开发阶段中的一些工具包。 主要是为了帮助我们提高研发和测试效率，例如调速器自动化测试包等。

3. 介绍 `english_words` 软件包。

   ```dart
   导入 'package:english_words/english_words.dart';
   ```

   导入时，Android Studio将自动提供导入库的推荐选项。 导入后代码行将会灰色出来，表示导入的库尚未使用。 4.

4. 使用 `english_words` 软件包生成随机字符串。

   ```dart
   Class RandomWordsWidget exts extensive StatelessWidget }
     @overript
     Widget build(BuildContext context Context) }
      // 生成随机字符串
       final wordPair = new WordPair。 andom();
       return Padding(
         padding: const EdgeInsets.all(8). ),
         child: new Text(wordPair). oString(),
       );
     }
}
   ```

   我们将 `RandomWordsWidget` 添加到 `列` 的子部件 `_MyHomePageState.build` 中。

   ```dart
   列(
     mainAxisAlignity: MainAxisAlignment.center,
     children: <Widget>[
       RandomWordsWidget(),
     ],
)
   ```

5. 如果应用程序正在运行，请使用热重新加载按钮 (:hig_voltat: icon) 更新运行中的应用程序。 每次点击热重新加载或保存项目时，在运行中的应用程序中随机选择不同的单词。 这是因为单词对是在 `构建` 方法内生成的。 每次执行热更新时， `build` 方法都已执行，并如图2-7所示运行。

   ! [图2-7](https://pcdn.flutterchina.club/imgs/2-7.png)

## 其他依赖方法

上面描述的依赖性方法依赖于Pub 存储库。 然而，我们也可以依靠本地软件包和git仓库。

- 依赖本地软件包

  如果我们正在本地制定一个叫做Pkg1的一揽子计划，我们可以通过以下方式依靠它。

  ```yaml
  依赖关系:
      pkg1:
          路径: ... /... /code/pkg1
  ```

  路径可以是相对路径，也可以是绝对路径。

- 依赖Git：您也可以依靠存储在 Git 仓库中的软件包。 如果软件包位于资源库的根目录中，请使用以下语法

  ```yaml
  dependencies:
    pkg1:
      git:
        url: git://github.com/xxx/pkg1.git
  ```

  上述假设软件包位于Git仓库的根目录。 如果不是这样，您可以使用路径参数指定一个相对位置，例如：

  ```yaml
  依赖:
    package1:
      git:
        url: git://github.com/flutter/packes.git
        path: package1
  ```

上述依赖关系通常用于Flutter开发，但也有一些其他依赖关系， 阅读者可以看到的完整内容： [https://www。 artlang.org/tools/pub/dependencies](https://www.dartlang.org/tools/pub/dependencies)。

## Summary

本节介绍污染物中的包管理、参考资料和下载的总体过程。 我们将在以后各章讨论如何制定和分发我们自己的一揽子计划。 ***已翻译为 www.deepL.com/translator (免费版本)***

# 包管理

YAML 是一种直觉、易读和易读的文件格式，与xml或Json相比，它的语法很简单，很容易解析。 所以YAML 经常用于配置文件，Flutter 也使用yaml 文件作为其配置文件。 Flutter 工程的默认配置文件是 `pubspec.yaml`，让我们看看一个简单的例子。

```yaml
名称：flutter_in_action
描述：第一个流体应用程序。

版本: 1.0.0+1

依赖于:
  flutter:
    sdk: flutter
  cutperio_icons: ^0.1.2

dev_dependencies:
  flutter_test:
    sdk: flutter

flutter:
  uses-materialdesign: true
```

- `名称`: 应用程序或包的名称。
- `描述`: 描述, 应用程序或软件包的导言。
- `版本`: 应用程序或包的版本号。
- `依赖关系`: 应用程序或软件包依赖的其他软件包或插件。
- `dev_dependencies`: 开发环境所依赖的工具包(而不是流体应用本身所依赖的软件包)。
- `流体`: 与平滑相关的配置选项。

如果我们的流体应用程序本身依赖于包件，我们需要在 `依赖关系下添加依赖的包`接下来我们将演示如何添加、下载和使用第三方包，并举一个例子。

## Pub repository

Pub (<https://pub.dev/> )是官方的 Google 存储库用于 **Dart 软件包**

## 示例

接下来，我们实现一个显示随机字符串的小部件。 有一个叫做“english_words”的开放源码软件包，其中包含数以千计的通用英文词和一些有用的功能。 我们首先在pub上找到软件包“english_words”（如图2-5所示），确定其最新版本号以及是否支持Flutter。

! [图2-5](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/2-5.png)

我们看到“english_words”软件包的最新版本为3.1.3，它支持软体软件包。

1. 在依赖列表中加上“english_words”(第3.1.3版)，如下所示。

   ```yaml
   依赖:
     flutter:
       sdk: flotter

     cuccentino_icons: ^0.1.0
     # 添加的新依赖项
     : ^3.1.3
   ```

2. 下载包。 当在 Android Studio 的编辑器视图中查看 pubspec.yaml 时(图2-6)，点击 **包在右上角获取**。

   ! [图2-6](https://pcdn.flutterchina.club/imgs/2-6.png)

   这将安装依赖包到您的项目。 我们可以在控制台中看到以下内容。

   ```shell
   flutter_in_action中的 flutter 软件包获得
   运行 "flutter 软件包获取"...
   处理已完成，退出代码 0
   ```

   我们还可以通过定位当前项目目录并运行 `流体包手动获取` 命令，从控制台下载依赖项。 还注意 `依赖关系` 和 `dev_依赖关系`之间的差异 以前的依赖关系将作为应用程序源代码的一部分编译，用于生成最终安装程序。 后一种依赖仅作为开发阶段中的一些工具包。 主要是为了帮助我们提高研发和测试效率，例如调速器自动化测试包等。

3. 介绍 `english_words` 软件包。

   ```dart
   导入 'package:english_words/english_words.dart';
   ```

   导入时，Android Studio将自动提供导入库的推荐选项。 导入后代码行将会灰色出来，表示导入的库尚未使用。 4.

4. 使用 `english_words` 软件包生成随机字符串。

   ```dart
   Class RandomWordsWidget exts extensive StatelessWidget }
     @overript
     Widget build(BuildContext context Context) }
      // 生成随机字符串
       final wordPair = new WordPair。 andom();
       return Padding(
         padding: const EdgeInsets.all(8). ),
         child: new Text(wordPair). oString(),
       );
     }
}
   ```

   我们将 `RandomWordsWidget` 添加到 `列` 的子部件 `_MyHomePageState.build` 中。

   ```dart
   列(
     mainAxisAlignity: MainAxisAlignment.center,
     children: <Widget>[
       RandomWordsWidget(),
     ],
)
   ```

5. 如果应用程序正在运行，请使用热重新加载按钮 (:hig_voltat: icon) 更新运行中的应用程序。 每次点击热重新加载或保存项目时，在运行中的应用程序中随机选择不同的单词。 这是因为单词对是在 `构建` 方法内生成的。 每次执行热更新时， `build` 方法都已执行，并如图2-7所示运行。

   ! [图2-7](https://pcdn.flutterchina.club/imgs/2-7.png)

## 其他依赖方法

上面描述的依赖性方法依赖于Pub 存储库。 然而，我们也可以依靠本地软件包和git仓库。

- 依赖本地软件包

  如果我们正在本地制定一个叫做Pkg1的一揽子计划，我们可以通过以下方式依靠它。

  ```yaml
  依赖关系:
      pkg1:
          路径: ... /... /code/pkg1
  ```

  路径可以是相对路径，也可以是绝对路径。

- 依赖Git：您也可以依靠存储在 Git 仓库中的软件包。 如果软件包位于资源库的根目录中，请使用以下语法

  ```yaml
  dependencies:
    pkg1:
      git:
        url: git://github.com/xxx/pkg1.git
  ```

  上述假设软件包位于Git仓库的根目录。 如果不是这样，您可以使用路径参数指定一个相对位置，例如：

  ```yaml
  依赖:
    package1:
      git:
        url: git://github.com/flutter/packes.git
        path: package1
  ```

上述依赖关系通常用于Flutter开发，但也有一些其他依赖关系， 阅读者可以看到的完整内容： [https://www。 artlang.org/tools/pub/dependencies](https://www.dartlang.org/tools/pub/dependencies)。

## Summary

本节介绍污染物中的包管理、参考资料和下载的总体过程。 我们将在以后各章讨论如何制定和分发我们自己的一揽子计划。
