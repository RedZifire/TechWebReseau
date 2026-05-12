import { Link } from 'react-router-dom'

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'))

  function logout() {
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/accueil">SocialApp</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
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
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar