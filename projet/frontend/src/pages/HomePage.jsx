import React, { useEffect, useState } from 'react'
// Import de React ainsi que des hooks useEffect et useState

import PostCard from '../components/PostCard'
// Import du composant réutilisable pour afficher un post

function HomePage() {

  // Tableau contenant les posts du site
  const [posts, setPosts] = useState([])

  // Récupération de l'utilisateur connecté
  const user = JSON.parse(localStorage.getItem('user'))

  // Fonction qui récupère les posts depuis Flask
  function loadPosts() {

    // Requête GET vers le backend
    fetch('http://127.0.0.1:5001/posts')

      // Conversion de la réponse en JSON
      .then((response) => response.json())

      // Sauvegarde des posts dans le state React
      .then((data) => setPosts(data))
  }

  // useEffect exécuté au chargement de la page
  useEffect(() => {

    // Charge les posts seulement si l'utilisateur est connecté
    if (user) {
      loadPosts()
    }

  }, [])

  // Sécurité :
  // Empêche l'accès à la page sans connexion
  if (!user) {
    return <p>Connecte-toi pour voir cette page.</p>
  }

  return (
    <div>

      <h1>Accueil</h1>

      {/* Système de grille Bootstrap responsive */}
      <div className="row">

        {/* Affichage dynamique des posts */}
        {posts.map((post) => (

          <div className="col-12 col-md-6 col-lg-4" key={post.id}>

            {/* Composant réutilisable */}
            <PostCard post={post} />

          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage