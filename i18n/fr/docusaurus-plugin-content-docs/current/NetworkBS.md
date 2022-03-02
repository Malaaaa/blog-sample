# Réseau informatique de base

## Hiérarchie du réseau

### Modèle à sept couches

Couche application : protocole APP pour la couche application Couche représentation : conversion du binaire reconnu par ordinateur en données reconnues par l'homme Couche session : analyse de l'état de communication des données Couche transport : processus et communication inter-processus (informations de port) Couche réseau : passe hôte à hôte (adresse IP) Couche de liaison de données : données de trame complètes envoyées et reçues (transmises indépendamment sur le réseau) adresse MAC (adresse de l'appareil) Couche physique : pas l'appareil physique, mais le type d'interface sur l'appareil physique, la force du courant

### Protocole à 4 couches : couche de protocole TCP/IP

Couche application : les protocoles pour la couche application sont FTP、Telnet、HTTP Couche transport (couche transport) : processus et communication inter-processus (informations de port) TCP, UDP Couche réseau : passe hôte à hôte (adresse IP) IP , ICMP Couche liaison : trame complète des données envoyées et reçues (transmises indépendamment sur le réseau) adresse mac (adresse de l'appareil) ARP RARP

![image-20210107235436362](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/image-20210107235436362.png)

![image-20210108131350452](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/image-20210108131350452.png)

- **Protocole IP Protocole inter-réseaux (Couche réseau)**

La transmission de paquets**(paquets Internet)** de l'adresse source **à la destination sur un système de réseau interconnecté fournit les fonctionnalités nécessaires** **protocole capable** Essayer d'envoyer des données de l'adresse source à la destination Caractéristiques. **Non fiable**: il ne garantit pas qu'un paquet IP atteindra sa destination avec succès et ne fournit qu'une transmission au mieux **Sans connexion**: IP ne conserve aucune information sur l'état des paquets suivants. Chaque paquet est traité indépendamment les uns des autres. Les paquets IP peuvent être reçus dans le désordre **Les paquets IP contiennent l'adresse IP de l'hôte qui les envoie (adresse source) et l'adresse IP de l'hôte qui les reçoit (adresse de destination)**

- **TCP est un protocole de communication de couche transport fiable et orienté connexion**.

**Fonctions**. Assure la communication entre **processus sur différents hôtes** **Caractéristiques**.

1. établir le lien->utiliser le lien->libérer le lien (circuit virtuel)
2. Les paquets TCP contiennent des numéros de série et des numéros de série d'accusé de réception
3. les paquets sont triés et les erreurs vérifiées, tandis que les paquets corrompus peuvent être retransmis

**Objet de service** Protocole UDP User Datagram Protocol (couche transport)

Services nécessitant grande et tels que HTTP, SMTP, etc.

- **Protocole UDP Protocole de datagramme utilisateur (couche transport)**

UDP est un protocole de communication de couche de transport orienté **sans connexion**

**Fonctionnalité**. Fournit **communication inter-processus** sur différents hôtes Caractéristiques

1. aucun lien n'a besoin d'être établi avant l'envoi des données
2. pas de vérification de l'ordre des paquets
3. aucun mécanisme de détection et de retransmission des erreurs

Objet de service Principalement utilisé pour les services "requête-réponse" Tels que : NFS, NTP, DNS, etc. Résumé : UDP **pas de connexion** pas de séquençage, pas de vérification d'erreur, pas de retransmission, rapide, prise en charge de la diffusion

## Présentation de l'adresse

- **adresse mac (couche de liaison) Appareil et communication d'appareil**

Adresse MAC, utilisée pour identifier les périphériques réseau, similaire à un numéro d'identification, et théoriquement unique au monde. Composition : l'adresse MAC dans Ethernet est une valeur de 48 bits

![image-20210108195656267](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/image-20210108195656267.png")

- **Adresse IP IPv4 (couche réseau) hôte et hôte 32 bits**

Composition de l'adresse IP : utilisez 32 bits, composé de deux parties {network ID, host ID} ID de sous-réseau : les bits consécutifs de l'adresse IP couverts par 1 dans le masque de sous-réseau ID d'hôte : les bits consécutifs de l'adresse IP couverts par 0 dans le masque de sous-réseau

![image-20210108143050377](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/image-20210108143050377.png)

IP et masque de sous-réseau utilisés ensemble.

192.168.0.111/255.255.255.0 == 192.168.0.111/24 192.168.0.111/255.255.0.0 == 192.168.0.111/16 192.168.0.111/255.0.0.0 == 192.1

**caractéristiques de l'adresse IP** : les différents segments du réseau ne peuvent pas communiquer directement

Les réseaux avec différents ID de sous-réseau ne peuvent pas communiquer directement, s'ils veulent communiquer, ils doivent être transférés par le routeur adresses IP avec tous les 0 ID d'hôte représentent les adresses de segment de réseau. L'adresse IP avec l'ID d'hôte de 1 indique l'adresse de diffusion du segment de réseau.

Exemple : 192.168.0.111/255.255.255.0 Demander l'adresse IP actuelle du segment __192.168.0.0__ et l'adresse de diffusion __192.168.0.0__. adresse __192.168.0.255__

Remarque : Ni l'adresse de segment ni l'adresse de diffusion dans l'un des segments ne peuvent être attribuées à un hôte 192.168.0.1~192.168.0.254 == le nombre d'adresses IP disponibles n'est que de 254 Cas : 192.168.0.111/255.255.0.0 Demander l'adresse de segment _192.168.0.0_ et l'adresse de diffusion _192.168.255.0.0_ de l'adresse IP actuelle_192.168.255.255_ hôtes disponibles 1~65534 == nombre d'IP disponibles uniquement 65534

- **Classification des adresses IP (utilisation plus raisonnable des adresses IP)**

Adresse de classe A : ID de sous-réseau 8 bits par défaut, le premier est 0 WAN (pays - pays, grande ville - grande ville) 0xxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx/255.0.0.0 Adresse de classe B : ID de sous-réseau 16 bits par défaut, les deux premiers chiffres sont 10 MAN (ville-ville) 10xx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx/255.255.0.0 Adresse de classe C : ID de sous-réseau 24 bits par défaut, les trois premiers chiffres sont 110 110x xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx/255.255.255.0 LAN Adresse de classe D : les quatre premiers bits sont 1110, adresse de multidiffusion Adresse de classe E : les cinq premiers bits sont 11110, réservés pour une utilisation future

Les adresses de classe A, B, C sont les plus couramment utilisées

IP publique (peut être directement connectée à Internet) IP unifiée par InterNIC IP privée (non directement connectée à Internet) Principalement utilisée pour la planification de la connexion hôte dans le réseau local

![image-20210108202556176](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/image-20210108202556176.png)

**Adresse de bouclage** ![image-20210108203054234](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/image-20210108203054234.png)

Fonction L'objectif principal est de tester la configuration réseau de cette machine, pouvoir envoyer un ping via 127.0.0.1 signifie Cela signifie qu'il n'y a aucun problème avec l'installation de la carte réseau et du protocole IP sur cette machine. Remarque Toute adresse dans 127.0.0.1~127.255.255.254 sera bouclée vers l'hôte local n'appartient à aucune des catégories d'adresses classées, elle représente l'interface virtuelle locale du périphérique Définissez l'IP Linux sudo ifconfig eth0 192.168 .0.222 masque réseau 255.255.255.0

**masque de sous-réseau** (également appelé masque de réseau, masque d'adresse) est une valeur de 32 bits composée de 1 et 0, et 1 et 0 sont consécutifs. Caractéristiques:

- Doit être utilisé conjointement avec l'adresse IP, ne peut pas exister seul
- Les bits consécutifs de l'adresse IP couverts par 1 dans le masque de sous-réseau sont l'ID de sous-réseau et les autres sont l'ID d'hôte.

**numéro de port**: similaire à un pid pour identifier un processus ; dans un programme réseau, le numéro de port est utilisé pour identifier un programme réseau en cours d'exécution

![image-20210108203342082](https://raw.githubusercontent.com/Malaaaa/cloudimage/master/image-20210108203342082.png) **Caractéristiques**

1. Le numéro de port est un type entier court non signé
2. Chaque port a un numéro de port
3. TCP, UDP conservent leur propre numéro de port indépendant
4. Les applications réseau doivent occuper au moins un numéro de port, mais peuvent également occuper plusieurs numéros de port

- Classement des ports

**Ports bien connus** (1~1023) Attribués uniformément par l'IANA (Internet Assigned Numbers Authority) en fonction des besoins de l'utilisateur Par exemple : FTP-21, HTTP-80, etc. La plage normalement utilisée par les serveurs ; si l'utilisation est forcée, le privilège root doit être ajouté **Port dynamique** (1024~65535) La plage normalement utilisée par les applications Remarque Le numéro de port est similaire au numéro de processus, un seul processus peut être marqué à la fois Peut être utilisé à plusieurs reprises
