import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterForm() {
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

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    fetch('http://127.0.0.1:5001/register', {
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
          navigate('/profile')
        }
      })
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4 mt-4">
      <h2>Créer un profil</h2>

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

      <button className="btn btn-success">Créer</button>
    </form>
  )
}

export default RegisterForm