# Systèmes informatiques

## Une visite des systèmes informatiques

Même si nous avons apporté une amélioration substantielle à une grande partie du système, notre accélération nette était nettement inférieure à l'accélération d'une partie.


L'arithmétique des nombres entiers suit toujours un principe : le plus petit s'étend au plus grand. court -> non signé court -> entier -> entier non signé

Flotteur IEEE754 ：https://blog.csdn.net/K346K346/article/details/50487127

Le fichier doit contenir une fonction principale

CF (non signé) t < (non signé) aDébordement non signé \ ZF (t == 0)Zéro \ SF (t < 0)Négatif \ OF (a<0==b<0)&&(t<0! =a<0)Débordement signé

![img.png](img.png)

![Code original et optimisé pour calculer l'élément i, k du produit matriciel pour les tableaux de longueur fixe. Le compilateur effectue ces optimisations automatiquement.](img_1.png) Code original et optimisé pour calculer l'élément i, k du produit matriciel pour les tableaux de longueur fixe. Le compilateur effectue ces optimisations automatiquement.

**Comprendre les pointeurs**

+ Chaque pointeur a un type associé. Le type spécial void * représente un pointeur générique.
+ Chaque pointeur a une valeur. Cette valeur est une adresse d'un objet du type désigné. La valeur specialNULL(0) indique que le pointeur ne pointe nulle part.
+ Les pointeurs sont créés avec l'opérateur '&'. utilise l'instruction leaq pour calculer la valeur de l'expression, puisque cette instruction est conçue pour calculer l'adresse d'une référence mémoire.
+ Les pointeurs sont déréférencés avec l'opérateur '*'. Le résultat est une valeur ayant le type associé au pointeur.
+ Les tableaux et les pointeurs sont étroitement liés. Le référencement de tableau (par exemple,a[3]) a exactement le même effet que l'arithmétique de pointeur et le déréférencement (par exemple,*(a+3)).
+ Passer d'un type de pointeur à un autre modifie son type mais pas sa valeur.
+ Les pointeurs peuvent également pointer vers des fonctions.

