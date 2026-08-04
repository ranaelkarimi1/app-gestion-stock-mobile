# Application de Gestion de Stock

## 📱 Présentation
Application mobile développée pour la gestion de stock d'un entrepôt fictif. Elle permet au gestionnaire de consulter l'état des stocks, d'ajouter ou de modifier des produits, et de gérer les entrées/sorties avec des alertes visuelles instantanées.

## 🚀 Instructions de lancement

Le projet a été initialisé avec Expo pour garantir un lancement rapide sans configuration supplémentaire.

1. Installer les dépendances :
\`\`\`bash
npm install
\`\`\`

2. Lancer l'application :
\`\`\`bash
npx expo start
\`\`\`
*Note : Appuyez sur `w` dans le terminal pour ouvrir la version web, `a` pour l'émulateur Android, ou scannez le QR code avec l'application Expo Go sur votre téléphone.*

## 🛠️ Choix Techniques Justifiés

- **React Native & Expo :** Permet un développement rapide et un test immédiat sur plusieurs plateformes (Web, iOS, Android) sans configuration native complexe.
- **TypeScript (Obligatoire) :** Utilisé pour sécuriser le code avec un typage strict (notamment via l'interface `Product`), ce qui a permis d'éviter les erreurs d'exécution lors du passage des données entre les écrans.
- **Zustand (Gestion d'état) :** Pour simuler le backend et gérer l'état global, j'ai opté pour Zustand au lieu de Redux Toolkit ou `useReducer`. Il est extrêmement léger, nécessite très peu de boilerplate, et permet aux composants de se mettre à jour instantanément (ex: le tableau de bord) avec une syntaxe claire et lisible.
- **React Navigation :** Utilisation de `@react-navigation/native-stack` pour une navigation fluide et intuitive entre la liste, les détails et le formulaire.

## ✨ Fonctionnalités implémentées

- [x] **Liste des produits :** Affichage de l'état du stock avec indicateurs visuels (🟢 Normal, 🟡 Faible, 🔴 Rupture).
- [x] **Recherche :** Barre de filtre dynamique par nom et catégorie.
- [x] **Détails et Mouvements :** Vue détaillée avec boutons d'Entrée (+1) et Sortie (-1).
- [x] **Gestion :** Formulaire de création et de modification de produit avec validation stricte des saisies (nombres positifs requis).
- [x] **Bonus :** Tableau de bord affichant le nombre total de produits, les ruptures et les stocks faibles.