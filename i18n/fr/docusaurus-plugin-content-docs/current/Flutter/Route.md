# Gestion des itinéraires flottants

L'itinéraire dans le développement mobile fait généralement référence à une page, ce qui est identique au concept d'itinéraire dans le développement Web pour les applications à page unique. La gestion des routes dans Flutter est similaire au développement natif, à la fois Android et iOS, la gestion de la navigation maintiendra une pile de routes, l'opération de route dans la pile (push) correspond à l'ouverture d'une nouvelle page, la route hors de la pile (pop ) correspond à l'opération de fermeture de page, et la gestion des itinéraires se réfère principalement à la façon de gérer la pile d'itinéraires.

Le nouveau routage est au même niveau que la page d'accueil et est un nouveau composant sans état

```dart
class NewRoute extend StatelessWidget 
``` The

Le composant Botton appelle le

```dart
         onPressed: () {
          // Naviguer vers la nouvelle route   
          Navigator.push( context,
           MaterialPageRoute(builder: (context) {
              return NewRoute();
}));
```

## MatérielPageRoute

La classe `MaterialPageRoute` hérite de la classe `PageRoute`. La classe `PageRoute` est une classe abstraite qui représente une page de route modale qui occupe tout l'espace de l'écran, et elle définit également l'interface et les propriétés liées à la construction de la route et aux animations de transition lors du basculement. `MaterialPageRoute` est un composant fourni par la bibliothèque de composants Material, qui peut obtenir le même style d'animation de changement de routage que l'animation de changement de page de plate-forme pour différentes plates-formes.

- Pour Android, lors de l'ouverture d'une nouvelle page, la nouvelle page glissera du bas vers le haut de l'écran ; lors de la fermeture d'une page, la page en cours glissera du haut vers le bas de l'écran et disparaîtra, tandis que la page précédente s'affichera à l'écran.
- Pour iOS, lors de l'ouverture d'une page, la nouvelle page glissera de manière cohérente du bord droit de l'écran vers le côté gauche de l'écran jusqu'à ce que la nouvelle page soit entièrement affichée à l'écran, tandis que la page précédente disparaîtra en glissant de la page actuelle. écran sur le côté gauche de l'écran ; lors de la fermeture d'une page, c'est tout le contraire, la page actuelle glissera du côté droit de l'écran, tandis que la page précédente glissera du côté gauche de l'écran.

Nous introduisons ici la signification de chaque paramètre du constructeur `MaterialPageRoute`.

```dart
  MaterialPageRoute({
    Générateur WidgetBuilder,
    Paramètres RouteSettings,
    booléen maintenatState = vrai,
    booléen fullscreenDialog = faux,
})
```

- `builder` est une fonction callback de type WidgetBuilder, qui sert à construire les spécificités de la page de route, la valeur de retour est un widget. nous devons généralement implémenter ce rappel pour renvoyer une instance de la nouvelle route.
- `paramètres` contient les informations de configuration de la route, telles que le nom de la route, si la route initiale (page d'accueil).
- `sustainState`: par défaut, lorsqu'une nouvelle route est empilée, la route d'origine est toujours stockée en mémoire, si vous souhaitez libérer toutes les ressources occupées par la route lorsqu'elle n'est pas utilisée, vous pouvez définir `sustainState` sur false.
- `fullscreenDialog` indique si la nouvelle page de routage est une boîte de dialogue modale plein écran. Dans iOS, si `fullscreenDialog` est `true`, la nouvelle page glissera depuis le bas de l'écran (au lieu d'être horizontale).

> Si vous souhaitez personnaliser l'animation du commutateur de routage, vous pouvez hériter de PageRoute pour l'implémenter vous-même, et nous implémenterons un composant de routage personnalisé plus tard lorsque nous présenterons l'animation.

## Navigateur

`Navigator` est un composant de gestion d'itinéraire qui fournit des méthodes pour ouvrir et quitter les pages d'itinéraire. `Navigator` gère une collection de routes actives à travers une pile. Habituellement, la page actuellement affichée à l'écran est la route en haut de la pile. `Navigator` fournit une série de méthodes pour gérer la pile de routage, nous ne décrivons ici que ses deux méthodes les plus couramment utilisées.

### Future push (contexte BuildContext, route route)

La valeur de retour est un objet `Future` qui reçoit les données de retour lorsque la nouvelle route quitte la pile (c'est-à-dire qu'elle est fermée).

### bool pop (contexte BuildContext, [ résultat ])

Acheminez le haut de la pile hors de la pile, `résultat` correspond aux données renvoyées à la page précédente lorsque la page est fermée.

`Navigator` a de nombreuses autres méthodes, telles que `Navigator.replace`, `Navigator.popUntil`, etc. Veuillez vous référer à la documentation de l'API ou aux commentaires du code source du SDK pour plus de détails, nous ne les répéterons donc pas ici. Ici, nous devons également introduire un autre concept lié au routage, les "routes nommées".

### Méthodes d'instance

Les méthodes statiques de la classe Navigator **** avec le contexte comme premier paramètre correspondent à une méthode d'instance Navigator ****, par exemple `Navigator.push(BuildContext context, Route route)` équivaut à `Navigator.of( context).push(Route route )` , et les méthodes liées aux routes nommées suivantes sont les mêmes.

## Dépassement d'itinéraire

Très souvent, nous devons prendre certains paramètres lors des sauts de routage, par exemple, lors de l'ouverture de la page de détails du produit, nous devons prendre un identifiant de produit, afin que la page de détails du produit sache quelles informations sur le produit afficher; un autre exemple est que nous devons sélectionner l'adresse de livraison lors du traitement d'une commande, après avoir ouvert la page de sélection d'adresse et sélectionné l'adresse, vous pouvez renvoyer l'adresse sélectionnée par l'utilisateur sur la page de commande, etc. Ce qui suit est un exemple simple pour montrer comment passer les anciens et les nouveaux itinéraires.

### Exemple

Nous créons un itinéraire `TipRoute` , qui accepte un paramètre de texte d'invite et se charge d'afficher le texte qui lui est transmis sur la page, en plus du `TipRoute` , nous ajoutons un bouton "Retour", qui, lorsqu'il est cliqué, prendra un retour tout en revenant à la route précédente, regardons le code d'implémentation.

`Code d'implémentation TipRoute`.

```dart
class TipRoute étend StatelessWidget {
  TipRoute({
    Key key,
    @required this.text, // reçoit un paramètre de texte
  }) : super(key: key);
  texte de chaîne final ;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Tip"),
      ),
      body: Padding(
        padding: EdgeInsets.all(18),
        child : Center(
          enfant : Colonne(
            enfants : <Widget>[
              Texte(texte),
              RaisedButton(
                onPressed : () => Navigator.pop(contexte, "Je suis la valeur de retour"),
                enfant : Texte(" retour"),
              )
            ],
          ),
        ),
      ),
    );
  }
}
```

Voici le code pour ouvrir le nouveau routage `TipRoute`.

```dart
class RouterTestRoute extend StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: RaisedButton(
        onPressed: () async {
          // Ouvrir `TipRoute` et attendre le résultat de retour
          var result = attendre Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) {
                return TipRoute(
                  // Route parameters
                  text: "I am tip xxxx",
                );
              },
            ),
          );
          / /output `TipRoute` route return result
          print("Route return value: $result");
        },
        child: Text("Open prompt page"),
      ),
    );
  }
}
```

Exécutez le code ci-dessus et cliquez sur le bouton "Open Tip Page" sur la page `RouterTestRoute` , ce qui ouvrira la page `TipRoute` et s'exécutera comme illustré à la Figure 2-4 ci-dessous.

! [Illustration 2-4](https://pcdn.flutterchina.club/imgs/2-4.png)

Note 1.

1. le texte d'invite "Je demande xxxx" est transmis à la nouvelle page de routage via le paramètre `texte` de `TipRoute`. On peut attendre le `Future` renvoyé par `Navigator.push(...)` pour obtenir les données de retour de la nouvelle route. 2.

2. Dans la page `TipRoute` , il y a deux manières de revenir à la page précédente ; la première consiste à cliquer directement sur la flèche de retour dans la barre de navigation, et la seconde consiste à cliquer sur le bouton "Retour" dans la page. La différence entre ces deux méthodes de retour est que la première ne renvoie pas de données à la route précédente, tandis que la seconde le fait. Voici la sortie de la méthode `print` dans la page `RouterTestRoute` de la console après avoir cliqué respectivement sur le bouton de retour et la flèche de retour de la barre de navigation.

   ```
   I/flutter (27896) : valeur de retour de la route : je suis la valeur de retour
   I/flutter (27896) : valeur de retour de la route : null
   ```

Ce qui précède décrit la manière de transmettre des valeurs pour des routes non nommées. La façon de transmettre des valeurs pour les routes nommées sera différente, et nous la couvrirons lorsque nous présenterons les routes nommées ci-dessous.

## Itinéraires nommés
 