import { useState } from 'react'

function UploadPostForm({ onPostCreated }) {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const user = JSON.parse(localStorage.getItem('user'))

    if (!image || !caption) {
      setError('Image et description obligatoires')
      return
    }

  const formData = new FormData()

  formData.append('username', user.username)
  formData.append('caption', caption)
  formData.append('image', image)

  fetch('http://127.0.0.1:5001/posts', {
    method: 'POST',
    body: formData
  })
    .then((response) => response.json())
    .then(() => {
      window.location.reload()
    })
    }

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <h3>Poster une photo</h3>

      {error && <p className="text-danger">{error}</p>}

      <div className="mb-3">
        <label className="form-label">URL de l’image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          className="form-control"
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
        />
      </div>

      <button className="btn btn-primary">Poster</button>
    </form>
  )
}

export default UploadPostForm