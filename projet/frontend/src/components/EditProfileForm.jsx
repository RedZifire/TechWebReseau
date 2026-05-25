import { useState } from 'react'    //useState permet de créer les variables React username,  image, erreurs
import { useNavigate } from 'react-router-dom'  //sert à changer de page avec React Router

function EditProfileForm() {    //composant react
  const user = JSON.parse(localStorage.getItem('user')) //on récupère l'utilisateur connecté (l'id et username sont dans local storage)

  const [username, setUsername] = useState(user ? user.username : '') //le champ est prérempli avec username actuel avant modification (la condition dit si user existe, prend username, sinon prends '')
  const [profilePicture, setProfilePicture] = useState(null)        //cst qui stocke l'image choisie, useState=(null) initialement car pas encore d'image choisie
  const [error, setError] = useState('')                            //cst qui stocke un message d'eurreur à afficher

  const navigate = useNavigate()          //crée une focntion permettant de changer de page

  function handleSubmit(event) {          //fct se lance quand on clique sur sauveagrder
    event.preventDefault()                // empêche le rechargement de la page

    if (!username) {                      // vérifie si le champ "pseudo est bien rempli"
      setError('Le pseudo est obligatoire')
      return
    }

    const formData = new FormData()       //on utilise  formData car il y a une image, on ne peut pas utiliser JSON

    formData.append('username', username)  //ajoute donnée

    if (profilePicture) {                  //si user choisit une nouvelle pdp, on l'ajoute au formulaire, sinon on garde l'ancienne
      formData.append('profile_picture', profilePicture)
    }

    fetch(`http://127.0.0.1:5001/profile/${user.id}`, {   //requete http, Flask reçoit le pseudo, l'image et l'id dans app.py @app.route("/profile/<int:user_id>", methods=["PUT"]), def update_profile(user_id):. il modifie le pseudo, sauvegrde l'image et me tà jour la photo dans la db
      method: 'PUT',      //PUT permet de modifier les données existantes 
      body: formData
    })
      .then((response) => response.json())    //transforme la réponse Flask en objet JS
      .then((data) => {
        if (data.error) {     //affiche l'erreur s'il y en a une
          setError(data.error)
        } else {
          localStorage.setItem('user', JSON.stringify(data.user)) //react met à jour localstorage pour que navbar et profile affichent le nouveau profil
          navigate('/profile')  //React ouvre directement la page profil
        }
      })
  }

  return (    //partie affichage
    <form onSubmit={handleSubmit} className="card p-4"> {/*hande submit est lancé quand on envoie le formulaire*/}
      <h2>Modifier le profil</h2>         

      {error && <p className="text-danger">{error}</p>}       

      <div className="mb-3">
        <label className="form-label">Modifier votre pseudo</label>
        <input
          className="form-control"
          value={username}
          onChange={(event) => setUsername(event.target.value)} //username est mis à jour à chaque frappe de user sur le clavier
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Choisir une photo de profil </label>
        <input
          type="file"       // type="file"   affiche un bouton pour choisir un fichier 
          className="form-control"
          accept="image/*"  //le "*" signifie qu'on accepte tous types d'images: jpg,pnj,...
          onChange={(event) => setProfilePicture(event.target.files[0])}  //onChange se déclenche quand l'utilisateur choisit un file. comme on choisit juste une image, on prend le premier sélectionné avec event.target.files[0]
        />
      </div>

      <button className="btn btn-primary">Sauvegarder</button>
    </form>
  )
}

export default EditProfileForm

//généralités
//sur la page "modifier mon profil", permet de changer de pseudo, chosiur une nouvelle pdp, sauvegarder les modifs