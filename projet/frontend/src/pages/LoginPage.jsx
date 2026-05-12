import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

function LoginPage() {
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-5">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  )
}

export default LoginPage