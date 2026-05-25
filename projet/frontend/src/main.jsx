import React from 'react' 
// Import de React

import ReactDOM from 'react-dom/client'
// Permet d'afficher React dans la page HTML

import App from './App' 
// Import du composant principal

import 'bootstrap/dist/css/bootstrap.min.css' 
// Import de Bootstrap pour le style

import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Import des fonctionnalités Bootstrap (navbar responsive, boutons, etc.)

import './styles/main.scss'
// Import de notre fichier SCSS personnalisé

// On affiche toute l'application React
// dans la div "root" du fichier index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)