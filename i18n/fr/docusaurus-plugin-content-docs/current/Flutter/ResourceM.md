# La gestion des ressources

Le programme d'installation de Flutter APP contiendra à la fois du code et des actifs (ressources). les actifs sont intégrés au programme d'installation de l'application et sont accessibles lors de l'exécution. Les types courants d'actifs incluent les données statiques (par exemple, les fichiers JSON), les fichiers de configuration, les icônes et les images (JPEG, WebP, GIF, WebP/GIF animé, PNG, BMP et WBMP), etc.

## Spécification des actifs

Comme la gestion des packages, Flutter utilise le fichier [`pubspec.yaml`](https://www.dartlang.org/tools/pub/pubspec) pour gérer les ressources nécessaires à l'application, par exemple :

```yaml
flutter :
  actifs :
    - actifs/mon_icône.png
    - actifs/fond.png
```

`actifs` spécifie les fichiers qui doivent être inclus dans l'application, et chaque actif identifie son propre chemin par le chemin du système de fichiers relatif à l'emplacement du fichier `pubspec.yaml`. L'ordre dans lequel les actifs sont déclarés n'a pas d'importance et le répertoire réel des actifs peut être n'importe quel dossier (dans ce cas, le dossier assets).

Pendant la construction, Flutter place les ressources dans des archives spéciales appelées *bundles de ressources*, qui peuvent être lues (mais pas modifiées) par l'application au moment de l'exécution.

## Variantes d'actifs

Le processus de génération prend en charge le concept de "variantes d'actifs" : différentes versions d'un actif peuvent être affichées dans différents contextes. Lors de la spécification d'un chemin d'asset dans la section assets de `pubspec.yaml`, le processus de génération recherche tous les fichiers portant le même nom dans les sous-répertoires adjacents. Ces fichiers sont ensuite inclus dans le groupe d'actifs avec l'actif spécifié.

Par exemple, si le répertoire de l'application contient les fichiers suivants :

- .../pubspec.yaml
- .../graphics/mon_icone.png
- .../graphiques/fond.png
- .../graphiques/sombres/fond.png
- ...etc.

Alors le fichier `pubspec.yaml` ne doit contenir que :

```
flottement :
  actifs :
    - graphiques/fond.png
```

Ensuite, `graphics/background.png` et `graphics/dark/background.png` seront inclus dans votre ensemble de ressources. Le premier est considéré comme l'actif *principal* et le second est considéré comme une variante.

Flutter utilise des variantes d'actifs lors de la sélection d'images qui correspondent à la résolution actuelle de l'appareil (voir ci-dessous), et à l'avenir, Flutter peut étendre ce mécanisme à la localisation, aux conseils de lecture, etc.

## Chargement des ressources

Votre application peut accéder à ses assets via l'objet [`AssetBundle`](https://docs.flutter.io/flutter/services/AssetBundle-class.html). Il existe deux méthodes principales qui permettent de charger des fichiers de chaîne ou d'image (binaires) à partir du bundle Asset.

### Chargement des ressources textuelles

- Chargement via l'objet [`rootBundle`](https://docs.flutter.io/flutter/services/rootBundle.html) : Chaque application Flutter possède un [`rootBundle`](<https://docs>. flutter.io/flutter/services/rootBundle.html), grâce auquel vous pouvez facilement accéder au package de ressources principal et charger l'actif directement à l'aide de l'objet statique global `rootBundle` dans `package:flutter/services.dart`.
- Chargement via [`DefaultAssetBundle`](https://docs.flutter.io/flutter/widgets/DefaultAssetBundle-class.html): Il est recommandé d'utiliser [`DefaultAssetBundle`](https://docs.flutter.io/flutter/widgets/DefaultAssetBundle-class.html) pour obtenir l'AssetBundle pour le BuildContext actuel. Au lieu d'utiliser le groupe d'actifs par défaut construit par l'application, cette méthode crée un AssetBundle différent que le widget parent remplace dynamiquement au moment de l'exécution, ce qui est utile pour la localisation ou les scénarios de test.

En règle générale, les actifs (par exemple, les fichiers JSON) peuvent être chargés indirectement lors de l'exécution de l'application à l'aide de ``DefaultAssetBundle.of()`'', alors qu'ils peuvent être chargés directement à l'aide de``rootBundle`'' en dehors du contexte du widget, ou lorsque d'autres ``AssetBundle Les poignées`' ne sont pas disponibles, par exemple

```dart
importer 'dart:async' show Future ;
import 'package:flutter/services.dart' show rootBundle ;

Future<String> loadAsset() async {
  return wait rootBundle.loadString('assets/config.json');
}
```

### Chargement des images

Semblable au développement natif, Flutter peut charger des images pour l'appareil actuel à une résolution appropriée.

#### déclare les actifs d'images dépendant de la résolution

[`AssetImage`](https://docs.flutter.io/flutter/painting/AssetImage-class.html) peut logiquement mapper la demande d'un élément à l'élément le plus proche du ratio de pixels (dpi) de l'appareil actuel. Pour que ce mappage fonctionne, il doit enregistrer l'actif selon une structure de répertoire spécifique.

- .../image.png
- .../*M**x/image.png
- .../*N**x/image.png
- ...etc.

où M et N sont des identificateurs numériques qui correspondent à la résolution des images qu'ils contiennent, c'est-à-dire qu'ils spécifient des images de différents rapports de pixels de dispositif.

La ressource principale correspond par défaut à une image de résolution 1.0x. Regardez un exemple.

- .../mon_icone.png
- .../2.0x/mon_icone.png
- .../3.0x/mon_icone.png

Sur les appareils avec un ratio de pixels d'appareil de 1,8, `... /2.0x/my_icon.png` sera sélectionné. Pour un ratio de pixels de l'appareil de 2,7, `... /3.0x/my_icon.png` sera sélectionné.

Si la largeur et la hauteur de l'image rendue ne sont pas spécifiées sur le widget `Image` , alors le widget `Image` occupera la même taille d'espace d'écran que la ressource principale. Autrement dit, si `... /my_icon.png` est de 72 pixels sur 72 pixels, alors `... /3.0x/my_icon.png` doit être de 216 pixels sur 216 pixels ; mais si la largeur et la hauteur ne sont pas spécifiées, elles seront toutes les deux rendues en 72 pixels par 72 pixels (en pixels logiques).

Chaque élément de la section asset de `pubspec.yaml` doit correspondre au fichier réel, à l'exception de l'élément de ressource principal. Lorsqu'une ressource manque à la ressource principale, elle sera sélectionnée par ordre décroissant de résolution, c'est-à-dire que si elle n'est pas en 1x, elle sera trouvée en 2x, et si elle n'est pas en 2x, elle sera trouvée en 3x.

#### Chargement des images

Pour charger une image, vous pouvez utiliser la classe [`AssetImage`](https://docs.flutter.io/flutter/painting/AssetImage-class.html). Par exemple, nous pouvons charger une image de fond à partir de la déclaration d'actif ci-dessus.

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

Notez que `AssetImage` n'est pas un widget, c'est en fait un `ImageProvider`, et il y a des moments où vous pourriez vous attendre à obtenir un widget qui affiche une image directement, alors vous pouvez utiliser la méthode `Image.asset()` , par exemple

```dart
Widget build (contexte BuildContext) {
  return Image.asset ('graphics/background.png');
}
```

Lors du chargement de ressources à l'aide du groupe d'actifs par défaut, la résolution, etc. est automatiquement gérée en interne, et cette gestion n'est pas perceptible pour le développeur. (Si vous utilisez des classes de niveau inférieur comme [`ImageStream`](https://docs.flutter.io/flutter/painting/ImageStream-class.html) ou [`ImageCache`](<https://docs>. flutter.io/flutter/painting/ImageCache-class.html) vous remarquerez qu'il existe des paramètres liés à la mise à l'échelle)

#### Images de ressources dans les packages de dépendance

Pour charger une image à partir d'un package de dépendances, vous devez donner à `AssetImage` le paramètre `package`.

Par exemple, supposons que votre application dépende d'un package nommé "my_icons" avec la structure de répertoires suivante.

- .../pubspec.yaml
- .../icons/coeur.png
- .../icons/1.5x/coeur.png
- .../icons/2.0x/coeur.png
- ...etc.

Chargez ensuite l'image en utilisant :

```dart
 new AssetImage('icons/heart.png', package: 'my_icons')
```

ou

```dart
new Image.asset('icons/heart.png', package: 'my_icons')
```

**Remarque : le package doit également être obtenu en ajoutant le paramètre `package` lors de l'utilisation de ses propres ressources**.

##### frappe les actifs dans le package

Si une ressource attendue est déclarée dans le fichier `pubspec.yaml` , elle sera compressée dans le package correspondant. En particulier, les ressources utilisées par le package lui-même doivent être spécifiées dans `pubspec.yaml`.

Les packages peuvent également choisir d'inclure dans leurs dossiers `lib/` des ressources qui ne sont pas déclarées dans leurs `fichiers pubspec.yaml`. Dans ce cas, pour que les images soient empaquetées, l'application doit spécifier dans `pubspec.yaml` quelles images inclure. Par exemple, un package nommé `fancy_backgrounds` peut contenir les fichiers suivants.

- .../lib/backgrounds/background1.png
- .../lib/backgrounds/background2.png
- .../lib/backgrounds/background3.png

Pour inclure la première image, elle doit être déclarée dans la section assets de `pubspec.yaml` comme

```
flutter :
  actifs :
    - packages/fancy_backgrounds/backgrounds/background1.png
```

`lib/` est implicite, il ne doit donc pas être inclus dans le chemin de l'actif.

### Actifs spécifiques à la plateforme

Les ressources ci-dessus sont toutes dans l'application Flutter, ces ressources ne peuvent être utilisées qu'après l'exécution du framework Flutter, si nous voulons définir des icônes d'application ou ajouter des images de démarrage à notre application, nous devons utiliser des actifs spécifiques à la plate-forme.

#### définir l'icône de l'application

La mise à jour de l'icône de lancement de l'application Flutter s'effectue de la même manière que la mise à jour de l'icône de lancement dans une application Android ou iOS native.

- Android

  Dans le répertoire racine du projet Flutter, accédez au répertoire `... /android/app/src/main/res` , qui contient divers dossiers de ressources (par exemple `mipmap-hdpi` contient déjà l'image d'espace réservé "ic_launcher.png" , voir Figure 2-8). Suivez simplement les instructions du Guide du développeur [Android](https://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher.html#size) pour les remplacer par les ressources requises et respectez les normes de taille d'icône recommandées pour chaque densité d'écran (dpi).

  ! [Illustration 2-8](https://pcdn.flutterchina.club/imgs/2-8.png)

  > **Remarque :** Si vous renommez le fichier .png, le nom doit également être mis à jour dans l'attribut `android:icon` de la balise `<application>` de votre `AndroidManifest.xml`.

- iOS

  Dans le répertoire racine de votre projet Flutter, accédez à `... /ios/Runner`. Le répertoire `Assets.xcassets/AppIcon.appiconset` contient déjà des images d'espace réservé (voir Figure 2-9), remplacez-les simplement par des images de taille appropriée, en conservant les noms de fichiers d'origine.

  ! [Illustration 2-9](https://pcdn.flutterchina.club/imgs/2-9.png)

#### Mettre à jour la page de démarrage

! [Figure 2-10](https://pcdn.flutterchina.club/imgs/2-10.png)

Lorsque le framework Flutter est chargé, Flutter dessine la page de démarrage à l'aide du mécanisme de la plate-forme native. Cette page de démarrage durera jusqu'à ce que la première image de l'application soit rendue par Flutter.

> **Remarque :** Cela signifie que si vous n'appelez pas la fonction [runApp](https://docs.flutter.io/flutter/widgets/runApp.html) dans la méthode `main()` de l'application (ou plus précisément, si vous n'appelez pas [`window.render`] ([https:/ /docs.flutter.io/flutter/dart-ui/Window/render.html](https://docs.flutter.io/flutter/dart-ui/Window/render.html)) pour répondre à [`window.onDrawFrame`](https://docs.flutter.io/flutter/dart-ui/) Window/onDrawFrame.html)), l'écran de démarrage sera toujours affiché.

##### Android

Pour ajouter l'écran de démarrage à votre application Flutter, accédez à `... /android/app/src/main`. Dans `res/drawable/launch_background.xml`, personnalisez l'écran de lancement avec un drawable personnalisé (vous pouvez aussi simplement changer une image).

##### iOS

Pour ajouter une image au centre de l'écran de lancement (écran de démarrage), accédez à `... /ios/Runner`. Dans `Assets.xcassets/LaunchImage.imageset`, faites glisser l'image et nommez-la `LaunchImage.png`, `LaunchImage@2x.png`, `LaunchImage@3x.png`. Si vous utilisez un nom de fichier différent, vous devez également mettre à jour le fichier `Contents.json` dans le même répertoire et vérifier les normes officielles d'Apple pour connaître la taille exacte de l'image.

Vous pouvez également personnaliser entièrement le storyboard en ouvrant Xcode, en accédant à `Runner/Runner` dans Project Navigator et en faisant glisser des images en ouvrant `Assets.xcassets`, ou en utilisant Interface Builder pour la personnalisation, comme illustré à la Figure 2-11.

! [Illustration 2-11](https://pcdn.flutterchina.club/imgs/2-11.png)
