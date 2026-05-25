import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Navbar() { //on définit la composante navbar avec une variable que react met à jour grâce à useState
  const [user, setUser] = useState(null) //état null car pour le momenti il y a personne connecté
  const navigate = useNavigate() //fonction navigate pour changer de page

  useEffect(() => { //code à executer une seule fois (quand la composante est chargé ou certaines variables changent)
    const savedUser = localStorage.getItem('user') //prend du browser la donné user
    if (savedUser) {
      setUser(JSON.parse(savedUser)) //on controlle sii ça existe un utent sauvagrdé et on convert la sring JSON en objet Javascript
    }
  }, [])

  function logout() { //fonction executé quand on clique sur le bouton déconnexion
    localStorage.removeItem('user') //on enlève l'utent du browser
    setUser(null) //on met à jour l'état de user
    navigate('/') //on retourne à la home page
    window.location.reload() //recharger complètement la page
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark navbar-custom mb-4"> {/* creation de la navbar avec bootstrap */}
      <div className="container-fluid">  {/* container bootstrap à largeur pleine */}
        <Link className="navbar-brand" to="/accueil">SocialApp</Link> {/*pour pouvoir cliquer sur SocialApp et arriver sur accueil */}

        <div className="navbar-nav me-auto"> {/* si le user existe (user &&) on montre sur la navbar: (et en cliquant on est envoyées sur des differentes pages) */}
          {user && (
            <>
              <Link className="nav-link" to="/accueil">Accueil</Link>
              <Link className="nav-link" to="/profile">Mon profil</Link>
              <Link className="nav-link" to="/profile/modifier">Modifier mon profil</Link>
            </> 
          )} {/* <> sert pour regrouper plusieurs éléments sans créer un div*/}
        </div>

        {user ? (
          <button className="btn btn-danger" onClick={logout}>
            Déconnexion
          </button>
        ) : (
          <Link className="btn btn-outline-light" to="/">
            Connexion
          </Link>
        )} {/* bouton pour se déconnecter (si le user existe) sinon (:) montre connection et en cliquant dessus on arrive sur la home */}
      </div>
    </nav>
  )
}

export default Navbar //pour pouvoir importer la page