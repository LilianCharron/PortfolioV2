# Déploiement Agent Zabbix

Procédure pour installer l'agent Zabbix sur un serveur Linux à superviser.

## 1. Prérequis

- Serveur Zabbix fonctionnel
- Ports ouverts : TCP 10050 (Agent), TCP 10051 (Serveur)

## 2. Installation de l'Agent

```bash
# Ajout du dépôt
wget https://repo.zabbix.com/zabbix/7.0/debian/pool/main/z/zabbix-release/zabbix-release_7.0-1+debian12_all.deb
dpkg -i zabbix-release_7.0-1+debian12_all.deb
apt update

# Installation
apt install zabbix-agent -y
```

## 3. Configuration de l'Agent

Éditer `/etc/zabbix/zabbix_agentd.conf` :

```ini
Server=IP_DU_SERVEUR_ZABBIX
ServerActive=IP_DU_SERVEUR_ZABBIX
Hostname=NOM_DU_SERVEUR
```

> ⚠️ Le **Hostname** doit être strictement identique au nom déclaré dans l'interface Zabbix.

### Démarrage

```bash
systemctl restart zabbix-agent
systemctl enable zabbix-agent
```

## 4. Test de Communication

Depuis le **serveur Zabbix** :

```bash
apt install zabbix-get -y
zabbix_get -s IP_DU_SERVEUR_SURVEILLÉ -k agent.ping
```

> Résultat attendu : `1`

## 5. Déclaration dans Zabbix

1. Aller dans **Collecte de données → Hôtes → Créer un hôte**
2. **Nom de l'hôte** : Doit correspondre au `Hostname` du fichier conf
3. **Interface** :
   - Type : Agent
   - IP : IP_DU_SERVEUR_SURVEILLÉ
   - Port : 10050
4. **Modèle** (Obligatoire) : Ajouter `Linux by Zabbix agent`

L'icône **ZBX** devrait passer au vert après quelques minutes.
