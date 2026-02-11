---
description: How to follow best practices for Git feature branches
---

# Git Feature Branch Workflow

Pour respecter les bonnes pratiques de développement, voici la procédure à suivre pour toute nouvelle fonctionnalité ou correction :

## Étapes de développement

1. **Créer une nouvelle branche** :
   Donnez à la branche un nom descriptif (ex: `feat-design-update` ou `fix-navigation`).

   ```bash
   git checkout -b <nom-de-la-branche>
   ```

2. **Faire les modifications** :
   Apportez les changements demandés sur cette branche.

3. **Vérifier les changements** :
   Testez visuellement ou avec des tests automatisés.

4. **Commit les changements** :

   ```bash
   git add .
   git commit -m "feat/fix: description des changements"
   ```

5. **Pousser la branche sur GitHub** :
   ```bash
   git push -u origin <nom-de-la-branche>
   ```

## Fusion (Merge)

6. **Passer sur la branche principale** :

   ```bash
   git checkout master  # ou main selon le dépôt
   ```

7. **Récupérer les derniers changements** :

   ```bash
   git pull origin master
   ```

8. **Fusionner la branche de fonctionnalité** :

   ```bash
   git merge <nom-de-la-branche>
   ```

9. **Pousser le résultat final** :

   ```bash
   git push origin master
   ```

10. **Supprimer la branche locale** (optionnel) :
    ```bash
    git branch -d <nom-de-la-branche>
    ```

// turbo-all
