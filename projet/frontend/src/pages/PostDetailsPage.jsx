import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentCard from '../components/CommentCard'

function PostDetailsPage() {
  const { id } = useParams()

  const [post, setPost] = useState(null)
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) {
    return <p>Connecte-toi pour voir cette page.</p>
  }

  function loadPost() {
    fetch(`http://127.0.0.1:5001/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
  }

  useEffect(() => {
    loadPost()
  }, [])

  function handleSubmit(event) {
    event.preventDefault()

    if (!content) {
      setError('Le commentaire est obligatoire')
      return
    }

    fetch(`http://127.0.0.1:5001/posts/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: content,
        user_id: user.id
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setContent('')
          loadPost()
        }
      })
  }

  if (!post) {
    return <p>Chargement...</p>
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8">
        <div className="card mb-4">
          <img src={post.image} className="card-img-top" alt="post" />

          <div className="card-body">
            <h2>{post.username}</h2>
            <p>{post.caption}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card p-3 mb-4">
          <h3>Ajouter un commentaire</h3>

          {error && <p className="text-danger">{error}</p>}

          <textarea
            className="form-control mb-2"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></textarea>

          <button className="btn btn-primary">Commenter</button>
        </form>

        <h3>Commentaires</h3>

        {post.comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onCommentDeleted={loadPost}
          />
        ))}
      </div>
    </div>
  )
}

export default PostDetailsPage