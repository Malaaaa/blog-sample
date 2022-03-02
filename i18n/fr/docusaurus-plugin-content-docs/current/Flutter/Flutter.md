---
sidebar_position: 1
---

# Apprentissage flottant

## Aperçu Aperçu

- est le cadre d'interface utilisateur mobile de Google permettant de créer rapidement des interfaces utilisateur natives de haute qualité sur iOS et Android. Il peut également être utilisé pour le Web et d'autres utilitaires multi-fins.
- [flottement pratique](https://book.flutterchina.club/) Les opérations suivantes sont également basées sur ce livre
- L'arbre DOM et l'arbre de contrôle sont similaires
  - Arbre DOM (html) ! [arbre DOM](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/pic_htmltree.gif)
  - Arbre de widgets (scintillement) ! [Arbre des widgets](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/OIP.Bw-atr2JI-0ypRc2E9JcZgHaGa)

> Relations hiérarchiques comme Unity

- Flutter utilise son propre moteur de rendu hautes performances pour dessiner des widgets.
- La haute performance de Flutter est principalement assurée par deux choses, premièrement, Flutter APP est développé en langage Dart, qui est fondamentalement à la même vitesse que JavaScript en mode JIT (Just-In-Time). Cependant, Dart prend en charge AOT, et lors de l'exécution en mode AOT (compilation avant exécution), JavaScript est loin derrière. L'augmentation de la vitesse est utile pour calculer les données de vue à des fréquences d'images élevées. Deuxièmement, Flutter utilise son propre moteur de rendu pour dessiner l'interface utilisateur, et les données de mise en page, etc. sont directement contrôlées par le langage Dart, il n'est donc pas nécessaire de communiquer entre JavaScript et Native pendant le processus de mise en page comme RN, ce qui est un net avantage dans certains glissements. et faire glisser des scénarios.

- Structure du cadre flottant

  > ! [Structure du cadre](https://pcdn.flutterchina.club/imgs/1-1.png)

- "Hot Reload" ne reconstruit que l'intégralité de l'arborescence des widgets)

## Fondamentaux du langage Dart

### Déclarations de variables

1. **var**

   Semblable à `var` en JavaScript, il peut recevoir des variables de n'importe quel type, mais la plus grande différence est qu'une fois qu'une variable var se voit attribuer une valeur dans Dart, le type est déterminé et le type ne peut pas être modifié, par exemple

   ```dart
   var t;
   t = "salut monde" ;
   // Le code suivant signalera une erreur dans dart, car le type de variable t a été déterminé comme String.
   // Une fois le type déterminé, il ne peut plus être modifié.
   t = 1000 ;
   ```

   Dart est un langage fortement typé, toute variable a un type défini. Dans Dart, lorsqu'une variable est déclarée avec `var`, Dart déduira son type en fonction du type de la première affectation, et son type sera déterminé après compilation.

2. **dynamique** et **Objet**

    `Object` est la classe racine de tous les objets Dart, c'est-à-dire que tous les types sont des sous-classes de `Object` (y compris Function et Null), de sorte que tout type de données peut être affecté à un objet déclaré par `Object`. `dynamique` est le même mot clé que `var`, et les variables déclarées peuvent être affectées à n'importe quel objet. Et `dynamique` est identique à `Objet` en ce sens que les variables qu'ils déclarent peuvent changer le type d'affectation à un stade ultérieur.

    ```dart
    t dynamique ;
    Objet x ;
    t = "salut monde" ;
    x = 'Bonjour Objet' ;
    // Le code suivant est bon
    t = 1000;
    = 1000 ;
    ```

   La différence entre `dynamique` et `Objet` est que le compilateur fournira toutes les combinaisons possibles d'objets déclarés par `dynamiques`, L'objet déclaré par `Objet` ne peut utiliser que les propriétés et les méthodes de Objet, sinon le compilateur signalera une erreur. Par exemple:

   ```dart
    dynamique a;
    Objet b ;
    principale() {
        une = "" ;
        = "" ;
        printLengths();
    }   

    printLengths() {
        // pas d'avertissement
        print(a.length);
        // avertissement :
        // Le getter 'length' n'est pas défini pour la classe 'Object'
        print(b.length);
}
   ```

   La variable a ne signalera pas d'erreur, la variable b sera signalée par le compilateur

   Cette caractéristique de `dynamique` est similaire au rôle de `id` dans `Objective-C`. Cette fonctionnalité de `dynamique` nous oblige à être prudent lors de son utilisation, car elle peut facilement introduire une erreur d'exécution.

3. **final** et **const**

   Si vous n'avez jamais l'intention de modifier une variable, utilisez `final` ou `const`, et non `var`et non un type. Une variable `final` ne peut être définie qu'une seule fois, la différence étant qu'une variable `const` est une constante de compilation et qu'une variable `final` est initialisée la première fois qu'elle est utilisée. Les variables modifiées par `final` ou `const` ont des types de variables qui peuvent être omis, par exemple

   ```dart
   // La déclaration de type String peut être omise
   final str = "hi world";
   //chaîne finale str = "salut le monde" ; 
   const str1 = "salut monde" ;
   //const String str1 = "salut monde" ;
   ```

### Les fonctions

Dart est un véritable langage orienté objet, donc même les fonctions sont des objets et ont un type **Function**. Cela signifie que les fonctions peuvent être affectées à des variables ou transmises en tant qu'arguments à d'autres fonctions, ce qui est typique de la programmation fonctionnelle.

1. Déclaration de fonction

   ```dart
   bool isNoble(int atomicNumber) {
     return _nobleGases[atomicNumber]! = nul ;
}
   ```

   Les déclarations de fonction Dart qui ne déclarent pas explicitement le type de valeur de retour sont traitées comme `dynamique` par défaut, notez qu'il n'y a pas d'inférence de type pour la valeur de retour de la fonction.

   ```dart
   typedef bool RAPPEL();

   //ne spécifiez pas le type de retour, la valeur par défaut est dynamique, pas bool
   isNoble(int atomicNumber) {
     return _nobleGases[atomicNumber]! = nul ;
   }

   void test(CALLBACK cb){
      print(cb()); 
   }
   // erreur, isNoble n'est pas un bool type
   test(isNoble);
   ```

2. Pour les fonctions qui ne contiennent qu'une seule expression, vous pouvez utiliser la syntaxe abrégée

   ```dart
   bool isNoble (int atomicNumber) => _nobleGases [ atomicNumber ] ! = nul ;   
   ```

3. Fonctions comme variables

   ```dart
   var say = (str){
     print(str);
   } ;
   say("salut le monde");
   ```

4. Fonctions passées en arguments

   ```dart
   void execute(var callback) {
       callback();
   }
   exécuter(() => imprimer("xxx"))
   ```

5. Arguments positionnels facultatifs

   Enveloppez un ensemble d'arguments de fonction, marquez-les comme arguments positionnels facultatifs avec [] et placez-les à la fin de la liste d'arguments.

   ```dart
   String say(String from, String msg, [String device]) {
     var résultat = '$from dit $msg';
     si (appareil ! = null) {
       result = '$result with a $device';
     }
     renvoie le résultat ;
}
   ```

   Voici un exemple d'appel de cette fonction sans arguments optionnels.

   ```dart
   say('Bob', 'Bonjour'); // le résultat est : Bob dit bonjour
   ```

   Voici un exemple d'appel de cette fonction avec le troisième argument.

   ```dart
   say('Bob', 'Howdy', 'smoke signal'); // le résultat est : Bob dit bonjour avec un signal de fumée
   ```

6. Paramètres nommés facultatifs

   Lors de la définition d'une fonction, utilisez {param1, param2, ...}, placé à la fin de la liste des paramètres, pour spécifier les paramètres nommés. Par exemple.

   ```dart
   // Définir les drapeaux [bold] et [hidden]
   void enableFlags({bool bold, bool hidden}) {
       // ... 
}
   ```

   Lors de l'appel d'une fonction, vous pouvez utiliser le paramètre nommé spécifié. Par exemple : `paramName : valeur`

   ```dart
   enableFlags(gras : vrai, masqué : faux) ;
   ```

   Les paramètres nommés optionnels sont très utilisés dans Flutter.

   **Notez que vous ne pouvez pas utiliser à la fois des paramètres de position facultatifs et des paramètres nommés facultatifs**

### Prise en charge asynchrone

La bibliothèque de classes Dart possède un très grand nombre de fonctions qui retournent `objets Future` ou `Stream`. Ces fonctions sont appelées **Fonctions asynchrones**: elles ne reviennent qu'après la mise en place d'une opération chronophage, comme une opération IO. Au lieu d'attendre que l'opération soit terminée.

Les mots-clés `async` et `attendent` prennent en charge la programmation asynchrone, ce qui vous permet d'écrire du code asynchrone un peu comme du code synchrone.

#### Avenir

`Future` est très similaire à `Promise` en JavaScript et représente l'achèvement final (ou l'échec) d'une opération asynchrone et la représentation de sa valeur de résultat. En bref, il est utilisé pour gérer les opérations asynchrones. Si le traitement asynchrone réussit, l'opération réussie est exécutée et si le traitement asynchrone échoue, une erreur est détectée ou l'opération suivante est arrêtée. Un Futur ne correspondra qu'à un seul résultat, succès ou échec.

Puisqu'il a beaucoup de fonctions, nous ne présenterons ici que son API et ses fonctionnalités communes. N'oubliez pas non plus que la valeur de retour de toutes les API `Future` est toujours un objet `Future` , il est donc facile d'enchaîner les appels.

##### Futur.alors

Par exemple, dans ce cas, nous utilisons `Future.delayed` pour créer une tâche retardée (le scénario réel serait une tâche chronophage, comme une requête réseau) qui renvoie la chaîne de résultat "hi world!" au bout de 2 secondes, puis on reçoit le résultat asynchrone en `puis` et on imprime le résultat avec le code suivant.

```dart
Future.delayed(new Duration(seconds: 2), (){
   return "hi world!";
}).then((data){
   print(data);
});
```

### Future.catchError

Si une erreur se produit dans une tâche asynchrone, nous pouvons intercepter l'erreur dans `catchError`, et nous changeons l'exemple ci-dessus en

```dart
Future.delayed(new Duration(seconds: 2),(){
   //return "hi world!";
   throw AssertionError("Error");  
}).then((data){
   //exécuter avec succès allez ici  
   print("success");
}).catchError((e){
   //échec d'exécution va ici  
   print(e);
});
```

Dans cet exemple, nous avons levé une exception dans une tâche asynchrone et la fonction de rappel `puis` ne sera pas exécutée, à la place la fonction de rappel `catchError` sera appelée ; cependant, le rappel `catchError` n'est pas le seul à intercepter les erreurs, la méthode `then` a un paramètre optionnel `onError` que nous pouvons également utiliser pour intercepter l'exception.

```dart
Future.delayed(new Duration(seconds: 2), () {
    //return "hi world!";
    throw AssertionError("Error");
}).then((data) {
    print("success" );
}, onError : (e) {
    print(e);
});
```

##### Future.whenComplet

Il y a des moments où nous rencontrons des scénarios où nous devons faire quelque chose indépendamment du succès ou de l'échec de l'exécution de la tâche asynchrone, comme faire apparaître la boîte de dialogue de chargement avant la demande réseau et la fermer une fois la demande terminée. Le premier est de fermer la boîte de dialogue en `puis` ou `catch` respectivement, et le second est d'utiliser `whenComplete` callback of `Future`, nous allons changer l'exemple ci-dessus comme suit

```dart
Future.delayed(new Duration(seconds: 2),(){
   //return "hi world!";
   throw AssertionError("Error");
}).then((data){
   // le succès de l'exécution sera allez ici 
   print(data);
}).catchError((e){
   //Échec de l'exécution va ici   
   print(e);
}).whenComplete((){
   //ira ici s'il réussit ou échoue
});
```

##### Future.wait

Il y a des moments où nous devons attendre la fin de l'exécution de plusieurs tâches asynchrones avant d'effectuer certaines opérations, par exemple, nous avons une interface qui doit d'abord récupérer les données de deux interfaces Web séparément, et après la récupération réussie, nous devons effectuer des opérations spécifiques traitement sur les deux données d'interface avant de les afficher sur l'interface utilisateur, comment devrions-nous faire cela ? La réponse est `Future.wait`, qui accepte un tableau de `paramètres Future` , seulement après que les `Future` du tableau sont exécutés avec succès, le rappel de succès de `puis` sera déclenché, tant qu'il y a un `Échec d'exécution du futur` , le rappel d'erreur sera déclenché. Dans ce qui suit, nous simulons deux tâches asynchrones de récupération de données en simulant `Future.delayed`, et lorsque les deux tâches asynchrones sont exécutées avec succès, les résultats des deux tâches asynchrones sont assemblés et imprimés, avec le code suivant.

```dart
Future.wait([
  // renvoie le résultat après 2 secondes  
  Future.delayed(new Duration(seconds: 2), () {
    return "hello";
  }),
  // renvoie le résultat après 4 secondes  
  Future.delayed(new Duration(seconds: 4), () {
    return " world";
  })
]).then((results){
  print(results[0]+results[1]);
}).catchError( (e){
  print(e);
});
```

Exécutez le code ci-dessus et vous verrez "hello world" dans la console après 4 secondes.

#### Asynchrone/attendre

La fonction et l'utilisation de `async/wait` dans Dart et `async/wait` dans JavaScript sont exactement les mêmes, donc si vous connaissez déjà l'utilisation de `async/wait` dans JavaScript, vous pouvez simplement ignorer cette section.

##### L'enfer des rappels

S'il y a beaucoup de logique asynchrone dans le code, et s'il y a beaucoup de tâches asynchrones qui dépendent des résultats d'autres tâches asynchrones, il y a forcément une situation de rappel dans le rappel `Future.then`. Par exemple, supposons qu'il existe un scénario d'exigence où l'utilisateur se connecte d'abord, puis obtient l'ID utilisateur après une connexion réussie, puis demande les informations personnelles de l'utilisateur via l'ID utilisateur, et après avoir obtenu les informations personnelles de l'utilisateur, nous devons cachez-le dans le système de fichiers local pour en faciliter l'utilisation, avec le code suivant.

```dart
// Définissez d'abord chaque tâche asynchrone séparément
Future<String> login(String userName, String pwd){
...
    //connexion utilisateur
} ;
Futur<String> getUserInfo(String id){
...
    //obtenir les informations utilisateur 
} ;
Future saveUserInfo(String userInfo){
...
    // Enregistrer les informations utilisateur 
} ; 
```

Ensuite, exécutez l'intégralité du flux de tâches.

```dart
login("alice", "******").then((id){
 //obtenir les informations de l'utilisateur par, id après une connexion réussie    
 getUserInfo(id).then((userInfo){
    //Obtenir les informations de l'utilisateur et enregistrez-les 
    saveUserInfo(userInfo).then((){
       //Enregistrer les informations de l'utilisateur et effectuer d'autres opérations next
...
    });
  });
})
```

S'il y a beaucoup de dépendances asynchrones dans la logique métier, il y aura un rappel à l'intérieur du rappel, trop d'imbrication entraînera une diminution de la lisibilité et du taux d'erreur, et il est très difficile à maintenir, ce problème est appelé imaginativement **Callback Hell**. Le problème de l'enfer du rappel était très important dans JavaScript auparavant, et était le point le plus contrôlé de JavaScript, mais avec la publication des normes ECMAScript6 et ECMAScript7, ce problème a été très bien résolu, et les deux outils magiques pour résoudre l'enfer du rappel sont l'introduction de `Promise` dans ECMAScript6 et l'introduction de `Promise` dans ECMAScript7. et l'introduction de `async/wait` dans ECMAScript7. Dans Dart, les deux sont presque complètement paniqués en JavaScript : `Future` équivaut à `Promise`, et `async/wait` ne change même pas de nom. Voyons ensuite comment nous pouvons éliminer le problème d'imbrication dans l'exemple ci-dessus en utilisant `Future` et `async/wait`.

##### Éliminer l'enfer des rappels avec Future

```dart
login("alice", "******").then((id){
   return getUserInfo(id);
}).then((userInfo){
    return saveUserInfo(userInfo);
}). then((e){
   //exécute l'action suivante 
}).catchError((e){
  // gestion des erreurs  
  print(e);
});
```

Comme mentionné ci-dessus, *"la valeur de retour de toutes les API de `Future` est toujours un objet `Future` , il est donc facile d'enchaîner les appels "* , si un `Future` est renvoyé dans alors, le `futur` s'exécutera , et la fin de l'exécution déclenchera le Le callback `puis` sera déclenché après l'exécution, de sorte que l'imbrication des couches est évitée en descendant séquentiellement.

#### Éliminer l'enfer des rappels avec async/wait

Existe-t-il un moyen d'exécuter des tâches asynchrones pendant que nous écrivons du code synchrone sans utiliser de rappels ? La réponse est oui, il s'agit d'utiliser `async/wait`, ce qui suit nous regardons directement le code d'abord, puis expliquons, le code est le suivant.

```dart
tâche() asynchrone {
   essayer{
    ID de chaîne = attendre login("alice", "******");
    Chaîne userInfo = attendre getUserInfo(id);
    attendre saveUserInfo(userInfo);
    //exécute l'action suivante   
   } catch(e){
    // gestion des erreurs   
    print(e);   
   }  
}
```

- `async` est utilisé pour indiquer que la fonction est asynchrone, et la fonction définie renvoie un objet `Future` , qui peut être utilisé pour ajouter une fonction de rappel à l'aide de la méthode then.
- `await` est suivi d'un `Future`, qui indique qu'il attend que cette tâche asynchrone se termine et ne s'arrêtera que lorsque l'asynchronie sera terminée ; `wait` doit apparaître dans la fonction `async`.

Comme vous pouvez le voir, nous avons représenté un flux asynchrone en code synchrone par `async/wait`.

> En fait, dans JavaScript et Dart, `async/wait` n'est qu'un sucre syntaxique que le compilateur ou l'interpréteur traduira éventuellement en une chaîne d'appels à une Promise (Future).

### Flux

`Stream` est également utilisé pour recevoir des données d'événements asynchrones, contrairement à `Future`, il peut recevoir le résultat de plusieurs opérations asynchrones (succès ou échec). Autrement dit, lors de l'exécution d'une tâche asynchrone, les données de résultat ou les exceptions d'erreur peuvent être transmises en déclenchant plusieurs fois l'événement de réussite ou d'échec. `Le flux` est souvent utilisé dans des scénarios de tâches asynchrones où les données sont lues plusieurs fois, telles que le téléchargement de contenu réseau, la lecture et l'écriture de fichiers, etc. Par exemple.

```dart
Stream.fromFutures([
  // retourne le résultat après 1 seconde
  Future.delayed(new Duration(seconds: 1), () {
    return "hello 1";
  }),
  // Lance une exception
  Future. delay(new Duration(seconds: 2), () {
    throw AssertionError("Error");
  }),
  // renvoie le résultat après 3 secondes
  Future.delayed(new Duration(seconds: 3), () {
    return "hello 3" ;
  })
]).listen((data){
   print(data);
}, onError : (e){
   print(e.message);
},onDone : () {

});
```

Le code ci-dessus sortira à son tour.

```dart
I/flottement (17666) : bonjour 1
I/flottement (17666) : erreur
I/flottement (17666) : bonjour 3
```

### Héritage (étend)

Les règles d'héritage dans Dart.

- Les sous-classes utilisent le mot clé extend pour hériter de la classe parent
- Les sous-classes héritent des propriétés et des méthodes visibles dans la classe parent, mais pas du constructeur.
- les sous-classes peuvent remplacer les méthodes getter et setter du parent
- les sous-classes remplacent les méthodes de la superclasse avec @override
- les sous-classes appellent des méthodes de superclasse avec super
- Les sous-classes peuvent hériter des variables non privées de la classe parent

### mélanges (avec)

Le mot chinois pour mixins signifie mélanger, ce qui signifie mélanger d'autres fonctions de la classe. Dans Dart, les mixins peuvent être utilisés pour obtenir des fonctionnalités similaires à l'héritage multiple car les conditions d'utilisation des mixins ont changé avec la version Dart, voici les conditions d'utilisation des mixins dans Dart 2.x.

- (1) comme la classe mixins ne peut hériter que de l'objet, ne peut pas hériter des autres classes
- (2) la classe en tant que mixins ne peut pas avoir de constructeur
- (3) une classe peut mélanger plus d'une classe de mixins
- (4) mixins n'est jamais un héritage, ni une interface, mais une toute nouvelle fonctionnalité Regardez le code spécifique.

### implémentation d'interface(implémentations)

  Flutter n'a pas d'interfaces, mais chaque classe de Flutter est une interface implicite qui contient toutes les variables membres et les méthodes définies de la classe. Si vous avez une classe A et que vous voulez que la classe B ait l'API de A, mais que vous ne voulez pas avoir l'implémentation de A, alors vous devez traiter A comme une interface, et la classe B implémente la classe A. Donc dans Flutter : la classe est l'interface

- Lorsqu'une classe est utilisée comme interface, les méthodes de la classe sont les méthodes de l'interface et doivent être réimplémentées dans la sous-classe, avec @override dans l'implémentation de la sous-classe.
- Lorsqu'une classe est utilisée comme interface, les variables membres de la classe doivent également être réimplémentées dans la sous-classe. Ajouter @override devant les variables membres
