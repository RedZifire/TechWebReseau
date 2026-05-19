# SocialApp - Projet TechWeb

## TL;DR

### Backend Flask

Ouvrir un terminal dans `backend` :

#### Windows

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

#### Linux / macOS

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app.py
```

Le backend démarre sur :

```txt
http://127.0.0.1:5001
```

---

### Frontend React

Ouvrir un deuxième terminal dans `frontend` :

```bash
cd frontend
npm install
npm run dev
```

Le frontend démarre sur :

```txt
http://127.0.0.1:5173
```

---

# Description du projet

## Présentation

Le projet est un petit réseau social réalisé avec React au frontend et Flask + SQLAlchemy au backend.

Les utilisateurs peuvent :

* créer un compte
* se connecter
* modifier leur profil
* publier des posts avec une image
* commenter les posts
* supprimer leurs posts et commentaires

Le site fonctionne localement avec une base SQLite.

---

# Architecture du projet

```txt
Frontend React
↓ fetch API
Backend Flask
↓ SQLAlchemy
SQLite
```

Le frontend React gère :

* l’affichage
* les routes
* les formulaires
* l’état de l’interface

Le backend Flask gère :

* les données
* la base SQL
* les routes API
* les validations

---

# Fonctionnalités principales

## Authentification

Routes :

* `/`
* `/register`

L’utilisateur peut :

* créer un compte
* se connecter

Les données sont vérifiées dans la base SQLite.

Une session simple est gérée avec `localStorage`.

---

## Page d’accueil

Route :

```txt
*`/accueil`
```

Affiche :

* tous les posts du site
* image du post
* pseudo
* photo de profil
* commentaires

L’utilisateur peut :

* commenter
* supprimer ses propres posts
* accéder au détail d’un post

---

## Profil

Route :

```txt
/profile
```

Affiche :

* informations du profil
* photo de profil
* liste des posts de l’utilisateur

L’utilisateur peut :

* créer un post
* supprimer son post

---

## Modification du profil

Route :

```txt
/profile/modifier
```

L’utilisateur peut modifier :

* son pseudo
* sa photo de profil

Si aucune photo n’est définie :

* une image par défaut est utilisée

---

## Détail d’un post

Route :

```txt
/post/:id
```

Affiche :

* le post complet
* les commentaires

L’utilisateur peut :

* ajouter un commentaire
* supprimer ses commentaires

---

# Cahier des charges respecté

## Frontend React

Le frontend utilise :

* React
* React Router
* composants réutilisables

---

## Minimum 5 routes

Le projet contient :

* `/`
* `/register`
* `/accueil`
* `/profile`
* `/profile/modifier`
* `/post/:id`

---

## Composants réutilisables

Exemples :

* Navbar
* Footer
* PostCard
* CommentCard
* LoginForm
* RegisterForm
* ProfileHeader
* PostForm
* CommentForm
* ProtectedRoute

Le projet contient plus de 10 composants.

---

## Formulaires

Le projet utilise plusieurs formulaires :

* connexion
* inscription
* création de post
* commentaire
* modification du profil

Des validations frontend sont utilisées :

* champs obligatoires
* vérification simple avant envoi

Le backend valide également les données avant insertion SQL.

---

## Gestion d’état React

Le projet utilise :

* `useState`
* `useEffect`
* `localStorage`

Cela permet :

* garder l’utilisateur connecté
* mettre à jour les posts
* gérer les commentaires dynamiquement

---

## Base de données

Le projet utilise SQLite avec SQLAlchemy.

Relations utilisées :

```txt
User 1 → N Posts
User 1 → N Comments
Post 1 → N Comments
```

---

## API Flask

Le backend expose plusieurs routes API REST :

```txt
POST /login
POST /register

GET /posts
POST /posts
DELETE /posts/<id>

POST /posts/<id>/comments
DELETE /comments/<id>

GET /profile/<id>
PUT /profile/<id>
```

Les données sont échangées en JSON avec `jsonify()`.

---

## SCSS / Bootstrap

Le projet utilise :

* Bootstrap
* SCSS personnalisé

Le SCSS contient :

* variables
* mixins
* styles personnalisés

Exemple :

```scss
$primary-color: #6c5ce7;

@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

---

## Responsive

Le site fonctionne pour :

* mobile
* tablette
* desktop

Tests réalisés avec le mode responsive du navigateur.

---

# Important avant rendu

Supprimer :

```txt
backend/venv
frontend/node_modules
backend/__pycache__
```

Ne pas supprimer :

* requirements.txt
* package.json
* package-lock.json

---

# Conclusion

Le projet respecte l’ensemble du cahier des charges demandé :

* React frontend
* Flask backend
* base SQL
* API
* SCSS
* responsive
* composants réutilisables
* formulaires
* gestion d’état
* routes multiples

Le code reste volontairement simple afin d’être facilement compréhensible et proche des concepts vus durant les séries d’exercices.

---

# Auteur

Baptiste Menoud
Projet TechWeb 2026
