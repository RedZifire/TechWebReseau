import React from 'react'
// Import de React

import EditProfileForm from '../components/EditProfileForm'
// Import du formulaire de modification du profil

function EditProfilePage() {

  // Récupération de l'utilisateur connecté
  // depuis le localStorage
  const user = JSON.parse(localStorage.getItem('user'))

  // Vérifie si un utilisateur est connecté
  // Si non, on affiche un message
  if (!user) {
    return <p>Connecte-toi pour voir cette page.</p>
  }

  return (

    // Container Bootstrap centré
    <div className="row justify-content-center">

      {/* Largeur responsive Bootstrap */}
      <div className="col-12 col-md-8 col-lg-5">

        {/* Formulaire de modification */}
        <EditProfileForm />

      </div>
    </div>
  )
}

export default EditProfilePage