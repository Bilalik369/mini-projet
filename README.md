# 📋 To-Do List App

Application moderne de gestion de tâches avec notifications en temps réel.

## 🎨 Aperçu

- **Design moderne** avec palette violette (#9B5DE0)
- **Notifications temps réel** avec badge compteur
- **Interface responsive** et intuitive
- **Authentification sécurisée** avec JWT

## 🚀 Démarrage Rapide

### Prérequis
- Node.js (v16+)
- MongoDB (local ou Atlas)
- npm ou yarn

### Installation

```bash
# 1. Cloner le projet
git clone <url-du-repo>
cd 2caB

# 2. Installer les dépendances
npm run install:all

# 3. Configurer l'environnement
cd backend
# Créer .env (voir section Configuration)

# 4. Démarrer l'application
npm run dev
```

**URLs** :
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## ⚙️ Configuration

### Fichier `.env` (backend)

```env
PORT=4000
MONGO=mongodb://localhost:27017/todoapp
JWT_SECRET=votre-cle-secrete-jwt-longue-et-securisee
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### MongoDB Options

**Option 1 - Local** :
```bash
# Windows
net start MongoDB

# macOS/Linux  
brew services start mongodb-community
```

**Option 2 - Atlas (Cloud)** :
1. Créer un compte sur [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Créer un cluster gratuit
3. Obtenir la chaîne de connexion
4. Remplacer `MONGO` dans `.env`

## 🧪 Test de l'Application

### 1. Authentification
```
📝 Inscription: Nom, Email, Téléphone, Adresse, Mot de passe
🔐 Connexion: Email + Mot de passe
```

### 2. Gestion des Tâches
```
➕ Créer: Titre, Description, Priorité, Date d'échéance
✏️ Modifier: Tous les champs éditables
✅ Statuts: En attente → En cours → Terminée
🗑️ Supprimer: Avec confirmation
🔍 Filtrer: Par statut, priorité, recherche
```

### 3. Notifications
```
🔔 Badge: Compteur sur l'icône (comme Facebook)
👁️ Marquer comme lu: Individuellement ou en groupe
📱 Temps réel: Notifications instantanées
```

## 🛠️ Technologies

### Frontend
- React 18, React Router, Zustand
- Tailwind CSS, Lucide Icons
- Socket.IO Client, Axios

### Backend  
- Node.js, Express, MongoDB
- Socket.IO, JWT, bcrypt
- Mongoose ODM

## 📁 Structure

```
2caB/
├── backend/
│   ├── controllers/     # Logique métier
│   ├── models/         # Modèles MongoDB  
│   ├── routes/         # Routes API
│   ├── middleware/     # Middlewares
│   └── server.js       # Point d'entrée
├── frontend/
│   └── src/
│       ├── pages/      # Pages principales
│       ├── store/      # Gestion d'état
│       └── api/        # Configuration API
└── README.md
```

## 🐛 Problèmes Courants

### MongoDB Connection Error
```bash
# Vérifier que MongoDB est démarré
net start MongoDB  # Windows
brew services start mongodb-community  # macOS
```

### Port Déjà Utilisé
```bash
# Changer le port dans .env ou tuer le processus
netstat -ano | findstr :4000  # Windows
lsof -ti:4000 | xargs kill -9  # macOS/Linux
```

### CORS Error
```bash
# Vérifier CLIENT_URL dans backend/.env
CLIENT_URL=http://localhost:3000
```

## 📋 Scripts NPM

```bash
npm run install:all    # Installer toutes les dépendances
npm run dev           # Développement (auto-reload)
npm run start         # Production
npm run build         # Build frontend
```

## 🎯 API Endpoints

```
POST /api/auth/register    # Inscription
POST /api/auth/login       # Connexion
GET  /api/tasks           # Lister tâches
POST /api/tasks           # Créer tâche
PUT  /api/tasks/:id       # Modifier tâche
DELETE /api/tasks/:id     # Supprimer tâche
```

## ✅ Checklist de Vérification

**Backend** :
- [ ] MongoDB connecté
- [ ] Serveur sur port 4000
- [ ] Logs sans erreur

**Frontend** :
- [ ] React sur port 3000  
- [ ] Design violet appliqué
- [ ] Aucune erreur console

**Fonctionnalités** :
- [ ] Inscription/Connexion
- [ ] CRUD des tâches
- [ ] Badge notifications
- [ ] Temps réel Socket.IO

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements  
4. Push et ouvrir une PR

## 📄 Licence

MIT License - Voir `LICENSE` pour détails.

---

**Développé avec ❤️ et React**