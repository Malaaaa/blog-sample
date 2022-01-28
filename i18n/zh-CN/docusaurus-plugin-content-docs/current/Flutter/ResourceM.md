# Resource Management

The Flutter APP installer will contain both code and assets (resources). assets are packaged into the application installer and can be accessed at runtime. Common types of assets include static data (e.g. JSON files), configuration files, icons and images (JPEG, WebP, GIF, animated WebP / GIF, PNG, BMP and WBMP), etc.

## Specifying assets

Like package management, Flutter uses the [``pubspec.yaml``](https://www.dartlang.org/tools/pub/pubspec) file to manage the resources required by the application, as an example:

```yaml
flutter:
  assets:
    - assets/my_icon.png
    - assets/background.png
```

`assets` specifies the files that should be included in the application, and each asset identifies its own path by the file system path relative to where the `pubspec.yaml` file is located. The order in which the assets are declared is irrelevant, and the actual directory of the assets can be any folder (in this case, the assets folder).

During the build, Flutter places assets into special archives called *asset bundles*, which can be read (but not modified) by the application at runtime.

## Asset variants

The build process supports the concept of "asset variants": different versions of an asset may be displayed in different contexts. When specifying an asset path in the assets section of `pubspec.yaml`, the build process looks for any files with the same name in adjacent subdirectories. These files are then included in the asset bundle along with the specified asset.

For example, if the application directory has the following files:

- .../pubspec.yaml
- .../graphics/my_icon.png
- .../graphics/background.png
- .../graphics/dark/background.png
- ...etc.

Then the `pubspec.yaml` file should only contain :

```
flutter:
  assets:
    - graphics/background.png
```

Then both `graphics/background.png` and `graphics/dark/background.png` will be included in your asset bundle. The former is considered the *main asset* and the latter is considered a variant.

Flutter uses asset variants when selecting images that match the current device resolution (see below), and in the future, Flutter may extend this mechanism to localization, reading tips, etc.

## Loading assets

Your application can access its assets via the [`AssetBundle`](https://docs.flutter.io/flutter/services/AssetBundle-class.html) object. There are two main methods that allow loading string or image (binary) files from the Asset bundle.

### Loading text assets

- Loading via the [`rootBundle`](https://docs.flutter.io/flutter/services/rootBundle.html) object: Each Flutter application has a [`rootBundle`](<https://docs>. flutter.io/flutter/services/rootBundle.html) object, through which you can easily access the main resource package and load the asset directly using the global static `rootBundle` object in `package:flutter/services.dart`.
- Loading via [`DefaultAssetBundle`](https://docs.flutter.io/flutter/widgets/DefaultAssetBundle-class.html): It is recommended to use [`DefaultAssetBundle`]( https://docs.flutter.io/flutter/widgets/DefaultAssetBundle-class.html) to get the AssetBundle for the current BuildContext. Instead of using the default asset bundle built by the application, this method Instead, it makes a different AssetBundle that the parent widget dynamically replaces at runtime, which is useful for localization or testing scenarios.

Typically, assets (e.g. JSON files) can be loaded indirectly at application runtime using ``DefaultAssetBundle.of()`'', while they can be loaded directly using``rootBundle`'' outside of the widget context, or when other ``AssetBundle`' handles are not available, e.g.

```dart
import 'dart:async' show Future;
import 'package:flutter/services.dart' show rootBundle;

Future<String> loadAsset() async {
  return await rootBundle.loadString('assets/config.json');
}
```

### Loading images

Similar to native development, Flutter can load images for the current device at a resolution appropriate for it.

#### declares resolution-dependent images assets

[`AssetImage`](https://docs.flutter.io/flutter/painting/AssetImage-class.html) can logically map an asset's request to the asset closest to the current device's pixel ratio (dpi). For this mapping to work, it must Save the asset according to a specific directory structure.

- .../image.png
- .../*M**x/image.png
- .../*N**x/image.png
- ...etc.

where M and N are numeric identifiers that correspond to the resolution of the images contained therein, i.e. they specify images of different device pixel ratios.

The main resource corresponds by default to a 1.0x resolution image. Look at an example.

- .../my_icon.png
- .../2.0x/my_icon.png
- .../3.0x/my_icon.png

On devices with a device pixel ratio of 1.8, `... /2.0x/my_icon.png` will be selected. For a device pixel ratio of 2.7, `... /3.0x/my_icon.png` will be selected.

If the width and height of the rendered image are not specified on the `Image` widget, then the `Image` widget will occupy the same screen space size as the main resource. That is, if `... /my_icon.png` is 72px by 72px, then `... /3.0x/my_icon.png` should be 216px by 216px; but if width and height are not specified, they will both render as 72 pixels by 72 pixels (in logical pixels).

Each item in the asset section of `pubspec.yaml` should correspond to the actual file, except for the main resource item. When a resource is missing from the main resource, it will be selected in descending order of resolution, i.e. if it is not in 1x, it will be found in 2x, and if it is not in 2x, it will be found in 3x.

#### Loading images

To load an image, you can use the [`AssetImage`](https://docs.flutter.io/flutter/painting/AssetImage-class.html) class. For example, we can load a background image from the asset declaration above.

```dart
Widget build(BuildContext context) {
  return new DecoratedBox(
    decoration: new BoxDecoration(
      image: new DecorationImage(
        image: new AssetImage('graphics/background.png'),
      ),
    ),
  );
}
```

Note that `AssetImage` is not a widget, it's actually an `ImageProvider`, and there are times when you might expect to get a widget that displays an image directly, then you can use the `Image.asset()` method, e.g.

```dart
Widget build(BuildContext context) {
  return Image.asset('graphics/background.png');
}
```

When loading resources using the default asset bundle, the resolution, etc. is automatically handled internally, and this handling is not perceptible to the developer. (If you use some lower-level classes like [`ImageStream`](https://docs.flutter.io/flutter/painting/ImageStream-class.html) or [`ImageCache`](<https://docs>. flutter.io/flutter/painting/ImageCache-class.html) you will notice that there are parameters related to scaling)

#### Resource images in dependency packages

To load an image from a dependency package, you must give `AssetImage` the `package` parameter.

For example, suppose your application depends on a package named "my_icons" with the following directory structure.

- .../pubspec.yaml
- .../icons/heart.png
- .../icons/1.5x/heart.png
- .../icons/2.0x/heart.png
- ...etc.

Then load the image, using :

```dart
 new AssetImage('icons/heart.png', package: 'my_icons')
```

or

```dart
new Image.asset('icons/heart.png', package: 'my_icons')
```

**Note: package should also be obtained by adding the `package` parameter when using its own resources**.

##### hits the assets in the package

If an expected resource is declared in the `pubspec.yaml` file, it will be packed into the corresponding package. In particular, the resources used by the package itself must be specified in `pubspec.yaml`.

Packages may also choose to include resources in their `lib/` folders that are not declared in their `pubspec.yaml` files. In this case, for the images to be packaged, the application must specify in `pubspec.yaml` which images to include. For example, a package named `fancy_backgrounds` might contain the following files.

- .../lib/backgrounds/background1.png
- .../lib/backgrounds/background2.png
- .../lib/backgrounds/background3.png

To include the first image, it must be declared in the assets section of `pubspec.yaml` as

```
flutter:
  assets:
    - packages/fancy_backgrounds/backgrounds/background1.png
```

`lib/` is implicit, so it should not be included in the asset path.

### Platform-specific assets

The above resources are all in the flutter application, these resources can only be used after the Flutter framework is running, if we want to set app icons or add startup images to our application, then we must use platform specific assets.

#### set app icon

Updating the Flutter app launch icon is done in the same way as updating the launch icon in a native Android or iOS app.

- Android

  In the root directory of the Flutter project, navigate to `... /android/app/src/main/res` directory, which contains various resource folders (e.g. `mipmap-hdpi` already contains the placeholder image "ic_launcher.png", see Figure 2-8). Just follow the instructions in the [Android Developer's Guide](https://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher.html#size) to replace them with the required resources, and observe recommended icon size standards for each screen density (dpi).

  ! [Figure 2-8](https://pcdn.flutterchina.club/imgs/2-8.png)

  > **Note:** If you rename the .png file, the name must also be updated in the `android:icon` attribute of the `<application>` tag of your `AndroidManifest.xml`.

- iOS

  In the root directory of your Flutter project, navigate to `... /ios/Runner`. The directory `Assets.xcassets/AppIcon.appiconset` already contains placeholder images (see Figure 2-9), just replace them with appropriately sized images, keeping the original file names.

  ! [Figure 2-9](https://pcdn.flutterchina.club/imgs/2-9.png)

#### Update startup page

! [Figure 2-10](https://pcdn.flutterchina.club/imgs/2-10.png)

When the Flutter framework is loaded, Flutter draws the startup page using the native platform mechanism. This startup page will last until the first frame of the application is rendered by Flutter.

> **Note:** This means that if you don't call the [runApp](https://docs.flutter.io/flutter/widgets/runApp.html) function in the application's `main()` method (or more specifically, if you don't call [`window.render`] (<https://docs.flutter.io/flutter/dart-ui/Window/render.html>) to respond to [`window.onDrawFrame`](https://docs.flutter.io/flutter/dart-ui/) Window/onDrawFrame.html)), the start screen will always be displayed.

##### Android

To add the splash screen to your Flutter application, navigate to `... /android/app/src/main`. In `res/drawable/launch_background.xml`, customize the launch screen with a custom drawable (you can also just change an image).

##### iOS

To add an image to the center of the launch screen (splash screen), navigate to `... /ios/Runner`. In `Assets.xcassets/LaunchImage.imageset`, drag in the image and name it `LaunchImage.png`, `LaunchImage@2x.png`, `LaunchImage@3x.png`. If you use a different file name, then you must also update the `Contents.json` file in the same directory, and check Apple's official standards for the exact size of the image.

You can also fully customize the storyboard by opening Xcode, navigating to `Runner/Runner` in Project Navigator and dragging in images by opening `Assets.xcassets`, or by using the Interface Builder for customization, as shown in Figure 2-11.

! [Figure 2-11](https://pcdn.flutterchina.club/imgs/2-11.png)
