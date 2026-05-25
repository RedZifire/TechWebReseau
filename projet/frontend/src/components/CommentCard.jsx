function CommentCard({ comment, onCommentDeleted }) { // on definit la composante CommentCard
  const user = JSON.parse(localStorage.getItem('user')) //prend l'user sauvgardé dans le broswer (localstorage.get...) 

  function deleteComment() { 
    fetch(`http://127.0.0.1:5001/comments/${comment.id}`, { //fetch() envoie une requeste HTTP au backend
      method: 'DELETE'
    })
      .then((response) => response.json()) //quand le serveur responde on convert la reponse en JSON  
      .then(() => { //et après executer => 
        if (onCommentDeleted) {
          onCommentDeleted() //on elimine le commentaire
        }
      })
  }

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h6>{comment.username}</h6> {/* on montre le nom de l'user du commentaire */}

        <p>{comment.content}</p> {/* on montre le texte du commentaire */}

        {/* montrer le bouton seulement si l'utent existe et si l'ID de l'utent actuel est le meme de celui du createur du commentaire */}
        {user && user.id === comment.user_id && (
          <button className="btn btn-sm btn-danger" onClick={deleteComment}>
            Supprimer
          </button>
        )}
      </div>
    </div>
  )
}

export default CommentCard //pour pouvoir exporter la composante