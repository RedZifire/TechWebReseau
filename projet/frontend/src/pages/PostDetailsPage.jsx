import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentCard from '../components/CommentCard' //import du composant qui afficge un commentaire

function PostDetailsPage() {
  const { id } = useParams() //Récupération de l’id dans l’URL

  const [post, setPost] = useState(null)
  const [content, setContent] = useState('') //contient le texte écrit dans le champ commentaire
  const [error, setError] = useState('') //erreur si le commentaire est vide

  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) {
    return <p>Connecte-toi pour voir cette page.</p>  //on bloque l'accès à la page si user pas connecté
  }

  function loadPost() {      // Cette fonction demande au backend Flask les infos du post.
    fetch(`http://127.0.0.1:5001/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
  }

  useEffect(() => {    // Quand la page s'ouvre, on charge le post une première fois.
    loadPost()
  }, [])

  function handleSubmit(event) {    //fct executée quand on appui sur le bouton "commenter", event=envoyer le formulaire
    event.preventDefault()          //preventDefault= ne recharge pas la page

    if (!content) {                 // vérifie si le champ est vide
      setError('Le commentaire est obligatoire')
      return                        // champ vide, on envoie rien au backend
    }

    fetch(`http://127.0.0.1:5001/posts/${id}/comments`, { //react envoie une requete au backend
      method: 'POST',                                     //on ajoute des données, ici un commentaire
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({    //React prépare les données à envoyer à flask, content est le contenu du commentaire 
        content: content,       // content est le contenu du commentaire 
        user_id: user.id
      })                        //flask reçoit post_id, content, user.id dans app.py, @app.route("/posts/<int:post_id>/comments", methods=["POST"]), def add_comment(post_id):
    })
      .then((response) => response.json())
      .then((data) => {         //data contient la réponse du backend
        if (data.error) {       //gestion de l'erreur 
          setError(data.error)
        } else {
          setContent('')        //vide le champ de texte une fois le commentaire publié
          loadPost()            //on recharge le post pour que les commentaires se mettent à jour
        }
      })
  }

  if (!post) {
    return <p>Chargement...</p>  //s'affiche pendant que flask prépare les données
  }

  return (                       //return est pour l'affichage de la page
    <div className="row justify-content-center">  {/*mise en page avec bootstrap*/}
      <div className="col-12 col-md-8">
        <div className="card mb-4">
          <img src={post.image} className="card-img-top" alt="post" /> {/*bootstrap crée une card et affiche l'image dedans*/}

          <div className="card-body">   {/*affiche le nom d'utilisateur et la description du post*/}
            <h2>{post.username}</h2>
            <p>{post.caption}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card p-3 mb-4">  {/*React exécute handlesubmit quand on envoie le formulaire*/}
          <h3>Ajouter un commentaire</h3>

          {error && <p className="text-danger">{error}</p>}   {/*si error contient qqch, affiche message d'erreur*/}

          <textarea                                          //boite ou user écrit son commentaire
            className="form-control mb-2"
            value={content}                                   //ce que user écrit est stocké dans content
            onChange={(event) => setContent(event.target.value)} //à chaque frappe sur le clavier, event.target.value récupère le texte et setContent met à jour la variable content
          ></textarea>

          <button className="btn btn-primary">Commenter</button>
        </form>

        <h3>Commentaires</h3>

        {post.comments.map((comment) => (   //post.comments est une liste, map crée un composant pour chaque commentaire 
          <CommentCard                      // envoie des infos au composant Commentcard (props)
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