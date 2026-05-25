import React from 'react'
// Import de React

import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Import du système de routes React

import Navbar from './components/Navbar'
// Import de la barre de navigation

import Footer from './components/Footer'
// Import du footer

// Import des différentes pages du site
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import PostDetailsPage from './pages/PostDetailsPage'

function App() {

  // Composant principal du site
  // Il contient les routes React
  // ainsi que les composants visibles partout

  return (

    // BrowserRouter permet la navigation entre les pages
    <BrowserRouter>

      {/* Navbar affichée sur toutes les pages */}
      <Navbar />

      <main className="container mt-4">

        {/* Définition des routes du site */}
        <Routes>

          {/* Page de connexion */}
          <Route path="/" element={<LoginPage />} />

          {/* Page d'inscription */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Page d'accueil avec tous les posts */}
          <Route path="/accueil" element={<HomePage />} />

          {/* Page du profil utilisateur */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Modification du profil */}
          <Route path="/profile/modifier" element={<EditProfilePage />} />

          {/* Détails d'un post avec commentaires */}
          <Route path="/post/:id" element={<PostDetailsPage />} />

        </Routes>
      </main>

      {/* Footer affiché sur toutes les pages */}
      <Footer />

    </BrowserRouter>
  )
}

export default App