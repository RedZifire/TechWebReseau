import { useState } from 'react'  //useState sert à créer des variables qui changent pendant l’utilisation du formulaire

function UploadPostForm({ onPostCreated }) {    //fct reçoit une prop "onPostCreated" qui vient de ProfilePage. cela signifie que quand un post est créé, on relance loadProfile() pour mettre à jour le profil
  const [image, setImage] = useState(null)      //image choisie, state initialement null=pas encore d'image
  const [caption, setCaption] = useState('')    //description écrite (vide initialement)
  const [error, setError] = useState('')        //message d'erreur

  function handleSubmit(event) {                //fonction lancée quand user clique sur Poster
    event.preventDefault()                       //empêche de recharger la page

    const user = JSON.parse(localStorage.getItem('user'))   //React récupère l’utilisateur sauvegardé après la connexion

    if (!image || !caption) {         // si image ou description manquante, on affiche l'erreur et on retourne la focntion
      setError('Image et description obligatoires')
      return
    }

   const formData = new FormData()    //formData sert à envoyer des données d'un formulaire. pour du texte JSON suffit, mais pour l'image on en a besoin

   formData.append('image', image)    //React prépare les infos à envoyer, l'image, la description et id de user
   formData.append('caption', caption)
   formData.append('user_id', user.id)

  fetch('http://127.0.0.1:5001/posts', {  //React envoie les données à flask. la requete arrive dans app.py, @app.route("/posts", methods=["POST"]), def add_post():
    method: 'POST',
    body: formData
})
      .then((response) => response.json())  //React transforme la réponse Flsak en objet javascript
      .then((data) => {
        if (data.error) {                   //affiche l'erreur s'il y en a une
          setError(data.error)
        } else {                  //si tout marche, on vde l'image, la description, on recharge le profil.
          setImage('')
          setCaption('')
          onPostCreated()         
        }
      })
  }

  return (    //partie affichage
    <form onSubmit={handleSubmit} className="card p-3 mb-4">  {/*quand le formulaire est envoyé, ça lance  handleSubmit*/}
      <h3>Poster une photo</h3>

      {error && <p className="text-danger">{error}</p>}     {/*affiche l'erreur ssi il y en a une*/}

      <div className="mb-3">
        <label className="form-label">Choisir une image</label>
        <input          // champ pour choisir une image dans ses fichiers
          type="file"   // type="file"   affiche un bouton pour choisir un fichier
          className="form-control"    //bootstrap style
          accept="image/*"            //le "*" signifie qu'on accepte tous types d'images: jpg,pnj,...
          onChange={(event) => setImage(event.target.files[0])} //onChange se déclenche quand l'utilisateur choisit un file. comme on choisit juste une image, on prend le premier sélectionné avec event.target.files[0]
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Ajouter une description</label>
        <input
          className="form-control"
          value={caption}
          onChange={(event) => setCaption(event.target.value)} //à chaque lettre tapée, caption est mise à jour
        />
      </div>

      <button className="btn btn-primary">Poster</button>   {/* quand on clique sur le bouton le formulaire est envoyé, handleSubmit se lance */}
    </form>
  )
}

export default UploadPostForm //autorise les autres fichiers à utiliser le composant UploadPostForm


//ce composant affiche le formulaire sur la page profil