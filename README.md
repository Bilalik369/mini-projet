# 📋 To-Do List Application

Une application moderne de gestion de tâches avec notifications en temps réel, construite avec React, Node.js, Socket.IO et MongoDB.

## 🎨 Aperçu du Design

L'application utilise une palette de couleurs harmonieuse basée sur **#9B5DE0** (violet) avec :
- **Design Glassmorphism** : Transparence et effets de flou
- **Animations fluides** : Transitions et effets hover élégants
- **Système de notifications** : Badge en temps réel comme Facebook
- **Interface responsive** : Adaptée à tous les appareils

## 🚀 Fonctionnalités

### ✨ Authentification
- **Inscription** avec validation complète
- **Connexion** sécurisée avec JWT
- **Protection des routes** privées

### 📝 Gestion des Tâches
- **Créer** des tâches avec titre, description, priorité et date d'échéance
- **Modifier** les tâches en temps réel
- **Marquer** comme terminées/en cours/en attente
- **Supprimer** avec confirmation
- **Filtrer** par statut et priorité
- **Rechercher** dans les titres et descriptions

### 🔔 Système de Notifications
- **Notifications en temps réel** via Socket.IO
- **Badge avec compteur** sur l'icône de notification
- **Marquer comme lu** individuellement ou en groupe
- **Types de notifications** : Succès, Info, Alertes
- **Historique complet** des notifications

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** - Interface utilisateur
- **React Router** - Navigation
- **Zustand** - Gestion d'état
- **Tailwind CSS** - Styles et design
- **Lucide React** - Icônes modernes
- **Socket.IO Client** - Communications temps réel
- **Axios** - Requêtes HTTP

### Backend
- **Node.js** - Serveur
- **Express.js** - Framework web
- **MongoDB** - Base de données
- **Mongoose** - ODM pour MongoDB
- **Socket.IO** - WebSocket temps réel
- **JWT** - Authentification
- **bcrypt** - Hachage des mots de passe
- **CORS** - Gestion des origines croisées

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 16 ou supérieure)
- **npm** ou **yarn**
- **MongoDB** (local ou cloud - MongoDB Atlas)
- **Git**

## 🔧 Installation et Configuration

### 1. Cloner le Projet

\`\`\`bash
git clone <url-du-repo>
cd 2caB
\`\`\`

### 2. Configuration du Backend

#### Installer les Dépendances
\`\`\`bash
cd backend
npm install
\`\`\`

#### Configurer les Variables d'Environnement
Créez un fichier \`.env\` dans le dossier \`backend\` :

\`\`\`bash
# Créer le fichier .env
cd backend
touch .env  # Sur macOS/Linux
# ou créez le fichier manuellement sur Windows
\`\`\`

Contenu du fichier \`.env\` :

\`\`\`env
# Port du serveur
PORT=4000

# Base de données MongoDB
MONGO=mongodb://localhost:27017/todoapp
# Ou pour MongoDB Atlas :
# MONGO=mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority

# JWT Configuration (CHANGEZ CETTE CLÉ EN PRODUCTION!)
JWT_SECRET=votre-cle-secrete-jwt-tres-longue-et-securisee-changez-cette-valeur
JWT_EXPIRE=7d

# URL du client (frontend)
CLIENT_URL=http://localhost:3000

# Environnement
NODE_ENV=development
\`\`\`

⚠️ **Important** : Ne partagez jamais votre fichier \`.env\` ! Il contient des informations sensibles.

### 3. Configuration du Frontend

#### Installer les Dépendances
\`\`\`bash
cd frontend
npm install
\`\`\`

## 🚀 Démarrage de l'Application

### 1. Démarrer MongoDB

#### Option A : MongoDB Local
\`\`\`bash
# Sur Windows
net start MongoDB

# Sur macOS/Linux
sudo systemctl start mongod
# ou
brew services start mongodb-community
\`\`\`

#### Option B : MongoDB Atlas (Cloud)
1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Créez un cluster gratuit
3. Obtenez votre chaîne de connexion
4. Mettez à jour la variable \`MONGO\` dans le fichier \`.env\`

### 2. Démarrer le Backend

\`\`\`bash
cd backend
npm start
# ou pour le développement avec auto-reload :
npm run dev
\`\`\`

Le serveur backend sera accessible sur : **http://localhost:4000**

### 3. Démarrer le Frontend

Dans un nouveau terminal :

\`\`\`bash
cd frontend
npm start
\`\`\`

L'application frontend sera accessible sur : **http://localhost:3000**

## ⚡ Démarrage Rapide

Pour démarrer rapidement tout le projet :

\`\`\`bash
# 1. Installer toutes les dépendances
npm run install:all

# 2. Créer le fichier .env dans backend/ (voir section Configuration)

# 3. Démarrer MongoDB (local ou Atlas)

# 4. Démarrer l'application complète
npm run dev
\`\`\`

## 🧪 Guide de Test

### 1. Test de l'Authentification

#### Inscription
1. Allez sur **http://localhost:3000**
2. Cliquez sur **"S'inscrire"**
3. Remplissez le formulaire :
   - **Nom complet** : bilal
   - **Email** : bilal@gmail.com
   - **Téléphone** : +212 6XX XXX XXX
   - **Adresse** : Casablanca, Maroc
   - **Mot de passe** : motdepasse123
   - **Confirmer** : motdepasse123
4. Cliquez sur **"S'inscrire"**

#### Connexion
1. Utilisez les identifiants créés
2. Vérifiez la redirection vers la page des tâches

### 2. Test de Gestion des Tâches

#### Créer une Tâche
1. Cliquez sur **"Nouvelle tâche"**
2. Remplissez :
   - **Titre** : "Terminer le projet"
   - **Description** : "Finaliser tous les tests"
   - **Priorité** : Haute
   - **Date d'échéance** : Demain
3. Cliquez sur **"Ajouter"**

#### Modifier une Tâche
1. Cliquez sur l'icône **✏️** d'une tâche
2. Modifiez les informations
3. Cliquez sur **"Sauvegarder"**

#### Filtrer les Tâches
1. Utilisez les filtres de **statut** et **priorité**
2. Testez la **barre de recherche**

### 3. Test des Notifications

#### Notifications Automatiques
1. Créez une nouvelle tâche
2. Vérifiez que le **badge rouge** apparaît sur l'icône 🔔
3. Cliquez sur l'icône pour voir les notifications

#### Marquer comme Lu
1. Dans la page notifications, cliquez sur **✓** pour une notification
2. Vérifiez que le badge diminue
3. Testez **"Tout marquer comme lu"**

### 4. Test des Fonctionnalités Temps Réel

#### Socket.IO (Optionnel - Nécessite 2 navigateurs)
1. Ouvrez l'application dans **2 onglets différents**
2. Connectez-vous avec le **même compte**
3. Créez une tâche dans un onglet
4. Vérifiez que la notification apparaît dans l'autre onglet

### 5. Checklist de Vérification

Utilisez cette checklist pour vous assurer que tout fonctionne :

#### ✅ Backend
- [ ] MongoDB est démarré et accessible
- [ ] Le serveur backend démarre sans erreur sur le port 4000
- [ ] Les logs montrent "Base de données connectée"
- [ ] Les logs montrent "Server is running on port 4000"

#### ✅ Frontend
- [ ] L'application React démarre sur le port 3000
- [ ] Les pages de connexion et inscription s'affichent correctement
- [ ] Les couleurs violettes (#9B5DE0) sont appliquées
- [ ] Aucune erreur dans la console du navigateur

#### ✅ Fonctionnalités
- [ ] Inscription d'un nouvel utilisateur
- [ ] Connexion avec les identifiants créés
- [ ] Création d'une nouvelle tâche
- [ ] Modification d'une tâche existante
- [ ] Suppression d'une tâche
- [ ] Badge de notifications sur l'icône 🔔
- [ ] Navigation entre les pages

## 🐛 Résolution des Problèmes

### Problèmes Courants

#### 1. Erreur de Connexion MongoDB
\`\`\`
Error: connect ECONNREFUSED 127.0.0.1:27017
\`\`\`
**Solution** : Vérifiez que MongoDB est démarré

#### 2. Erreur CORS
\`\`\`
Access to XMLHttpRequest blocked by CORS policy
\`\`\`
**Solution** : Vérifiez que \`CLIENT_URL\` dans \`.env\` correspond à l'URL du frontend

#### 3. JWT Error
\`\`\`
JsonWebTokenError: invalid token
\`\`\`
**Solution** : Supprimez le localStorage et reconnectez-vous

#### 4. Port Déjà Utilisé
\`\`\`
Error: listen EADDRINUSE :::4000
\`\`\`
**Solution** : Changez le port dans \`.env\` ou arrêtez le processus :
\`\`\`bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:4000 | xargs kill -9
\`\`\`

### Réinitialisation Complète

Si vous rencontrez des problèmes persistants :

\`\`\`bash
# Supprimer node_modules et réinstaller
cd backend && rm -rf node_modules && npm install
cd ../frontend && rm -rf node_modules && npm install

# Vider le cache du navigateur
# Ou utiliser le mode incognito

# Redémarrer MongoDB
# Vérifier les variables d'environnement
\`\`\`

## 📁 Structure du Projet

\`\`\`
2caB/
├── backend/
│   ├── controllers/          # Logique métier
│   │   ├── auth.controller.js
│   │   └── task.controller.js
│   ├── models/              # Modèles MongoDB
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/              # Routes API
│   │   ├── auth.route.js
│   │   └── task.route.js
│   ├── middleware/          # Middlewares
│   │   └── auth.middleware.js
│   ├── events/              # Socket.IO events
│   │   └── taskEvents.js
│   ├── lib/                 # Utilitaires
│   │   └── db.js
│   ├── server.js            # Point d'entrée
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   ├── pages/           # Pages principales
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── Notifications.jsx
│   │   ├── store/           # Gestion d'état
│   │   │   └── taskStore.js
│   │   ├── api/             # Configuration API
│   │   │   └── axios.js
│   │   ├── socket.js        # Configuration Socket.IO
│   │   └── App.js
│   ├── tailwind.config.js   # Configuration Tailwind
│   └── package.json
└── README.md
\`\`\`

## 🎯 API Endpoints

### Authentification
- \`POST /api/auth/register\` - Inscription
- \`POST /api/auth/login\` - Connexion
- \`GET /api/auth/me\` - Profil utilisateur

### Tâches
- \`GET /api/tasks\` - Lister les tâches
- \`POST /api/tasks\` - Créer une tâche
- \`GET /api/tasks/:id\` - Obtenir une tâche
- \`PUT /api/tasks/:id\` - Modifier une tâche
- \`DELETE /api/tasks/:id\` - Supprimer une tâche

### WebSocket Events
- \`task:created\` - Nouvelle tâche créée
- \`task:updated\` - Tâche modifiée
- \`task:deleted\` - Tâche supprimée

## 👨‍💻 Pour les Développeurs

### Scripts NPM Disponibles

\`\`\`bash
# Installation complète
npm run install:all

# Démarrage en développement (avec auto-reload)
npm run dev

# Démarrage en production
npm start

# Backend seulement
npm run start:backend
npm run dev:backend

# Frontend seulement  
npm run start:frontend
npm run dev:frontend

### Structure des Données

#### Modèle Utilisateur
\`\`\`javascript
{
  fullName: String,
  email: String (unique),
  password: String (hashé),
  phoneNumber: String,
  address: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

#### Modèle Tâche
\`\`\`javascript
{
  title: String (requis),
  description: String,
  status: "pending" | "in-progress" | "completed",
  priority: "low" | "medium" | "high",
  dueDate: Date,
  userId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Palette de Couleurs

\`\`\`css
/* Couleur principale */
--primary-500: #9B5DE0

/* Palette complète */
primary: {
  50: '#f4f1ff',
  100: '#ebe5ff', 
  200: '#d9ceff',
  300: '#bea6ff',
  400: '#9f75ff',
  500: '#9B5DE0', /* Couleur principale */
  600: '#7c3aed',
  700: '#6d28d9',
  800: '#5b21b6',
  900: '#4c1d95'
}
\`\`\`

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier \`LICENSE\` pour plus de détails.

## 👥 Auteurs

- **Votre Nom** - Développement initial

## 🙏 Remerciements

- **Tailwind CSS** pour le système de design
- **Lucide React** pour les icônes
- **Socket.IO** pour les communications temps réel
- **MongoDB** pour la base de données
