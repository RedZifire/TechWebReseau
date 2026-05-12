import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function EditProfileForm() {
  const user = JSON.parse(localStorage.getItem('user'))

  const [username, setUsername] = useState(user ? user.username : '')
  const [profilePicture, setProfilePicture] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    if (!username) {
      setError('Le pseudo est obligatoire')
      return
    }

    fetch(`http://127.0.0.1:5001/profile/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        profile_picture: profilePicture
      })
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
    <form onSubmit={handleSubmit} className="card p-4">
      <h2>Modifier le profil</h2>

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
        <label className="form-label">Photo de profil URL</label>
        <input
          className="form-control"
          value={profilePicture}
          onChange={(event) => setProfilePicture(event.target.value)}
        />
      </div>

      <button className="btn btn-primary">Modifier</button>
    </form>
  )
}

export default EditProfileForm