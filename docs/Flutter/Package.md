# Package Management

YAML is an intuitive, highly readable and human-readable file format, it's syntax is simple and very easy to parse compared to xml or Json, so YAML is often used for configuration files, Flutter also uses yaml files as its configuration files. the default configuration file for Flutter projects is `pubspec.yaml`, let's look at a simple example.

```yaml
name: flutter_in_action
description: First Flutter application.

version: 1.0.0+1

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^0.1.2

dev_dependencies:
  flutter_test:
    sdk: flutter

flutter:
  uses-material-design: true
```

- `name`: the name of the application or package.
- ``description``: description, introduction of the application or package.
- `version`: version number of the application or package.
- ``dependencies``: other packages or plugins that the application or package depends on.
- `dev_dependencies`: the toolkits that the development environment depends on (not the packages that the flutter application itself depends on).
- `flutter`: flutter-related configuration options.

If our Flutter application itself depends on a package, we need to add the dependent package under `dependencies`, next we will demonstrate how to add, download and use third-party packages with an example.

## Pub repository

Pub (<https://pub.dev/> ) is the official Google repository for **Dart Packages**.

## Example

Next, we implement a widget that displays random strings. there is an open source package called "english_words" that contains thousands of common English words and some useful functions. We first find the package "english_words" on pub (shown in Figure 2-5), determine its latest version number and whether it supports Flutter.

! [Figure 2-5](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/2-5.png)

We see that the latest version of the "english_words" package is 3.1.3, and it supports flutter.

1. add "english_words" (version 3.1.3) to the list of dependencies, as follows.

   ```yaml
   dependencies:
     flutter:
       sdk: flutter
   
     cupertino_icons: ^0.1.0
     # New dependencies added
     : ^3.1.3
   ```

2. Download the package. When viewing pubspec.yaml in the editor view of Android Studio (Figure 2-6), click **Packages get** in the upper right corner.

   ! [Figure 2-6](https://pcdn.flutterchina.club/imgs/2-6.png)

   This will install the dependency packages to your project. We can see the following in the console.

   ```shell
   flutter packages get
   Running "flutter packages get" in flutter_in_action...
   Process finished with exit code 0
   ```

   We can also download the dependencies from the console by locating the current project directory and running the `flutter packages get` command manually. Also, note the difference between `dependencies` and `dev_dependencies`, the former dependencies will be compiled as part of the source code of the app to generate the final installer. The latter dependencies are only used as some toolkits in the development stage, mainly to help us improve the development and testing efficiency, such as flutter's automation test package, etc.

3. introduce the `english_words` package.

   ```dart
   import 'package:english_words/english_words.dart';
   ```

   On import, Android Studio will automatically provide suggested options for library import. The line of code will be grayed out after importing, indicating that the imported library is not used yet. 4.

4. Use `english_words` package to generate random strings.

   ```dart
   class RandomWordsWidget extends StatelessWidget {
     @override
     Widget build(BuildContext context) {
      // Generate random strings
       final wordPair = new WordPair.random();
       return Padding(
         padding: const EdgeInsets.all(8.0),
         child: new Text(wordPair.toString()),
       );
     }
   }
   ```

   We add `RandomWordsWidget` to the child widget of `Column` of `_MyHomePageState.build`.

   ```dart
   Column(
     mainAxisAlignment: MainAxisAlignment.center,
     children: <Widget>[
       RandomWordsWidget(),
     ],
   )
   ```

5. If the application is running, use the Hot Reload button (⚡️ icon) to update the running application. Each time you click Hot Reload or Save Item, a different word pair is randomly selected in the running application. This is because the word pairs are generated inside the `build` method. The `build` method is executed each time a hot update is performed, and runs as shown in Figure 2-7.

   ! [Figure 2-7](https://pcdn.flutterchina.club/imgs/2-7.png)

## Other dependency methods

The dependency methods described above rely on Pub repositories. However, we can also rely on local packages and git repositories.

- Reliance on local packages

  If we are developing a package locally, named pkg1, we can depend on it by doing the following.

  ```yaml
  dependencies:
      pkg1:
          path: ... /... /code/pkg1
  ```

  Paths can be either relative or absolute.

- Dependency on Git: You can also depend on packages stored in a Git repository. If the package is located in the root of the repository, use the following syntax

  ```yaml
  dependencies:
    pkg1:
      git:
        url: git://github.com/xxx/pkg1.git
  ```

  The above assumes that the package is located in the root directory of the Git repository. If this is not the case, you can specify a relative location using the path parameter, e.g.

  ```yaml
  dependencies:
    package1:
      git:
        url: git://github.com/flutter/packages.git
        path: packages/package1
  ```

These dependencies described above are commonly used in Flutter development, but there are some other dependencies, the complete content of which the reader can see for himself: <https://www.dartlang.org/tools/pub/dependencies> .

## Summary

This section describes the overall process of package management, referencing, and downloading in Flutter, and we will cover how to develop and distribute our own packages in later chapters.
***Translated with www.DeepL.com/Translator (free version)***

# Package Management

YAML is an intuitive, highly readable and human-readable file format, it's syntax is simple and very easy to parse compared to xml or Json, so YAML is often used for configuration files, Flutter also uses yaml files as its configuration files. the default configuration file for Flutter projects is `pubspec.yaml`, let's look at a simple example.

```yaml
name: flutter_in_action
description: First Flutter application.

version: 1.0.0+1

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^0.1.2

dev_dependencies:
  flutter_test:
    sdk: flutter

flutter:
  uses-material-design: true
```

- `name`: the name of the application or package.
- ``description``: description, introduction of the application or package.
- `version`: version number of the application or package.
- ``dependencies``: other packages or plugins that the application or package depends on.
- `dev_dependencies`: the toolkits that the development environment depends on (not the packages that the flutter application itself depends on).
- `flutter`: flutter-related configuration options.

If our Flutter application itself depends on a package, we need to add the dependent package under `dependencies`, next we will demonstrate how to add, download and use third-party packages with an example.

## Pub repository

Pub (<https://pub.dev/> ) is the official Google repository for **Dart Packages**.

## Example

Next, we implement a widget that displays random strings. there is an open source package called "english_words" that contains thousands of common English words and some useful functions. We first find the package "english_words" on pub (shown in Figure 2-5), determine its latest version number and whether it supports Flutter.

! [Figure 2-5](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/2-5.png)

We see that the latest version of the "english_words" package is 3.1.3, and it supports flutter.

1. add "english_words" (version 3.1.3) to the list of dependencies, as follows.

   ```yaml
   dependencies:
     flutter:
       sdk: flutter
   
     cupertino_icons: ^0.1.0
     # New dependencies added
     : ^3.1.3
   ```

2. Download the package. When viewing pubspec.yaml in the editor view of Android Studio (Figure 2-6), click **Packages get** in the upper right corner.

   ! [Figure 2-6](https://pcdn.flutterchina.club/imgs/2-6.png)

   This will install the dependency packages to your project. We can see the following in the console.

   ```shell
   flutter packages get
   Running "flutter packages get" in flutter_in_action...
   Process finished with exit code 0
   ```

   We can also download the dependencies from the console by locating the current project directory and running the `flutter packages get` command manually. Also, note the difference between `dependencies` and `dev_dependencies`, the former dependencies will be compiled as part of the source code of the app to generate the final installer. The latter dependencies are only used as some toolkits in the development stage, mainly to help us improve the development and testing efficiency, such as flutter's automation test package, etc.

3. introduce the `english_words` package.

   ```dart
   import 'package:english_words/english_words.dart';
   ```

   On import, Android Studio will automatically provide suggested options for library import. The line of code will be grayed out after importing, indicating that the imported library is not used yet. 4.

4. Use `english_words` package to generate random strings.

   ```dart
   class RandomWordsWidget extends StatelessWidget {
     @override
     Widget build(BuildContext context) {
      // Generate random strings
       final wordPair = new WordPair.random();
       return Padding(
         padding: const EdgeInsets.all(8.0),
         child: new Text(wordPair.toString()),
       );
     }
   }
   ```

   We add `RandomWordsWidget` to the child widget of `Column` of `_MyHomePageState.build`.

   ```dart
   Column(
     mainAxisAlignment: MainAxisAlignment.center,
     children: <Widget>[
       RandomWordsWidget(),
     ],
   )
   ```

5. If the application is running, use the Hot Reload button (⚡️ icon) to update the running application. Each time you click Hot Reload or Save Item, a different word pair is randomly selected in the running application. This is because the word pairs are generated inside the `build` method. The `build` method is executed each time a hot update is performed, and runs as shown in Figure 2-7.

   ! [Figure 2-7](https://pcdn.flutterchina.club/imgs/2-7.png)

## Other dependency methods

The dependency methods described above rely on Pub repositories. However, we can also rely on local packages and git repositories.

- Reliance on local packages

  If we are developing a package locally, named pkg1, we can depend on it by doing the following.

  ```yaml
  dependencies:
      pkg1:
          path: ... /... /code/pkg1
  ```

  Paths can be either relative or absolute.

- Dependency on Git: You can also depend on packages stored in a Git repository. If the package is located in the root of the repository, use the following syntax

  ```yaml
  dependencies:
    pkg1:
      git:
        url: git://github.com/xxx/pkg1.git
  ```

  The above assumes that the package is located in the root directory of the Git repository. If this is not the case, you can specify a relative location using the path parameter, e.g.

  ```yaml
  dependencies:
    package1:
      git:
        url: git://github.com/flutter/packages.git
        path: packages/package1
  ```

These dependencies described above are commonly used in Flutter development, but there are some other dependencies, the complete content of which the reader can see for himself: <https://www.dartlang.org/tools/pub/dependencies> .

## Summary

This section describes the overall process of package management, referencing, and downloading in Flutter, and we will cover how to develop and distribute our own packages in later chapters.
