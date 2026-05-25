import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterForm() { //on definit une composante react pour s'enregistrer avec des variables (crées avec useState) que React met à jour automatiquement [valeur actuelle, fonction pour la changer]
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('') //pour montrer des erreurs eventuels

  const navigate = useNavigate() //creation de la fonction importée pour changer de page sans recharger le site

  function handleSubmit(event) { //function executée quand le form est envoyé
    event.preventDefault() //bloc le comportement du form, sans ça la page se recharge et react perd les états (les variavles d'avant)

    if (!username || !password) { //si username ou password sont vides (n'éxistent pas): erreur
      setError('Tous les champs sont obligatoires')
      return //la fonction s'arrête, ne continue pas avec le fetch
    }

    if (password.length < 6) { //erreur si la password est trop courte
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return //la fonction s'arrête, ne continue pas avec le fetch
    }

    fetch('http://127.0.0.1:5001/register', { //envoye une requeste HTTP au backend
      method: 'POST', //on utilise la méthode post pour envoyer des données
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }) //conversion de javascript en JSON
    })
      .then((response) => response.json()) //conversione de la reponse du serveur en JSON
      .then((data) => { //data contient le JSON reçu du backend
        if (data.error) {
          setError(data.error) //si on a reçu un erreur montre l'erreur dans l'interface
        } else {
          localStorage.setItem('user', JSON.stringify(data.user)) //si on a pas d'erreurs, sauvegarde l'utent dans le browser (localstorage conserve les données) 
          window.location.href = '/profile' //on va sur le profile
        }
      })
  }

  //commence le JSX (HTML Dans javascript)
  return (
    <form onSubmit={handleSubmit} className="card p-4 mt-4"> {/* execute le handleSubmit*/}
      <h2>Créer un profil</h2>

      {error && <p className="text-danger">{error}</p>} {/* si l'erreur existe montrer le paragraphe rouge*/}

      <div className="mb-3">  {/* partie où écrire le username */}
        <label className="form-label">Pseudo</label>
        <input
          className="form-control"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        /> {/* la valeur de l'input est relié à username et le met à jour  */}
      </div>

      <div className="mb-3"> {/* partie où écrire la password */}
        <label className="form-label">Mot de passe</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />{/* la valeur de l'input est relié à password et le met à jour  */}
      </div>

      <button className="btn btn-success">Créer</button> {/* bouton pour créer le compte  */}
    </form>
  )
}

export default RegisterForm //pour pouvoir importer la page