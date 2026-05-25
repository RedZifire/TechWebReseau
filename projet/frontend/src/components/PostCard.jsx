import { Link } from 'react-router-dom'

function PostCard({ post, onPostDeleted, showDeleteButton }) {  //le composant reçoit: post=données(provient de home page, contient id, image, caption,username) du post, OnPostDeleted=fct à lancer après supression, showDeleteButton=vrai/faux pour afficher le bouton supprimer
  function deletePost() {         
    fetch(`http://127.0.0.1:5001/posts/${post.id}`, {   //envoie la requete pour delete un post, app.py reçoit dans @app.route("/posts/<int:post_id>", methods=["DELETE"]), def delete_post(post_id):. python s'occcupe de supprimer le post de la db
      method: 'DELETE'
    })
      .then((response) => response.json()) //transforme la réponse Flask en objet JS
      .then(() => {
        if (onPostDeleted) {  //si onPostDeleted existe, on refraichit la page
          onPostDeleted()
        }
      })
  }

  return (      //affichage
    <div className="card mb-4 post-card">  {/*bootstrap card*/}
      <img src={post.image} className="card-img-top" alt="post" />  {/* affiche l'image du post*/}

      <div className="card-body"> 
        <h5>{post.username}</h5>  {/*affiche pseudo*/}
        <p>{post.caption}</p>     {/*affiche description*/}

        <Link to={`/post/${post.id}`} className="btn btn-primary me-2"> {/*si post.id=n, React crée un lien vers /post/n*/}
          Voir le post
        </Link>

        {showDeleteButton && (
          <button className="btn btn-danger" onClick={deletePost}> {/*affiche le boutton supprimer ssi showdeleteButton vaut true, cad si c'est notre propre post*/} {/* onclique sur le btn => fetch delete => Flask supprime le post => loadProfile recharge la page*/}
            Supprimer
          </button>
        )}
      </div>
    </div>
  )
}

export default PostCard

//Généralités
//PostCard affiche une publication: l'image, le peseudo, la description un bouton "voir post", un bouton "supprimer"
//HomePage et ProfilePage utilisent PostCard pour afficher chaque post.