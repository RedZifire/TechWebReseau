import { Link } from 'react-router-dom'

function PostCard({ post, onPostDeleted }) {
  const user = JSON.parse(localStorage.getItem('user'))

  function deletePost() {
    fetch(`http://127.0.0.1:5001/posts/${post.id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        if (onPostDeleted) {
          onPostDeleted()
        }
      })
  }

  return (
    <div className="card mb-4 post-card">
      <img src={post.image} className="card-img-top" alt="post" />

      <div className="card-body">
        <h5>{post.username}</h5>
        <p>{post.caption}</p>

        <Link to={`/post/${post.id}`} className="btn btn-primary me-2">
          Voir le post
        </Link>

        {user && user.id === post.user_id && (
          <button className="btn btn-danger" onClick={deletePost}>
            Supprimer
          </button>
        )}
      </div>
    </div>
  )
}

export default PostCard