# Débogage des applications Flutter

### Analyseurs de fléchettes

Avant d'exécuter votre application, exécutez `flutter analyze` pour tester votre code. Cet outil est un outil de vérification de code statique qui enveloppe l'outil `dartanalyzer` et est principalement utilisé pour analyser le code et aider les développeurs à trouver d'éventuelles erreurs. Par exemple, l'analyseur Dart fait un usage intensif des annotations de type dans le code pour aider à détecter les problèmes et éviter `var`, les paramètres non typés, le texte de liste non typé, etc.

Si vous utilisez le plugin Flutter pour IntelliJ, l'analyseur est automatiquement activé lorsque vous ouvrez l'IDE. Si le lecteur utilise un autre IDE, il est fortement recommandé que le lecteur active l'analyseur Dart car la plupart du temps, l'analyseur Dart peut trouver la plupart des problèmes avant l'exécution du code.

### Dart Observatory (débogueur et analyseur en une seule étape au niveau de l'instruction)

Si nous démarrons l'application en utilisant `flutter run`, alors lorsqu'elle s'exécute, nous pouvons ouvrir la page Web de l'outil Observatoire, par exemple Observatoire écoute <http://127.0.0.1:8100/> par défaut et peut ouvrir le lien directement dans le navigateur. Connectez-vous directement à votre application à l'aide du débogueur en une seule étape au niveau de l'instruction. Si vous utilisez IntelliJ, vous pouvez également utiliser son débogueur intégré pour déboguer votre application.

Observatory prend également en charge l'analyse, la vérification du tas, etc. Pour plus d'informations sur l'Observatoire, reportez-vous à la documentation [Observatoire](https://dart-lang.github.io/observatory/).

Si vous utilisez Observatory pour l'analyse, veillez à exécuter la commande `flutter run` avec l'option `-profile` pour exécuter l'application. Sinon, le problème principal qui apparaîtra dans le profil sera le débogage des assertions pour vérifier les différents invariants du framework (voir "Debugging Mode Assertions" ci-dessous).

### `débogueur()` déclaration

Cette instruction `debugger()` peut être utilisée pour insérer des points d'arrêt programmatiques lors de l'utilisation de Dart Observatory (ou d'un autre débogueur Dart, tel que le débogueur de l'IDE IntelliJ). Pour l'utiliser, vous devez ajouter `import 'dart:developer' ;` en haut du fichier concerné.

L'instruction `debugger()` prend une référence facultative `when`.

paramètre, vous pouvez spécifier que le paramètre ne sera interrompu que lorsqu'une condition spécifique est vraie, comme suit.

```dart
void someFunction(double offset) {
  debugger(when: offset > 30.0);
  // ...
}
```

### `print`、`debugPrint`、`flutter logs`

La fonction Dart `print()` sortira sur la console système et vous pouvez utiliser `journaux de flutter` pour l'afficher (essentiellement un wrapper `adb logcat`).

Si vous produisez trop à la fois, Android supprimera parfois certaines lignes de journal. Pour éviter cela, vous pouvez utiliser [`debugPrint()`](https://docs.flutter.io/flutter/foundation/debugPrint.html) de la bibliothèque `foundation` de Flutter. Il s'agit d'une impression wrapper qui limite la sortie à un niveau qui évite d'être abandonné par le noyau Android.

De nombreuses classes du framework Flutter ont des implémentations `toString`. Par convention, cette sortie inclut généralement la sortie monoligne `runtimeType` de l'objet, généralement sous la forme ClassName (plus d'informations sur cette instance...). Certaines classes utilisées dans l'arborescence ont également `toStringDeep`, qui renvoie une description multiligne de l'ensemble de la sous-arborescence à partir de ce point. Déjà certaines classes avec des informations détaillées `toString` implémenteront un `toStringShort` qui retourne uniquement le type de l'objet ou une autre description très courte (un ou deux mots).

### Assertions en mode débogage

Pendant le débogage de l'application Flutter, l'instruction Dart `assert` est activée et utilisée par le framework Flutter pour effectuer un certain nombre de vérifications d'exécution afin de vérifier qu'une règle immuable n'est pas violée.

Lorsqu'une règle immuable est violée, elle est signalée à la console avec des informations contextuelles pour aider à rechercher la cause première du problème.

Pour désactiver le mode débogage et utiliser le mode release, exécutez votre application avec `flutter run --release`. Cela désactive également le débogueur de l'Observatoire. Un mode intermédiaire qui désactive toutes les aides au débogage à l'exception de l'Observatoire est appelé `-profile mode`, il suffit de remplacer `-release` par `-profile`.

### Débogage des couches d'application

Chaque couche du framework Flutter offre la possibilité de vider (vider) son état actuel ou ses événements sur la console (à l'aide de `-debugPrint`).

#### Arborescence des widgets

Pour vider l'état de l'arborescence Widgets, appelez [`debugDumpApp()`](https://docs.flutter.io/flutter/widgets/debugDumpApp.html). Vous pouvez appeler cette méthode (après avoir appelé `runApp()`) à tout moment lorsque l'application n'est pas en phase de construction (c'est-à-dire qu'elle n'est pas appelée dans la méthode `build()` ), tant que l'application a été construite à moins une fois (c'est-à-dire à tout moment après avoir appelé `build()`).

Par exemple, cette application :

```dart
import 'package:flutter/matériel.dart' ;

void main() {
  runApp(
    new MaterialApp(
      home: new AppHome(),
    ),
  );
}

class AppHome étend StatelessWidget {
  @override
  Widget build (contexte BuildContext) {
    return new Material(
      enfant : new Center(
        enfant : new FlatButton(
          onPressed : () {
            debugDumpApp();
          },
          enfant : nouveau texte ('Dump App'),
        ),
      ),
    );
  }
}
```

... affichera quelque chose comme ceci (les détails exacts varieront en fonction de la version du framework, de la taille de l'appareil, etc.).

```shell
I/flutter ( 6559) : WidgetsFlutterBinding - CHECKED MODE
I/flutter ( 6559) : RenderObjectToWidgetAdapter<RenderBox>([GlobalObjectKey RenderView(497039273)] ; renderObject : RenderView)
I/flutter ( 6559) : └MaterialApp(state : _MaterialAppState(1009803148 ))
I/flutter ( 6559) : └ScrollConfiguration()
I/flutter ( 6559) : └AnimatedTheme(durée : 200 ms ; état : _AnimatedThemeState(543295893 ; ticker inactif ; ThemeDataTween(ThemeData(Brightness.light Color(0xff2196f3) etc. ...) → null)))
I/scintillement ( 6559): └Theme(ThemeData(Brightness.light Color(0xff2196f3) etc...))
I/scintillement ( 6559) : └WidgetsApp([GlobalObjectKey _MaterialAppState(1009803148)] ; état : _WidgetsAppState(552902158))
I/scintillement ( 6559) : └CheckedModeBanner()
I/scintillement ( 6559) : └Banner()
I/flutter ( 6559) : └CustomPaint(renderObject : RenderCustomPaint)
I/flutter ( 6559) : └DefaultTextStyle(inherit : true ; color : Color(0xd0ff0000) ; family : "monospace" ; size : 48.0 ; weight : 900 ; décoration : double Color(0xffffff00) TextDecoration.underline)
I/flutter ( 6559) : └MediaQuery(MediaQueryData(size : Size(411.4, 683.4), devicePixelRatio : 2.625, textScaleFactor : 1.0, padding : EdgeInsets(0.0, 24.0, 0.0 , 0.0)))
I/scintillement ( 6559) : └LocaleQuery(null)
I/scintillement ( 6559) : └Titre(couleur : Couleur(0xff2196f3))
... 
```

Il s'agit d'un arbre "plat" montrant tous les widgets projetés par les différentes fonctions de construction (si vous appelez `toStringDeepwidget` à la racine de l'arbre des widgets, c'est l'arbre que vous obtenez). Vous verrez de nombreux widgets qui n'apparaissent pas dans le code source de votre application car ils ont été insérés par la fonction `build()` du widget dans le framework. Par exemple, [`InkFeature`](https://docs.flutter.io/flutter/material/InkFeature-class.html) est un détail d'implémentation du widget Material .

Lorsque debugDumpApp() est appelé lorsque le bouton passe d'être enfoncé à relâché, l'objet FlatButton appelle également `setState()` et se marque comme `dirty`. C'est pourquoi si vous regardez le dump, vous verrez des objets spécifiques marqués comme "sales". Vous pouvez également voir quels auditeurs de gestes ont été enregistrés ; dans ce cas, un seul GestureDetector est listé et écoute le geste "tap" ("tap" vaut `TapGestureDetector`s `toStringShort` sorties de fonction)

Si vous écrivez votre propre widget, vous pouvez ajouter des informations en remplaçant [`debugFillProperties()`](https://docs.flutter.io/flutter/widgets/Widget/debugFillProperties.html). Prenez l'objet [DiagnosticsProperty](https://docs.flutter.io/flutter/foundation/DiagnosticsProperty-class.html) comme paramètre de méthode et appelez la méthode de la classe parente. Cette fonction est utilisée par cette méthode `toString` pour remplir les informations de description du widget.

#### Arbre de rendu

Si vous essayez de déboguer des problèmes de mise en page, l'arborescence des widgets peut ne pas être suffisamment détaillée. Dans ce cas, vous pouvez vider l'arborescence de rendu en appelant `debugDumpRenderTree()`. Comme avec `debugDumpApp()`, vous pouvez appeler cette fonction à tout moment autre que pendant la phase de mise en page ou de dessin. En règle générale, l'appeler depuis le callback [frame](https://docs.flutter.io/flutter/scheduler/SchedulerBinding/addPersistentFrameCallback.html) ou depuis un gestionnaire d'événements est la meilleure solution.

Pour appeler `debugDumpRenderTree()`, vous devez ajouter `import'package:flutter/rendering.dart';` à votre fichier source.

La sortie du petit exemple ci-dessus est illustrée ci-dessous.

```shell
I/flutter ( 6559) : RenderView
I/flutter ( 6559) : │ mode débogage activé - android
I/flutter ( 6559) : │ taille de la fenêtre : Size(1080.0, 1794.0) (en pixels physiques)
I/flutter ( 6559) : │ ratio de pixels de l'appareil : 2,625 (pixels physiques par pixel logique)
I/scintillement ( 6559) : │ configuration : Taille(411,4, 683,4) à 2,625x (en pixels logiques)
I/scintillement ( 6559) : │
I/flutter ( 6559) : └─enfant : RenderCustomPaint
I/flutter ( 6559) : │ créateur : CustomPaint ← Banner ← CheckedModeBanner ←
I/flutter ( 6559) : │ WidgetsApp-[GlobalObjectKey _MaterialAppState(1009803148)] ←
I/flutter ( 6559) : │ Thème ← AnimatedTheme ← ScrollConfiguration ← MaterialApp ←
I/flutter ( 6559) : │   [root]
I/flutter ( 6559) : │ parentData : <none>
I/flutter ( 6559) : │ contraintes : BoxConstraints (w=411.4, h=683.4)
I/flottement ( 6559): │ size: Size(411.4, 683.4)
... 
```

Il s'agit de la sortie de la fonction `toStringDeep` de l'objet racine `RenderObject`.

Lors du débogage des problèmes de mise en page, les principaux éléments à examiner sont les champs `taille` et `contraintes`. Les contraintes sont transmises dans l'arborescence et les tailles sont transmises vers le haut.

Si vous écrivez vos propres objets de rendu, vous pouvez ajouter les informations au vidage en remplaçant [`debugFillProperties()`](https://docs.flutter.io/flutter/rendering/Layer/debugFillProperties.html). Prenez l'objet [DiagnosticsProperty](https://docs.flutter.io/flutter/foundation/DiagnosticsProperty-class.html) comme paramètre de la méthode et appelez la méthode parent.

#### Arborescence des couches

Le lecteur peut comprendre que l'arbre de rendu peut être en couches et que le dessin final nécessite la composition de différentes couches, tandis que Layer est la couche à composer lors du dessin. Si vous essayez de déboguer le problème de composition, vous pouvez utiliser [`debugDumpLayerTree()`](<https://docs.flutter.io/flutter/> rendering/debugDumpLayerTree.html). Pour l'exemple ci-dessus, il sortirait.

```
I/flutter : TransformLayer
I/flutter : │ créateur : [root]
I/flutter : │ offset : Offset(0.0, 0.0)
I/flutter : │ transform :
I/flutter : │   [0] 3.5,0.0,0.0,0.0
I/oscillation : │   [1] 0.0,3.5,0.0,0.0
I/oscillation : │   [2] 0.0,0.0,1.0,0.0
I/oscillation : │   [3] 0.0,0.0,0.0,1.0
I/oscillation : │
I / Flutter: ├─Child 1: OffseStlayer
I / Flutter: │ │ Créateur: Repeakboundary ← ← Focus- [Focus- [GlobalObjeKey MaterialPageroute (560156430)] ← _Blylkey 328026813] ← ← Globalkey 388965355] ← ← ← pile ← Superposition-[GlobalKey 625702218] ← Navigateur-[GlobalObjectKey _MaterialAppState(859106034)] ← Titre ← ⋯
I/scintillement : │ │ offset : Offset(0.0, 0.0)
I/scintillement : │ │
I/scintillement : │ └ enfant 1 : PictureLayer
I/scintillement : │
I/scintillement : └─enfant 2 : PictureLayer
```

Ceci est la sortie du `toStringDeep` de la racine `Layer`.

La transformation racine est une transformation qui applique un ratio de pixels de périphérique ; dans ce cas, chaque pixel logique représente 3,5 pixels de périphérique.

Le widget `RepaintBoundary` crée un `RenderRepaintBoundary` dans la couche de l'arborescence de rendu. Ceci est utilisé pour réduire la quantité de peinture nécessaire.

### Sémantique

Vous pouvez également appeler [`debugDumpSemanticsTree()`](https://docs.flutter.io/flutter/rendering/debugDumpSemanticsTree.html) pour obtenir un vidage de l'arbre sémantique (l'arbre présenté à l'API d'accessibilité du système). Pour utiliser cette fonction, vous devez d'abord activer les fonctions d'assistance, telles que l'activation de l'assistance système ou `SemanticsDebugger` (voir ci-dessous).

Pour l'exemple ci-dessus, il affichera :

```
I/scintillement : SemanticsNode(0; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4))
I/scintillement : ├SemanticsNode(1; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4))
I/scintillement : │ └SemanticsNode(2; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4); canBeTapped)
I/flutter : └SemanticsNode(3; Rect.fromLTRB(0.0, 0.0, 411.4, 683.4))
I/flutter : └SemanticsNode (4; Rect.fromLTRB(0.0, 0.0, 82.0, 36.0); canBeTapped; "Dump App")
```

### Planification

Pour savoir où les événements de début/fin se produisent par rapport au cadre, vous pouvez basculer les valeurs booléennes [`debugPrintBeginFrameBanner`](https://docs.flutter.io/flutter/scheduler/debugPrintBeginFrameBanner.html) et [`debugPrintEndFrameBanner`](https://docs.flutter.io/flutter/scheduler/debugPrintEndFrameBanner.html) pour imprimer le début et la fin du cadre sur la console.

Exemple:

```
I/flottement : ▄▄▄▄▄▄▄▄ Image 12 30s 437.086ms ▄▄▄▄▄▄▄▄
I/flottement : Debug print : Est-ce que j'effectue ce travail plus d'une fois par image ?
I/flutter : Impression de débogage : Est-ce que j'effectue ce travail plus d'une fois par image ?
Je/scintillement : ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ ▀▀▀▀▀▀
```

[`debugPrintScheduleFrameStacks`](https://docs.flutter.io/flutter/scheduler/debugPrintScheduleFrameStacks.html)Il peut également être utilisé pour imprimer la pile d'appels qui a provoqué la distribution de la trame actuelle.

### Débogage visuel

Vous pouvez également déboguer visuellement les problèmes de mise en page en définissant `debugPaintSizeEnabled` sur `true`. Il s'agit d'une valeur booléenne de la bibliothèque `de rendu`. Il peut être activé à tout moment et affecte le dessin lorsqu'il est vrai. Le moyen le plus simple de le définir est de le définir en haut de `void main()`.

Lorsqu'il est activé, toutes les cases ont une bordure cyan foncée brillante, le rembourrage (de widgets comme Padding) est affiché en bleu clair, les widgets enfants ont une boîte bleu foncé autour d'eux et l'alignement (de widgets comme Center et Align) est affiché comme une flèche jaune. Vide (par exemple Conteneur sans aucun nœud enfant) est affiché en gris.

[`debugPaintBaselinesEnabled`](https://docs.flutter.io/flutter/rendering/debugPaintBaselinesEnabled.html) fait quelque chose de similaire, mais pour les objets avec des lignes de base, la ligne de base du texte est affichée en vert et les lignes de base idéographiques sont affichées en orange.

Le drapeau [`debugPaintPointersEnabled`](https://docs.flutter.io/flutter/rendering/debugPaintPointersEnabled.html) active un mode spécial où tout objet sur lequel on clique est mis en surbrillance en cyan foncé. Cela peut vous aider à déterminer si un objet est testé de manière incorrecte (Flutter détecte si l'emplacement cliqué a un widget qui répond aux actions de l'utilisateur), par exemple, s'il est réellement hors de portée de son élément parent, il ne sera pas considéré pour le test de réussite en premier lieu.

Si vous essayez de déboguer un calque composite, par exemple pour déterminer si et où ajouter un widget `RepaintBoundary` , vous pouvez utiliser l'indicateur [`debugPaintLayerBordersEnabled`](https://docs.flutter.io/flutter/rendering) /debugPaintLayerBordersEnabled.html), qui marque les bordures de chaque calque avec une couleur orange ou la ligne délimitée, ou utilisez l'indicateur [`debugRepaintRainbowEnabled`](https://docs.flutter.io/flutter/rending/debugRepaintRainbowEnabled.html) chaque fois qu'ils se redessinent, ce qui entraîne la couverture du calque par un ensemble de couleurs en rotation.

Tous ces drapeaux ne fonctionnent qu'en mode débogage. Normalement, tout ce qui dans le framework Flutter commence par ``debug... `" ne fonctionnera qu'en mode débogage.

### Animations de débogage

Le moyen le plus simple de déboguer les animations est de les ralentir. Pour ce faire, définissez la variable [`timeDilation`](https://docs.flutter.io/flutter/scheduler/timeDilation.html) (dans la bibliothèque du planificateur) sur un nombre supérieur à 1,0, par exemple 50,0. Il est préférable de ne le définir qu'une seule fois lorsque l'application démarre une fois. Si vous le modifiez à la volée, et surtout si vous modifiez sa valeur à une valeur plus petite pendant que l'animation est en cours d'exécution, vous pouvez obtenir des régressions sur l'observation, ce qui peut entraîner des succès d'assertion, et cela interfère généralement avec nos efforts de développement.

### Débogage des problèmes de performances

Pour comprendre ce qui cause la re-mise en page ou le re-dessin de votre application, vous pouvez définir [`debugPrintMarkNeedsLayoutStacks`](https://docs.flutter.io/flutter/rendering/) séparément debugPrintMarkNeedsLayoutStacks.html) et [`debugPrintMarkNeedsPaintStacks`](https://docs.flutter.io/flutter/rendering/ debugPrintMarkNeedsPaintStacks .html). Ceux-ci enregistrent la trace de la pile dans la console chaque fois que la boîte de rendu est invitée à re-mise en page et à repeindre. Si cette méthode fonctionne pour vous, vous pouvez utiliser la méthode `debugPrintStack()` dans la bibliothèque `services` pour imprimer la trace de la pile à la demande.

### Temps de démarrage de l'application statistique

Pour recueillir des informations détaillées sur le temps nécessaire au démarrage d'une application Flutter, vous pouvez utiliser les options `trace-startup` et `profile` lors de l'exécution de `flutter run`.

```shell
exécution flottante --trace-startup --profile
```

La sortie de trace est enregistrée sous `start_up_info.json` dans le répertoire du projet Flutter sous le répertoire de construction. La sortie répertorie le temps passé entre le démarrage de l'application et ces événements de trace (capturés en microsecondes).

- En entrant dans le moteur Flutter.
- Lors de l'affichage de la première image de l'application.
- Lors de l'initialisation du framework Flutter.
- Lorsque vous avez terminé l'initialisation du framework Flutter.

Comme :

```json
{
  "engineEnterTimestampMicros": 96025565262,
  "timeToFirstFrameMicros": 2171978,
  "timeToFrameworkInitMicros": 514585,
  "timeAfterFrameworkInitMicros": 1657393
}
```

### Suivi des performances du code Dart

Pour effectuer une trace de performance personnalisée et mesurer le temps mur/CPU de n'importe quel segment de code de Dart (similaire à l'utilisation de [systrace](https://developer.android.com/studio/profile/systrace.html) sur Android) Utilisez l'outil `dart:developer`s [Timeline](https://api.dartlang.org/stable/dart-developer/Timeline-class.html) pour inclure le bloc de code que vous souhaitez tester , par exemple

```dart
Timeline.startSync('fonction intéressante');
// iWonderHowLongThisTakes();
Chronologie.finishSync();
```

Ouvrez ensuite la page de chronologie de l'Observatoire de votre application, cochez la case "Dart" dans "Flux enregistrés" et exécutez la fonction que vous souhaitez mesurer.

L'actualisation de la page affichera les enregistrements de la chronologie de l'application dans l'ordre chronologique dans les [outils de suivi de Chrome](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool).

Assurez-vous d'exécuter `flutter run` avec l'indicateur `-profile` pour vous assurer que les caractéristiques de performance d'exécution sont minimalement différentes de votre produit final.