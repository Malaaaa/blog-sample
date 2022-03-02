# Gestion des packages

YAML est un format de fichier intuitif, hautement lisible et lisible par l'homme, sa syntaxe est simple et très facile à analyser par rapport à xml ou Json, donc YAML est souvent utilisé pour les fichiers de configuration, Flutter utilise également des fichiers yaml comme fichiers de configuration. le fichier de configuration par défaut pour les projets Flutter est `pubspec.yaml`, regardons un exemple simple.

```yaml
nom : flutter_in_action
description : Première application Flutter.

version : 1.0.0+1

dépendances :
  flutter :
    sdk : flutter
  cupertino_icons : ^0.1.2

dev_dependencies :
  flutter_test :
    sdk : flutter

flutter :
  uses-material-design : true
```

- `nom`: le nom de l'application ou du package.
- `description`: description, présentation de l'application ou du package.
- `version`: numéro de version de l'application ou du package.
- `dépendances`: autres packages ou plugins dont dépend l'application ou le package.
- `dev_dependencies` : les kits d'outils dont dépend l'environnement de développement (et non les packages dont dépend l'application flutter elle-même).
- `flutter`: options de configuration liées au flutter.

Si notre application Flutter elle-même dépend d'un package, nous devons ajouter le package dépendant sous `dépendances`, nous montrerons ensuite comment ajouter, télécharger et utiliser des packages tiers avec un exemple.

## Référentiel de pub

Pub (<https://pub.dev/> ) est le dépôt officiel de Google pour **Dart Packages**.

## Exemple

Ensuite, nous implémentons un widget qui affiche des chaînes aléatoires. il existe un package open source appelé "english_words" qui contient des milliers de mots anglais courants et quelques fonctions utiles. Nous trouvons d'abord le paquet "english_words" sur pub (illustré à la figure 2-5), déterminons son dernier numéro de version et s'il prend en charge Flutter.

! [Illustration 2-5](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/2-5.png)

Nous voyons que la dernière version du package "english_words" est la 3.1.3 et qu'elle prend en charge le flutter.

1. ajoutez "english_words" (version 3.1.3) à la liste des dépendances, comme suit.

   ```yaml
   dependencies:
     flutter:
       sdk: flutter

     cupertino_icons: ^0.1.0
     # Nouvelles dépendances ajoutées
      : ^3.1.3
   ```

2. Téléchargez le package. Lorsque vous affichez pubspec.yaml dans la vue de l'éditeur d'Android Studio (Figure 2-6), cliquez sur **Packages get** dans le coin supérieur droit.

   ! [Illustration 2-6](https://pcdn.flutterchina.club/imgs/2-6.png)

   Cela installera les packages de dépendance sur votre projet. Nous pouvons voir ce qui suit dans la console.

   ```shell
   flutter packages get
   Exécution de "flutter packages get" dans flutter_in_action...
   Processus terminé avec le code de sortie 0
   ```

   Nous pouvons également télécharger les dépendances à partir de la console en localisant le répertoire du projet actuel et en exécutant manuellement la commande `flutter packages get`. Notez également la différence entre `dependencies` et `dev_dependencies`, les anciennes dépendances seront compilées dans le cadre du code source de l'application pour générer le programme d'installation final. Ces dernières dépendances ne sont utilisées que comme certaines boîtes à outils dans la phase de développement, principalement pour nous aider à améliorer l'efficacité du développement et des tests, comme le package de test d'automatisation de Flutter, etc.

3. introduisez le package `english_words`.

   ```dart
   importer 'paquet:mots_anglais/mots_anglais.dart' ;
   ```

   Lors de l'importation, Android Studio proposera automatiquement des options suggérées pour l'importation de la bibliothèque. La ligne de code sera grisée après l'importation, indiquant que la bibliothèque importée n'est pas encore utilisée. 4.

4. Utilisez le package `english_words` pour générer des chaînes aléatoires.

   ```dart
   class RandomWordsWidget extend StatelessWidget {
     @override
     Widget build(BuildContext context) {
      // Générer des chaînes aléatoires
       final wordPair = new WordPair.random();
       return Padding(
         padding: const EdgeInsets.all(8.0),
         child: new Text(wordPair.toString()),
       );
     }
}
   ```

   Nous ajoutons `RandomWordsWidget` au widget enfant de `Column` of `_MyHomePageState.build`.

   ```dart
   Colonne(
     mainAxisAlignment : MainAxisAlignment.center,
     enfants : <Widget>[
       RandomWordsWidget(),
     ],
)
   ```

5. Si l'application est en cours d'exécution, utilisez le bouton Hot Reload (icône ⚡️) pour mettre à jour l'application en cours d'exécution. Chaque fois que vous cliquez sur Hot Reload ou Save Item, une paire de mots différente est sélectionnée au hasard dans l'application en cours d'exécution. En effet, les paires de mots sont générées dans la méthode `build`. La méthode `build` est exécutée chaque fois qu'une mise à jour à chaud est effectuée et s'exécute comme illustré à la Figure 2-7.

   ! [Illustration 2-7](https://pcdn.flutterchina.club/imgs/2-7.png)

## Autres méthodes de dépendance

Les méthodes de dépendance décrites ci-dessus reposent sur des référentiels Pub. Cependant, nous pouvons également compter sur des packages locaux et des référentiels git.

- Dépendance aux forfaits locaux

  Si nous développons un package localement, nommé pkg1, nous pouvons en dépendre en procédant comme suit.

  ```yaml
  dépendances :
      pkg1 :
          chemin : ... /... /code/pkg1
  ```

  Les chemins peuvent être relatifs ou absolus.

- Dépendance à Git : vous pouvez également dépendre de packages stockés dans un référentiel Git. Si le package se trouve à la racine du référentiel, utilisez la syntaxe suivante

  ```yaml
  dépendances :
    pkg1 :
      git :
        url : git://github.com/xxx/pkg1.git
  ```

  Ce qui précède suppose que le package se trouve dans le répertoire racine du référentiel Git. Si ce n'est pas le cas, vous pouvez spécifier un emplacement relatif à l'aide du paramètre path, par exemple

  ```yaml
  dépendances :
    package1 :
      git :
        url : git://github.com/flutter/packages.git
        chemin : packages/package1
  ```

Ces dépendances décrites ci-dessus sont couramment utilisées dans le développement Flutter, mais il existe d'autres dépendances, dont le lecteur peut voir le contenu complet par lui-même : <https://www.dartlang.org/tools/pub/dependencies>.

## Sommaire

Cette section décrit le processus global de gestion, de référencement et de téléchargement des packages dans Flutter, et nous expliquerons comment développer et distribuer nos propres packages dans les chapitres suivants. ***Traduit avec www.DeepL.com/Translator (version gratuite)***

# Gestion des packages

YAML est un format de fichier intuitif, hautement lisible et lisible par l'homme, sa syntaxe est simple et très facile à analyser par rapport à xml ou Json, donc YAML est souvent utilisé pour les fichiers de configuration, Flutter utilise également des fichiers yaml comme fichiers de configuration. le fichier de configuration par défaut pour les projets Flutter est `pubspec.yaml`, regardons un exemple simple.

```yaml
nom : flutter_in_action
description : Première application Flutter.

version : 1.0.0+1

dépendances :
  flutter :
    sdk : flutter
  cupertino_icons : ^0.1.2

dev_dependencies :
  flutter_test :
    sdk : flutter

flutter :
  uses-material-design : true
```

- `nom`: le nom de l'application ou du package.
- `description`: description, présentation de l'application ou du package.
- `version`: numéro de version de l'application ou du package.
- `dépendances`: autres packages ou plugins dont dépend l'application ou le package.
- `dev_dependencies` : les kits d'outils dont dépend l'environnement de développement (et non les packages dont dépend l'application flutter elle-même).
- `flutter`: options de configuration liées au flutter.

Si notre application Flutter elle-même dépend d'un package, nous devons ajouter le package dépendant sous `dépendances`, nous montrerons ensuite comment ajouter, télécharger et utiliser des packages tiers avec un exemple.

## Référentiel de pub

Pub (<https://pub.dev/> ) est le dépôt officiel de Google pour **Dart Packages**.

## Exemple

Ensuite, nous implémentons un widget qui affiche des chaînes aléatoires. il existe un package open source appelé "english_words" qui contient des milliers de mots anglais courants et quelques fonctions utiles. Nous trouvons d'abord le paquet "english_words" sur pub (illustré à la figure 2-5), déterminons son dernier numéro de version et s'il prend en charge Flutter.

! [Illustration 2-5](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/2-5.png)

Nous voyons que la dernière version du package "english_words" est la 3.1.3 et qu'elle prend en charge le flutter.

1. ajoutez "english_words" (version 3.1.3) à la liste des dépendances, comme suit.

   ```yaml
   dependencies:
     flutter:
       sdk: flutter

     cupertino_icons: ^0.1.0
     # Nouvelles dépendances ajoutées
      : ^3.1.3
   ```

2. Téléchargez le package. Lorsque vous affichez pubspec.yaml dans la vue de l'éditeur d'Android Studio (Figure 2-6), cliquez sur **Packages get** dans le coin supérieur droit.

   ! [Figure 2-6](https://pcdn.flutterchina.club/imgs/2-6.png)

   Cela installera les packages de dépendance sur votre projet. Nous pouvons voir ce qui suit dans la console.

   ```shell
   flutter packages get
   Exécution de "flutter packages get" dans flutter_in_action...
   Processus terminé avec le code de sortie 0
   ```

   Nous pouvons également télécharger les dépendances à partir de la console en localisant le répertoire du projet actuel et en exécutant manuellement la commande `flutter packages get`. Notez également la différence entre `dependencies` et `dev_dependencies`, les anciennes dépendances seront compilées dans le cadre du code source de l'application pour générer le programme d'installation final. Ces dernières dépendances ne sont utilisées que comme certaines boîtes à outils dans la phase de développement, principalement pour nous aider à améliorer l'efficacité du développement et des tests, comme le package de test d'automatisation de Flutter, etc.

3. introduisez le package `english_words`.

   ```dart
   importer 'paquet:mots_anglais/mots_anglais.dart' ;
   ```

   Lors de l'importation, Android Studio proposera automatiquement des options suggérées pour l'importation de la bibliothèque. La ligne de code sera grisée après l'importation, indiquant que la bibliothèque importée n'est pas encore utilisée. 4.

4. Utilisez le package `english_words` pour générer des chaînes aléatoires.

   ```dart
   class RandomWordsWidget extend StatelessWidget {
     @override
     Widget build(BuildContext context) {
      // Générer des chaînes aléatoires
       final wordPair = new WordPair.random();
       return Padding(
         padding: const EdgeInsets.all(8.0),
         child: new Text(wordPair.toString()),
       );
     }
}
   ```

   Nous ajoutons `RandomWordsWidget` au widget enfant de `Column` of `_MyHomePageState.build`.

   ```dart
   Colonne(
     mainAxisAlignment : MainAxisAlignment.center,
     enfants : <Widget>[
       RandomWordsWidget(),
     ],
)
   ```

5. Si l'application est en cours d'exécution, utilisez le bouton Hot Reload (icône ⚡️) pour mettre à jour l'application en cours d'exécution. Chaque fois que vous cliquez sur Hot Reload ou Save Item, une paire de mots différente est sélectionnée au hasard dans l'application en cours d'exécution. En effet, les paires de mots sont générées dans la méthode `build`. La méthode `build` est exécutée chaque fois qu'une mise à jour à chaud est effectuée et s'exécute comme illustré à la Figure 2-7.

   ! [Illustration 2-7](https://pcdn.flutterchina.club/imgs/2-7.png)

## Autres méthodes de dépendance

Les méthodes de dépendance décrites ci-dessus reposent sur des référentiels Pub. Cependant, nous pouvons également compter sur des packages locaux et des référentiels git.

- Dépendance aux forfaits locaux

  Si nous développons un package localement, nommé pkg1, nous pouvons en dépendre en procédant comme suit.

  ```yaml
  dépendances :
      pkg1 :
          chemin : ... /... /code/pkg1
  ```

  Les chemins peuvent être relatifs ou absolus.

- Dépendance à Git : vous pouvez également dépendre de packages stockés dans un référentiel Git. Si le package se trouve à la racine du référentiel, utilisez la syntaxe suivante

  ```yaml
  dépendances :
    pkg1 :
      git :
        url : git://github.com/xxx/pkg1.git
  ```

  Ce qui précède suppose que le package se trouve dans le répertoire racine du référentiel Git. Si ce n'est pas le cas, vous pouvez spécifier un emplacement relatif à l'aide du paramètre path, par exemple

  ```yaml
  dépendances :
    package1 :
      git :
        url : git://github.com/flutter/packages.git
        chemin : packages/package1
  ```

Ces dépendances décrites ci-dessus sont couramment utilisées dans le développement Flutter, mais il existe d'autres dépendances, dont le lecteur peut voir le contenu complet par lui-même : <https://www.dartlang.org/tools/pub/dependencies>.

## Sommaire

Cette section décrit le processus global de gestion, de référencement et de téléchargement des packages dans Flutter, et nous expliquerons comment développer et distribuer nos propres packages dans les chapitres suivants.
