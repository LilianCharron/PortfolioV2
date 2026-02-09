# Déploiement d'un Serveur DHCP Professionnel

Ce guide complet vous accompagne dans la mise en place d'un serveur DHCP robuste pour votre infrastructure réseau d'entreprise.

## Vue d'ensemble

> **Qu'est-ce que DHCP ?**
> Le Dynamic Host Configuration Protocol (DHCP) est un protocole permettant d'attribuer automatiquement des adresses IP aux équipements réseau.

### Avantages
- Gestion centralisée des adresses IP
- Automatisation de la configuration réseau
- Réduction des erreurs de configuration
- Allocation dynamique des adresses

## Prérequis Système

- **Système** : Windows Server 2019 ou 2022
- **Droits** : Administrateur du domaine ou du serveur
- **Réseau** : Adresse IP statique configurée
- **RAM** : Minimum 2 GB disponible

### Configuration IP statique

Exemple pour réseau 192.168.1.0/24 :

```powershell
New-NetIPAddress -InterfaceAlias "Ethernet" -IPAddress 192.168.1.10 -PrefixLength 24 -DefaultGateway 192.168.1.1
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses 192.168.1.10,8.8.8.8
```

## Installation du Rôle DHCP

### Via PowerShell

```powershell
# Installation
Install-WindowsFeature -Name DHCP -IncludeManagementTools

# Vérification
Get-WindowsFeature -Name DHCP

# Redémarrage du service
Restart-Service DHCPServer
```

## Configuration Post-Installation

### Authorisation dans Active Directory

```powershell
Add-DhcpServerInDC -DnsName "SRV-DHCP01.entreprise.local" -IPAddress 192.168.1.10
Get-DhcpServerInDC
```

### Groupes de Sécurité

```powershell
Add-DhcpServerSecurityGroup -ComputerName "SRV-DHCP01"
Restart-Service DHCPServer
```

## Création d'une Étendue DHCP

```powershell
# Nouvelle étendue
Add-DhcpServerv4Scope `
    -Name "LAN Principal" `
    -StartRange 192.168.1.100 `
    -EndRange 192.168.1.200 `
    -SubnetMask 255.255.255.0 `
    -State Active `
    -LeaseDuration 8.00:00:00

# Passerelle
Set-DhcpServerv4OptionValue -ScopeId 192.168.1.0 -Router 192.168.1.1

# DNS
Set-DhcpServerv4OptionValue -ScopeId 192.168.1.0 -DnsServer 192.168.1.10,8.8.8.8

# Domaine
Set-DhcpServerv4OptionValue -ScopeId 192.168.1.0 -DnsDomain "entreprise.local"
```

## Exclusions

```powershell
Add-DhcpServerv4ExclusionRange -ScopeId 192.168.1.0 -StartRange 192.168.1.1 -EndRange 192.168.1.50
```

## Réservations

```powershell
Add-DhcpServerv4Reservation `
    -ScopeId 192.168.1.0 `
    -IPAddress 192.168.1.150 `
    -ClientId "00-11-22-33-44-55" `
    -Name "Imprimante-Bureau"
```

## Vérification

```powershell
# Étendues
Get-DhcpServerv4Scope

# Baux
Get-DhcpServerv4Lease -ScopeId 192.168.1.0

# Statistiques
Get-DhcpServerv4Statistics
```

## Tests

```powershell
ipconfig /renew
ipconfig /all
```

## Dépannage

### Pas d'adresse IP

```powershell
Get-DhcpServerInDC
Get-Service DHCPServer
Restart-Service DHCPServer
```

## Bonnes Pratiques

### Sauvegarde

```powershell
Export-DhcpServer -File "C:\Backups\DHCP-backup.xml" -Force
```

### Haute Disponibilité

```powershell
Add-DhcpServerv4Failover `
    -Name "Failover-Principal" `
    -ScopeId 192.168.1.0 `
    -PartnerServer "SRV-DHCP02.entreprise.local" `
    -LoadBalancePercent 50
```

## Ressources

- **Documentation Microsoft** : docs.microsoft.com/windows-server/networking/technologies/dhcp/
- **PowerShell DHCP** : docs.microsoft.com/powershell/module/dhcpserver/
- **RFC 2131** : tools.ietf.org/html/rfc2131

Votre serveur DHCP est maintenant opérationnel !
