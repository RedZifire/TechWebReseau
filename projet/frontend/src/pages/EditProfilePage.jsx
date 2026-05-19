import { useState } from 'react'

function EditProfilePage() {
  const user = JSON.parse(localStorage.getItem('user'))

  const [username, setUsername] = useState(user.username)
  const [profilePicture, setProfilePicture] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData()

    formData.append('username', username)

    if (profilePicture) {
      formData.append('profile_picture', profilePicture)
    }

    fetch(`http://127.0.0.1:5001/profile/${user.id}`, {
      method: 'PUT',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data.user))
        alert('Profil modifié')
      })
  }

  return (
    <div className="container mt-4">
      <h2>Modifier profil</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Pseudo</label>

          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Photo de profil</label>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </div>

        <button className="btn btn-primary">
          Sauvegarder
        </button>
      </form>
    </div>
  )
}

export default EditProfilePage
