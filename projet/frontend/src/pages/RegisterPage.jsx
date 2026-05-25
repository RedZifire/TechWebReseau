import RegisterForm from '../components/RegisterForm' // on importe le composant RegisterForm depuis le dossier components.

function RegisterPage() { //la fonction est le composant React qui représente la page d'inscriptiion
  return (                // ce que la page affiche à l'écran 
    <div className="row justify-content-center">  {/*centre le contenu horizontalement*/}
      <div className="col-12 col-md-6">           {/*col-12=prend toute la largeur su petit écran, col-md-6=50% sur plus grand écran*/}
        <h1 className="mb-4 text-center">Créer un compte</h1>

        <RegisterForm /> {/*affiche le composant RegisterForm*/}
      </div>
    </div>
  )
}

export default RegisterPage //exporte ce composant pour l'utiliser dans App.jsx