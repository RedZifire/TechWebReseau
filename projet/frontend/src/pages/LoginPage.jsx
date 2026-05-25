import { Link } from 'react-router-dom' //link permet de passer d'une page à l'autre sans recharger toute la page
import LoginForm from '../components/LoginForm'

function LoginPage() { //on définie la composante React qui represente la page Login
  return ( //react rend du HTML écrit en JSX
    <div className="row justify-content-center"> {/* on utilise bootstrap (dans React: className sert à assigner une classe CSS aux elements HTML) */}
      <div className="col-12 col-md-6"> {/* form responsive: s'adapte à l'écran */}
        <h1 className="mb-4 text-center">Connexion</h1> {/* mb=margin bottom */}

        <LoginForm /> {/* on utilise le loginForm (autre composante) importé avant */}

        <div className="text-center mt-3">
        <p className="mb-2">Pas encore de compte ?</p>
          <Link to="/register" className="btn btn-outline-primary"> {/* bouton Bootstrap pour aller sur la page de register */}
            Créer un nouveau compte
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage //permet d'importer cette page 