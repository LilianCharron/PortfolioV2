# Installation Complète d'OpenProject sur Debian 12

Ce document décrit la procédure fonctionnelle pour installer OpenProject sur une machine Debian 12 (Bookworm).

## 1. Prérequis

### Configuration minimale

- **OS** : Debian 12 (Bookworm)
- **Accès** : root ou sudo
- **CPU** : 2 vCPU minimum
- **RAM** : 4 Go recommandés (2 Go minimum)
- **Stockage** : 20 Go minimum
- **Réseau** : Accès Internet (HTTP/HTTPS + DNS)

### Vérifications réseau

```bash
ping -c 2 1.1.1.1
ping -c 2 google.com
```

## 2. Mise à jour du système

```bash
apt update
apt install -y apt-transport-https ca-certificates curl gnupg wget
```

## 3. Ajout du dépôt officiel OpenProject

OpenProject utilise un dépôt APT hébergé via Packager.io.

### 3.1 Import de la clé GPG

Clé utilisée : `B6D583CCBD33EEB8`

```bash
# Import de la clé
gpg --keyserver keyserver.ubuntu.com --recv-keys B6D583CCBD33EEB8
gpg --export B6D583CCBD33EEB8 | gpg --dearmor -o /usr/share/keyrings/openproject.gpg

# Vérification
ls -lh /usr/share/keyrings/openproject.gpg
```

### 3.2 Ajout du dépôt APT

Créer le fichier source :

```bash
nano /etc/apt/sources.list.d/openproject.list
```

Ajouter le contenu suivant :

```text
deb [signed-by=/usr/share/keyrings/openproject.gpg] https://dl.packager.io/srv/deb/opf/openproject/stable/17/debian 12 main
```

## 4. Installation

```bash
# Mise à jour de la liste des paquets
apt update

# Installation du paquet
apt install -y openproject
```

> Le paquet installe automatiquement PostgreSQL et prépare le serveur web.

## 5. Configuration Initiale

Lancer l'assistant de configuration :

```bash
openproject configure
```

L'assistant vous guidera pour :

- Choix HTTP/HTTPS
- Configuration du domaine/IP
- Serveur web (Apache/Nginx)
- Création du compte administrateur

## 6. Vérifications

```bash
# Statut du service
systemctl status openproject
```

Accès web via : `http://IP_DU_SERVEUR` ou `https://nom-de-domaine`

## 7. Commandes Utiles

```bash
# Redémarrer
systemctl restart openproject

# Voir les logs
journalctl -u openproject -f
```
