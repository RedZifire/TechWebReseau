import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

function LoginPage() {
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6">
        <h1 className="mb-4 text-center">Connexion</h1>

        <LoginForm />

        <div className="text-center mt-3">
        <p className="mb-2">Pas encore de compte ?</p>
          <Link to="/register" className="btn btn-outline-primary">
            Créer un nouveau compte
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage