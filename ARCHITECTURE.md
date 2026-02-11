# Architecture du Projet

Cette documentation présente la structure et les flux de données du projet.

## Diagramme des Composants

```mermaid
graph TD
    App[App.tsx] --> ThemeProvider[ThemeContext]
    App --> Router[React Router]

    Router --> Layout[Layout Components]
    Layout --> Header[Header]
    Layout --> Footer[Footer]

    Router --> Pages[Pages]
    Pages --> Home[Home]
    Pages --> CV[CV]
    Pages --> Stage[Stage]
    Pages --> Competences[Compétences]

    Home --> Sections[Home Sections]
    Sections --> Hero[Hero]
    Sections --> Projects[Projects]
    Sections --> Skills[Skills]

    subgraph "Data Layer"
        Data[projects.ts, skills.ts...]
    end

    Pages --> Data
```

## Flux de Données

1. **ThemeContext** : Gère l'état sombre/clair globalement.
2. **React Router** : Gère la navigation entre les pages avec des transitions `framer-motion`.
3. **Data** : Les contenus (projets, compétences) sont centralisés dans `src/data` pour faciliter la maintenance.

## Tests

Les tests sont gérés par **Vitest** et **React Testing Library**.

- Commande : `npm run test`
- Configuration : `vitest.config.ts`
