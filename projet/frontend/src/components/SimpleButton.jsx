import { Link } from 'react-router-dom'

function Navbar() { //on definit navbar 
  const user = JSON.parse(localStorage.getItem('user')) //on prend user du browser et on le convert de JSON en javascript. avec localStorage.getItem on lit la valeur sauvgardé dans le browser

  function logout() { //fonction executée quand on clic logout
    localStorage.removeItem('user') //on remove user du browser
    window.location.href = '/' //on retourne à la page home
  }

  // commence le JSX
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4"> {/* création de la navbar bootstrap*/}
      <div className="container-fluid"> {/* container à largeur pleine */}
        <Link className="navbar-brand" to="/accueil">SocialApp</Link> {/* si on clique sur SocialApp on arrive à l'accueil*/}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        > {/* bouton hamburger pour les écrans petits */}
          <span className="navbar-toggler-icon"></span> {/* montre l'icone avec les 3 barres orizontales pour le menu */}
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu"> {/* menu qui collapse (on le trouve en cliquant le bouton): dedant on a le link pour les differentes pages */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/accueil">Accueil</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profil</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/profile/modifier">Modifier profil</Link>
            </li>
          </ul>

          {user ? (
            <button className="btn btn-outline-light" onClick={logout}>
              Déconnexion
            </button>
          ) : (
            <Link className="btn btn-outline-light" to="/">Connexion</Link>
          )} {/* si le user existe montrer le bouton pour la déconnection sinon on montre "connection" et en cliquant on arriver sur la home */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar //pour pouvoir exporter la page