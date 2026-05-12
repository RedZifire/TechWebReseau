# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# SocialApp

## TL;DR

### Backend

cd backend

Windows :
python -m venv venv

Linux / Mac :
python3 -m venv venv

Windows :
venv\Scripts\activate

Linux / Mac :
source venv/bin/activate

pip install -r requirements.txt

python app.py

Backend :
http://127.0.0.1:5000

### Frontend

cd frontend

npm install

npm run dev

Frontend :
http://localhost:5173

---

## Description

SocialApp est un petit réseau social simple réalisé avec React, Flask, SQLAlchemy, SQLite, Bootstrap et SCSS.

L’utilisateur peut :

- créer un profil
- se connecter
- voir son profil
- modifier son pseudo et sa photo de profil
- poster une photo via une URL
- voir les posts du site
- cliquer sur un post
- commenter un post

---

## Routes frontend

- `/` : connexion et création de profil
- `/accueil` : affichage des posts
- `/profile` : profil utilisateur
- `/profile/modifier` : modifier profil
- `/post/:id` : détail d’un post

---

## Routes backend

- `POST /register`
- `POST /login`
- `GET /posts`
- `POST /posts`
- `GET /posts/<id>`
- `POST /posts/<id>/comments`
- `GET /profile/<id>`
- `PUT /profile/<id>`

---

## Modèles

### User

- id
- username
- password
- profile_picture

### Post

- id
- image
- caption
- user_id

### Comment

- id
- content
- user_id
- post_id

Relations :

- User 1 → N Posts
- User 1 → N Comments
- Post 1 → N Comments

---

## Respect du cahier des charges

- React frontend
- Flask + SQLAlchemy backend
- SQLite
- 5 routes frontend
- 10 composants React
- plusieurs formulaires
- validation frontend
- validation backend avec erreurs 400
- SCSS avec variables et mixins
- Bootstrap
- responsive mobile, tablette, desktop