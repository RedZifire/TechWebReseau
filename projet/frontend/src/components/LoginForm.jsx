import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    if (!username || !password) {
      setError('Tous les champs sont obligatoires')
      return
    }

    fetch('http://127.0.0.1:5001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          localStorage.setItem('user', JSON.stringify(data.user))
          window.location.href = '/profile'
        }
      })
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <h2>Connexion</h2>

      {error && <p className="text-danger">{error}</p>}

      <div className="mb-3">
        <label className="form-label">Pseudo</label>
        <input
          className="form-control"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Mot de passe</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button className="btn btn-primary">Se connecter</button>
    </form>
  )
}

export default LoginForm