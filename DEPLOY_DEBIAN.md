c# Guide de Déploiement sur Debian 13 (Trixie)

Ce guide explique comment installer Docker et déployer votre portfolio sur un serveur Debian 13.

## 1. Mise à jour du système

Connectez-vous à votre serveur et mettez-le à jour :

```bash
sudo apt update && sudo apt upgrade -y
```

## 2. Installation de Docker

Installez les dépendances nécessaires et Docker :

```bash
# Installation des paquets requis
sudo apt install -y ca-certificates curl gnupg

# Ajout de la clé GPG officielle de Docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Ajout du dépôt Docker
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## 3. Déploiement du projet

Vous pouvez soit cloner votre dépôt Git, soit copier les fichiers via SCP.

### Option : Cloner via Git

```bash
sudo apt install -y git
git clone <URL_DE_VOTRE_DEPOT>
cd <NOM_DU_DOSSIER>/react-portfolio
```

## 4. Lancement du site

Une fois dans le dossier `react-portfolio` (là où se trouvent le `Dockerfile` et le `docker-compose.yml`) :

```bash
sudo docker compose up -d --build
```

## 5. Vérification

Votre site est maintenant accessible sur le port **12347** :
`http://<IP_DE_VOTRE_SERVEUR>:12347`

## Commandes utiles

- **Voir les logs** : `sudo docker compose logs -f`
- **Arrêter le site** : `sudo docker compose down`
- **Taille de l'image** : `sudo docker images`
