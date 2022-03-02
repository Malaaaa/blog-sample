## Structure du code flottant

## Cadre de base

1. Importer des packages.

   ```dart
   import 'package:flutter/matériel.dart' ;
   ```

   Cette ligne de code agit comme une importation de la bibliothèque de composants Material UI. [Material](https://material.io/guidelines) est un langage de conception visuel standard pour mobile et Web, et Flutter fournit par défaut un riche ensemble de composants d'interface utilisateur de style Material. 2.

2. portail d'applications.

   ```dart
   void main() => runApp(MyApp());
   ```

    - Similaire à C/C++, Java, la fonction `main` dans l'application Flutter est le point d'entrée de l'application. La fonction `main` appelle la méthode `runApp` , dont la fonction est de démarrer l'application Flutter. `runApp` prend un paramètre `Widget` , qui dans ce cas est un objet `MyApp` , et `MyApp()` est le composant racine de l'application Flutter.
    - La fonction `main` utilise la notation (`=>`), qui est un raccourci pour une fonction ou une méthode à une ligne dans Dart.

3. Structuration des candidatures.

   ```dart
   class MyApp étend StatelessWidget {
     @override
     Widget build (contexte BuildContext) {
       return new MaterialApp(
         //nom de l'application  
         titre : 'Flutter Demo', 
         thème : new ThemeData(
           //thème bleu  
           primarySwatch : couleurs. blue,
         ),
         //route de la page d'accueil de l'application  
         home: new MyHomePage(title: 'Flutter Demo Home Page'),
       );
     }
}
   ```

    - La classe `MyApp` représente une application Flutter qui hérite de la classe `StatelessWidget` , ce qui signifie que l'application elle-même est également un widget.

    - Dans Flutter, la plupart des choses sont des widgets (plus tard "composants" ou "widgets"), y compris l'alignement, le rembourrage, la mise en page, etc., qui sont tous fournis sous la forme de widgets.

    - Flutter appelle la méthode `build` d'un composant lors de la construction d'une page. Le travail principal d'un widget est de fournir une méthode build () pour décrire comment construire l'interface utilisateur (généralement en combinant et en assemblant d'autres widgets de base).

    - `MaterialApp` est le framework Flutter APP fourni dans la bibliothèque de matériaux, à travers lequel vous pouvez définir le nom, le thème, la langue, la page d'accueil et la liste de routage de l'application. `MaterialApp` est également un widget.

    - `home` est la page d'accueil de l'application Flutter, c'est aussi un widget.

## Composant de la page d'accueil

   ```dart
   class MyHomePage extend StatefulWidget {
     MyHomePage({Key key, this.title}) : super(key: key);
     titres de String final ;
     @override
     _MyHomePageState createState() => new _MyHomePageState();
   }

   classe _MyHomePageState étend l'état<MyHomePage> {
   }
   ```

`MyHomePage` est la page d'accueil de l'application Flutter, elle hérite de la classe `StatefulWidget` , ce qui signifie qu'il s'agit d'un **widget à état** (un composant à état). Pour l'instant, considérons brièvement qu'un widget avec état est différent d'un widget sans état de deux manières.

1. Les widgets avec état peuvent avoir des états modifiables pendant le cycle de vie du widget, tandis que les widgets sans état sont immuables.

2. Le widget avec état se compose d'au moins deux classes.
    - Une classe `StatefulWidget`.
    - Une classe `État`  ; la classe `StatefulWidget` elle-même est immuable, mais l'état détenu dans la classe `State` peut changer au cours du cycle de vie du widget.

   La classe `_MyHomePageState` est la classe d'état correspondant à la classe `MyHomePage`. Ici, le lecteur a peut-être remarqué : Contrairement à la classe `MyApp` , il n'y a pas de méthode `build` dans la classe `MyHomePage` , à la place, la méthode `build` a été déplacée vers la méthode `_MyHomePageState`.

### Classe d'état

Voyons ensuite ce que contient `_MyHomePageState`.

1. l'état du composant. Puisque nous n'avons besoin de maintenir qu'un compteur de clics, définissez un état `_counter`.

   ``dard int _counter = 0 ; // utilisé pour enregistrer le nombre total de clics sur le bouton
   ```

   `_counter` est l'état qui contient le nombre de clics sur le bouton avec un signe "+" dans le coin inférieur droit de l'écran.

2. Définissez la fonction d'auto-incrémentation pour l'état.

   ```dart
   void _incrementCounter() {
     setState(() {
        _counter++;
     });
}
   ```

   Cette fonction est appelée lorsque le bouton est cliqué. La fonction fonctionne en auto-incrémentant d'abord `_counter` puis en appelant la méthode `setState`. Le but de la méthode `setState` est de notifier au framework Flutter qu'un état a changé. Lorsque le framework Flutter reçoit la notification, il exécute la méthode `build` pour reconstruire l'interface en fonction du nouvel état. vous pouvez donc reconstruire tout ce qui doit être mis à jour sans avoir à modifier les widgets individuels.

3. Créer une interface utilisateur

   La logique de construction de l'interface utilisateur se trouve dans la méthode `build`. Lorsque `MyHomePage` est créé pour la première fois, la classe `_MyHomePageState` sera créée, et lorsque l'initialisation sera terminée, le framework Flutter appellera la méthode `build` du widget pour construire l'arborescence du widget, et enfin affichera le arborescence de widgets à l'écran de l'appareil. Voyons donc ce qui est fait dans la méthode `build` de `_MyHomePageState`.

   ```dart
     Widget build(BuildContext context) {
       return new Scaffold(
         appBar: new AppBar(
           title: new Text(widget.title),
         ),
         body: new Center(
           child: new Column(
             mainAxisAlignment: MainAxisAlignment.center ,
             enfants : <Widget>[
               new Text(
                 'Vous avez appuyé plusieurs fois sur le bouton :',
               ),
               new Text(
                 '$_counter',
                 style : Theme.of(context).textTheme.headline4,
               ),
             ],
           ),
         ),
         floatingActionButton : new FloatingActionButton(
           onPressed : _incrementCounter,
           tooltip : 'Increment',
           child : new Icon(Icons.add),
         ),
       );
}
   ```

    - `Scaffold` est un échafaudage de page fourni dans la bibliothèque de matériaux qui fournit une barre de navigation par défaut, un en-tête et une propriété `corps` contenant l'arborescence des widgets de l'écran principal (appelée plus tard "arborescence des composants" ou "arborescence des widgets") . Les arbres de composants peuvent être très complexes. Dans les exemples plus loin dans ce livre, les routes sont créées via `Scaffold` par défaut.
    - L'arborescence de composants de `corps` contient un composant `Center` et `Center` peut aligner ses arbres de composants enfants sur le centre de l'écran. Dans ce cas, le sous-composant `Centre` est un composant `Colonne` , et le rôle de `Colonne` est d'aligner tous ses sous-composants verticalement le long de l'écran ; dans ce cas, le sous-composant `Colonne` est composé de deux `Texte`s, et le premier `Texte` affiche le texte fixe "Vous avez appuyé sur le bouton plusieurs fois :", et le second `Texte` affiche la valeur du `_état du compteur`.
    - Le `flottantActionButton` est le bouton de survol avec `+` dans le coin inférieur droit de la page, sa propriété `onPressed` accepte une fonction de rappel qui représente son gestionnaire lorsqu'il est cliqué, dans ce cas, la méthode `_incrementCounter` est directement utilisée comme sa fonction de gestionnaire.

Maintenant, enchaînons l'intégralité du flux d'exécution du compteur : lorsque le bouton `floatingActionButton` dans le coin inférieur droit est cliqué, la méthode `_incrementCounter` est appelée. Dans la méthode `_incrementCounter` , d'abord le compteur `_counter` (état) sera auto-incrémenté, puis `setState` notifiera le framework Flutter que l'état a changé, puis le framework Flutter appellera la méthode `build` pour reconstruire l'interface utilisateur avec le nouvel état et enfin l'afficher sur l'écran de l'appareil.

#### Pourquoi mettre la méthode build dans State et non dans StatefulWidget ?

Maintenant, répondons à la question posée précédemment, pourquoi la méthode `build()` est-elle placée dans State (au lieu de `StatefulWidget`) ? Il s'agit principalement d'augmenter la flexibilité du développement. Si la méthode `build()` est placée dans le `StatefulWidget` , il y a deux problèmes.

- Accès à l'État peu pratique

  Imaginez si notre `StatefulWidget` a plusieurs états, et à chaque fois que l'état change, nous devons appeler la méthode `build` , puisque l'état est stocké dans State, si la méthode `build` est dans `StatefulWidget`, alors le `la méthode build` et l'état sont dans deux classes distinctes, il sera donc très gênant de lire l'état lors de la construction ! serait très gênant ! Imaginez si vous mettez réellement la méthode `build` dans un StatefulWidget, puisque le processus de construction de l'interface utilisateur dépend de l'état, la méthode `build` devrait avoir un paramètre `State` , quelque chose comme ce qui suit.

  ```dart
    Widget build (contexte BuildContext, état de l'état){
        //state.counter
...
    }
  ```

  Dans ce cas, vous pouvez uniquement déclarer tout l'état de l'état comme public, de sorte que vous pouvez accéder à l'état en dehors de la classe State ! Cependant, en rendant l'État public, l'État ne sera plus privé, ce qui signifie que les modifications de l'État deviendront incontrôlables. Mais si vous mettez la méthode `build()` dans l'état, le processus de construction a non seulement un accès direct à l'état, mais n'a pas non plus besoin d'exposer l'état privé, ce qui est très pratique.

- L'héritage de `StatefulWidget` n'est pas pratique

  Par exemple, Flutter a une classe de base `AnimatedWidget` pour les widgets animés, qui hérite de la classe `StatefulWidget`. Une méthode abstraite `build(BuildContext context)` est introduite dans `AnimatedWidget`, et tous les widgets animés qui héritent de `AnimatedWidget` doivent implémenter cette méthode `build`. Imaginez maintenant que si la classe `StatefulWidget` a déjà une méthode `build` , comme décrit ci-dessus, la méthode `build` doit recevoir un objet d'état, ce qui signifie que le `AnimatedWidget` doit passer son propre objet State (noté comme _animatedWidgetState) à sa classe enfant, car la classe enfant doit appeler la méthode `build` de la classe parent dans sa méthode `build` , et le code peut ressembler à ceci.

  ```dart
  class MyAnimationWidget étend AnimatedWidget{
      @override
      Widget build(BuildContext context, State state){
        //puisque la sous-classe va utiliser l'objet d'état _animatedWidgetState de l'AnimatedWidget.
        // donc l'AnimatedWidget doit d'une manière ou d'une autre exposer son objet d'état _animatedWidgetState
        // l'exposer à ses sous-classes   
        super.build(context, _animatedWidgetState)
      }
}
  ```

  Cela n'a évidemment aucun sens, car

    1. l'objet d'état de `AnimatedWidget` est un détail d'implémentation interne de `AnimatedWidget` et ne doit pas être exposé à l'extérieur.
    2. si l'état de la classe parent doit être exposé à la classe enfant, alors il doit y avoir un mécanisme de passage, et il est inutile de faire cet ensemble de mécanismes de passage, car le passage de l'état entre les classes parent et enfant n'est pas pertinent pour la logique de la classe enfant elle-même.

En résumé, on peut constater que pour `StatefulWidget`, mettre la méthode `build` dans State peut apporter beaucoup de souplesse au développement.
