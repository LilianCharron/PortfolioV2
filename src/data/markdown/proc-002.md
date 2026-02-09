# Déploiement React + Vite

Guide pour déployer votre application React créée avec Vite.

## Vercel

1. Installer Vercel CLI : `npm i -g vercel`
2. Se connecter : `vercel login`
3. Déployer : `vercel`

## Netlify

1. Build : `npm run build`
2. Drag & drop du dossier `dist` sur netlify.com

## GitHub Pages

```bash
npm run build
git add dist -f
git commit -m "Deploy"
git subtree push --prefix dist origin gh-pages
```
