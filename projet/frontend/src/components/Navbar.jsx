import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Navbar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  function logout() {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
    window.location.reload()
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark navbar-custom mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/accueil">SocialApp</Link>

        <div className="navbar-nav me-auto">
          {user && (
            <>
              <Link className="nav-link" to="/accueil">Accueil</Link>
              <Link className="nav-link" to="/profile">Mon profil</Link>
              <Link className="nav-link" to="/profile/modifier">Modifier mon profil</Link>
            </>
          )}
        </div>

        {user ? (
          <button className="btn btn-danger" onClick={logout}>
            Déconnexion
          </button>
        ) : (
          <Link className="btn btn-outline-light" to="/">
            Connexion
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar