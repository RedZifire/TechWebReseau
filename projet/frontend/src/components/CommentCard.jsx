function CommentCard({ comment, onCommentDeleted }) {
  const user = JSON.parse(localStorage.getItem('user'))

  function deleteComment() {
    fetch(`http://127.0.0.1:5001/comments/${comment.id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        if (onCommentDeleted) {
          onCommentDeleted()
        }
      })
  }

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h6>{comment.username}</h6>

        <p>{comment.content}</p>

        {user && user.id === comment.user_id && (
          <button className="btn btn-sm btn-danger" onClick={deleteComment}>
            Supprimer
          </button>
        )}
      </div>
    </div>
  )
}

export default CommentCard