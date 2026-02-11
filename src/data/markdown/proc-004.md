# Installation de Zabbix Server 7.0 LTS sur Debian 12

Procédure d'installation pour Debian 12 (Bookworm) en compte root.

## 1. Préparation

```bash
# Connexion root
su -

# Mise à jour système
apt update && apt upgrade -y
```

## 2. Ajout du dépôt Zabbix

```bash
# Téléchargement et installation du dépôt
wget https://repo.zabbix.com/zabbix/7.0/debian/pool/main/z/zabbix-release/zabbix-release_7.0-1+debian12_all.deb
dpkg -i zabbix-release_7.0-1+debian12_all.deb
apt update
```

## 3. Installation MariaDB

```bash
apt install mariadb-server -y

# Sécurisation (recommandé)
mysql_secure_installation
```

## 4. Création de la Base de Données

```sql
mysql -u root -p

CREATE DATABASE zabbix CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
CREATE USER 'zabbix'@'localhost' IDENTIFIED BY 'MOT_DE_PASSE_FORT';
GRANT ALL PRIVILEGES ON zabbix.* TO 'zabbix'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## 5. Installation Zabbix Server

```bash
apt install zabbix-server-mysql zabbix-frontend-php zabbix-apache-conf zabbix-sql-scripts zabbix-agent -y
```

## 6. Import du Schéma DB

```bash
zcat /usr/share/zabbix-sql-scripts/mysql/server.sql.gz | mysql -uzabbix -p zabbix
```

## 7. Configuration Serveur

Éditer `/etc/zabbix/zabbix_server.conf` :

```ini
DBName=zabbix
DBUser=zabbix
DBPassword=MOT_DE_PASSE_FORT
```

> ⚠️ Ne pas laisser DBPassword commenté !

## 8. Démarrage des Services

```bash
systemctl restart zabbix-server zabbix-agent apache2
systemctl enable zabbix-server zabbix-agent apache2
```

## 9. Accès Web

URL : `http://IP_DU_SERVEUR/zabbix`

- **Utilisateur** : Admin
- **Mot de passe** : zabbix
