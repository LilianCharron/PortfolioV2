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

## 6. Activation du HTTPS (Optionnel)

Le projet inclut une configuration **Caddy** pour obtenir des certificats SSL (Let's Encrypt) automatiquement.

1.  **Avoir un nom de domaine** : Faites pointer votre domaine (ex: `portfolio.lilian.com`) vers l'IP de votre serveur.
2.  **Configurer le domaine** :
    *   Ouvrez le fichier `Caddyfile`.
    *   Remplacez `votre-domaine.com` par votre vrai domaine.
3.  **Activer les services** :
    *   Dans `docker-compose.yml`, décommentez la section `caddy`.
    *   Commentez ou supprimez la section `ports` du service `portfolio` (Caddy s'occupe de l'exposition sur les ports 80/443).
4.  **Redémarrer** :
    ```bash
    sudo docker compose up -d --build
    ```

## Commandes utiles
- **Voir les logs** : `sudo docker compose logs -f`
- **Arrêter le site** : `sudo docker compose down`
- **Logs Caddy** : `sudo docker compose logs -f caddy`
